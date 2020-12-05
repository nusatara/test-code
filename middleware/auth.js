var connection = require('../koneksi');
var mysql = require('mysql');
var md5 = require('md5');
var response = require('../res');
var jwt = require('jsonwebtoken');
var config = require('../config/secret');

//controller untuk registrasi user
exports.registrasi = function (req, res) {
    var post = {
         name: req.body.name,
         email: req.body.email,
         password: md5(req.body.password),
         created: new Date(),
         updated: new Date()
    }

    var query = "SELECT email FROM ?? WHERE ??=?";
    var table = ["user", "email", post.email];

    query = mysql.format(query, table);

    connection.query(query, function (error, rows) {
         if (error) {
              console.log(error);
         } else {
              if (rows.length == 0) {
                   var query = "INSERT INTO ?? SET ?";
                   var table = ["user"];
                   query = mysql.format(query, table);
                   connection.query(query, post, function (error, rows) {
                        if (error) {
                             console.log(error);
                        } else {
                             response.ok("Berhasil Menambahkan User Baru", res)
                        }
                   });
              } else {
                response.ok("Email Telah terdaftar", res)
              }
         }
    })
}

// controller untuk login
exports.login = function (req, res) {
    var post = {
         password: req.body.password,
         email: req.body.email
    }

    var query = "SELECT * FROM ?? WHERE ??=? AND ??=?";
    var table = ["user", "password", md5(post.password), "email", post.email];

    query = mysql.format(query, table);

    connection.query(query, function (error, rows) {
         if (error) {
              console.log(error);
         } else {
              if (rows.length == 1) {
                   var token = jwt.sign({ rows }, config.secret, {

                        expiresIn: '2400000'
                   });
                   id_user = rows[0].ID;
                   var expired = 2400000
                             res.json({
                                  success: true,
                                  message: 'Token JWT tergenerate!',
                                  token: token,
                                  id: id_user,
                                  expires: expired,
                             });
              }
              else {
                   res.json({ "Error": true, "Message": "Email atau password salah!" });
              }
         }
    });
}

//controller untuk create session
exports.createSession = function (req, res) {
    var uid = req.body.uid;
    var name = req.body.name;
    var description = req.body.description;
    var start = req.body.start;
    var duration = req.body.duration;
    var created = new Date();
    var updated = new Date();
    connection.query('INSERT INTO session (userID,name,description,start,duration,created,updated) VALUES (?,?,?,?,?,?,?)',
    [uid,name,description,start,duration,created,updated],
    function (error, rows, fields){
        if(error) {
            console.log(error);
        } else {
            response.ok("Berhasil Menambahkan Session",res)
        }
    });
}

//controller untuk update session
exports.updateSession = function (req, res) {
    var id = req.body.id;
    var uid = req.body.uid;
    var name = req.body.name;
    var description = req.body.description;
    var start = req.body.start;
    var duration = req.body.duration;
    var updated = new Date();
    connection.query('UPDATE session SET userID=?, name=?, description=?, start=?, duration=?, updated=? WHERE ID=?',
    [uid,name,description,start,duration,updated,id],
    function (error, rows, fields){
        if(error) {
            console.log(error);
        } else {
            response.ok("Berhasil Mengubah Session",res)
        }
    });
}

//controller untuk delete session
exports.deleteSession = function (req, res) {
    var id = req.body.id;
    connection.query('DELETE FROM session WHERE ID=?',[id],
        function (error, rows, fields) {
            if (error) {
                console.log(error);
            } else {
                response.ok("Berhasil Menghapus Session", res)
            }
        });
}