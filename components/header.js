var React = require('react');

var Header = React.createClass({
    render() {
        return (
            <header className="header boys">
                <a href={this.props.back} className="iconfont icon-left"></a>
                <a href={this.props.home} className="iconfont icon-home"></a>
                <p className="nav-title">国际优选</p>
            </header>
        );
    }
});

module.exports = Header;