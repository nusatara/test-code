var express = require('express');
var auth = require('./auth');
var router = express.Router();
var verifikasi = require('./verifikasi')


router.post('/api/v1/register', auth.registrasi);
router.post('/api/v1/login', auth.login);

router.post('/api/v1/create', verifikasi(), auth.createSession);
router.put('/api/v1/update', verifikasi(), auth.updateSession);
router.delete('/api/v1/delete', verifikasi(), auth.deleteSession);

module.exports = router;