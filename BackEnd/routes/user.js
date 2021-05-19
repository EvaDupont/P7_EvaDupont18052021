const express = require('express');
const router = express.Router();
const rateLimit = require('express-rate-limit');  /*package pour limiter le nombre de requete à l'application */
const userCtrl = require('../controllers/user');
const authUser = require("../middleware/authUser");
const auth = require("../middleware/auth");
const multer = require("../middleware/multer-config");

const Limiter = rateLimit({
  windowMs: 2 * 60 * 1000, // 2 minutes : temps défini pour tester l'application
  max: 3 // 3 essais max par adresse ip
});

router.post("/signup", authUser.checkPseudo, authUser.valid, userCtrl.signup);
router.post("/login", authUser.valid, Limiter, userCtrl.login);
router.get("/accounts", auth, userCtrl.getAllUsers);
router.put("/accounts/:id", auth, multer, userCtrl.updateAccount);
router.get("/accounts/:id", auth, userCtrl.getAccount);
router.delete("/accounts/:id", auth, userCtrl.deleteAccount);

module.exports = router;