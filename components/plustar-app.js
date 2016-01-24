'use strict';

var React = require('react');
var Header = require('./header');

//Tab Switch
var NavTab = React.createClass({
    clickHandler(e) {
        var tar = e.target;
        var tarClass = tar.className.trim();

        if (tarClass && /focus/.test(tar.className)) {
            return;
        }

        var index = tar.dataset.index;
        var sibling;

        if (~~index === 0) {
            sibling = tar.nextSibling;
        } else {
            sibling = tar.previousSibling;
        }

        sibling.className = sibling.className.replace(/focus/, '');
        tar.className =  `${tarClass ? ' ' : ''}focus`;

        this.props.navClickCb(index);
    },
    render() {
        return (
            <ul className="nav-tab">
                {
                    this.props.navs.map((nav, index) => {
                        let navLi = <li onClick={this.clickHandler} key={index} data-index={index}>{nav.name}</li>;

                        if (nav.focus) {
                            navLi = <li onClick={this.clickHandler} className="focus" key={index} data-index={index}>{nav.name}</li>;
                        }

                        return navLi;
                    })
                }
            </ul>
        );
    }
});

class PsItem extends React.Component {
    render() {
        var p = this.props;

        return (
            <li className="ps-row">
                <a href={p.href}>
                    <img src={p.img} />
                </a>
                {
                    (() => {
                        if (p.deps) {
                            return <p className="deps">{p.deps}</p>
                        }
                        return '';
                    })()
                }
            </li>
        )
    }
}

//Plustar Content
var PsContent = React.createClass({
    getContent(index) {
        return this.props.content[index];
    },

    getInitialState: function() {
        var navs = this.props.navs;

        var focus = navs[0].focus ? 0 : (navs[1] && navs[1].focus ? 1 : 0);

        return {
            list: this.getContent(focus)
        };
    },

    navClickCb: function(index) {
        this.setState({
            list: this.getContent(index)
        });
    },

    render() {
        var json = JSON.stringify(this.props);
        var popStore =<script type="application/json" id="props-store" dangerouslySetInnerHTML={{__html: json}}></script>;

        return (
            <div className="ps-content">
                <NavTab navClickCb={this.navClickCb} navs={this.props.navs} />
                <ul>
                    {
                        this.state.list.map((item, index) => <PsItem {...item} key={index} />)
                    }
                </ul>
                {popStore}
            </div>
        )
    }
});

var PlustarApp = React.createClass({
    render: function() {
        return (
            <div className="ps-app">
                <Header />
                <PsContent {...this.props.data} />
            </div>
        );
    }
});

module.exports = PlustarApp;