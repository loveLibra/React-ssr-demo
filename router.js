var route = require('koa-route');

var plustar = require('./controller/plustar');

module.exports = function(app) {
    app.use(route.get('/plustar', plustar.brands));
};