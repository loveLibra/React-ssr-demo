var koa = require('koa'),
    route = require('koa-route'),
    parse = require('co-body'),
    appStatic = require('koa-static'),
    path = require('path'),
    hbs = require('koa-hbs');

var app = koa(); 

require('node-jsx').install({harmony: true});

app.use(appStatic(path.join(__dirname, 'dist')));

app.use(hbs.middleware({
    viewPath: __dirname + '/views',
    extname: '.html',
    partialsPath: __dirname + '/views/partials'
}));

require('./router')(app);

app.listen(1000);
console.log('server start at port:1000');