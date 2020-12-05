'use strict';

module.exports = function (app) {
    var jsonku = require('./controller');

    app.route('/')
        .get(jsonku.index);
    app.route('/list')
        .get(jsonku.listSession);
    app.route('/detail/:id')
        .get(jsonku.detailSession);
}