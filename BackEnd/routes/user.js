const express = require('express');
const router = express.Router();
const rateLimit = require('express-rate-limit');  /*package pour limiter le nombre de requete à l'application */
const userCtrl = require('../controllers/user');
const auth = require("../middleware/auth");
const passValidate = require('../middleware/passwordValid');
const mailValidate = require('../middleware/mailValid');

const Limiter = rateLimit({
  windowMs: 2 * 60 * 1000, // 2 minutes : temps défini pour tester l'application
  max: 3 // 3 essais max par adresse ip
});


router.post('/signup', mailValidate, passValidate, userCtrl.signup);
router.post('/login', Limiter, userCtrl.login);
router.delete('/:id', userCtrl.delete);
router.put('/:id', auth, userCtrl.update);

module.exports = router;