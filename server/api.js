'use strict';

var rp = require('request-promise');

var api = 'http://testservice.yoho.cn:28077/';

const API_URL = 'http://testservice.yoho.cn:28077/';

function API() {}

/**
 * GET
 * @param url
 * @param data
 */
API.get = (url, data) => {
    return rp({
        url: `${API_URL}${url}`,
        qs: data
    }).then(function(body) {
        return JSON.parse(body).data;
    }).catch(function(err) {
        console.log(err);
    });
}

/**
 * GET Multi
 * @params urls => [{url[String], data[Object]}]
 */
API.multiGet = (urls) => {
    var rps = [];

    for (let i = 0; i < urls.length; i++) {
        let val = urls[i];

        rps[i] = rp({
            url: API_URL + val.url,
            qs: val.data
        });
    }

    return Promise.all(rps).then(function(d) {
        return d;
    }).catch(function(reason) {
        console.log(reason);
    });
}

module.exports = API;