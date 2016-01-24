var model = require('../server/model/plustar');

function* brands() {
    var content = yield model.getPsBrands();
    yield this.render('content', {
        title: '明星潮牌',
        content: content,
        plustar: true
    });
}

exports.brands = brands;