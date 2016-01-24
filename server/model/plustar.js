'use strict';

var ReactDOMServer = require('react-dom/server');
var React = require('react');

var PlustarApp = require('../../components/plustar-app');

const BRAND_URL = 'guang/api/v3/plustar/getlist/';

var API = require('../api');

function format(data) {
    var navs = [],
        content = [];

    var ps;

    for (let i = 0; i < data.length; i++) {
        let data_i = JSON.parse(data[i]).data;

        navs.push({
            name: data_i.brand_type_name,
            focus: i === 1 ? true : false
        });

        let list = data_i.data.list[0].data;

        let sub_content = [];
        for (let j = 0; j < list.length; j++) {
            let list_j = list[j];

            sub_content.push({
                href: list_j.data[0].url,
                img: list_j.data[0].src.replace('{mode}', '2').replace('{width}', '640').replace('{height}', '310'),
                deps: list_j.brand_title
            })
        }
        content.push(sub_content)
    }

    ps = {
        navs: navs,
        content: content
    }

    return ps;
}

exports.getPsBrands = function* () {
    var apiParam = {
        'app_version': '3.8.2',
        'client_type': 'iphone',
        'os_version': 'yohobuy:h5',
        'screen_size': '720x1280',
        'gender': '1,3',
        'is_recommend': '0',
        'yh_channel': '1',
        'client_secret': 'eb447bff89ecebaabad00c67fabc8c43'
    };

    var star, plus;

    star = Object.assign({}, apiParam, {
        'brand_type': 2
    });

    plus = Object.assign({}, apiParam, {
        'brand_type': 3
    });

    var urls = [
        {
            url: BRAND_URL,
            data: star
        },
        {
            url: BRAND_URL,
            data: plus
        }
    ];

    var res = yield API.multiGet(urls);

    var formatedData = format(res);

    return ReactDOMServer.renderToString(<PlustarApp data={formatedData} />);
};