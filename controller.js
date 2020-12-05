'use strict';

var response = require('./res');
var connection = require('./koneksi');

exports.index = function (req, res) {
    response.ok("Aplikasi REST API ku berjalan!", res)
};
//controller list session
exports.listSession = function (req, res) {
    connection.query('SELECT ID, name  FROM session', function (error, rows, fileds) {
        if (error) {
            console.log(error);
        } else {
            response.ok(rows, res)
        }
    });
};

//controller detail session
exports.detailSession = function (req, res) {
    let id = req.params.id;
    connection.query('SELECT name, description, start, duration FROM session WHERE ID = ?', [id],
        function (error, rows, fields) {
            if (error) {
                console.log(error);
            } else {
                response.ok(rows, res);
            }
        });
};