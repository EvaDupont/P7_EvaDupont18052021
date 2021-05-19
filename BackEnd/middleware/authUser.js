const emailValidator = require("email-validator");/*verifie la forme de l'email*/
const passwordValidator = require("password-validator");/*crypte le mdp*/

exports.valid = (req, res, next) => {
  /* on vérifie le password et l'email*/
  const passwordSchema = new passwordValidator();
  passwordSchema
.is().min(8)                                    /* longueur mini 8 */
.is().max(20)                                  /* longueur maxi 20 */
.has().uppercase()                              /* doit contenir des majuscules */
.has().lowercase()                              /* doit contenir des minuscules */
.has().digits(2)                                /* doit contenir deux chiffres */
.has().not().spaces();                         /* ne doit pas contenir d'espace */

  if (
    !emailValidator.validate(req.body.email) ||
    !passwordSchema.validate(req.body.password)
  ) {
    return res.status(400).send({
      error:
        "Merci de vérifier ton adresse mail, ton mot de passe doit contenir au minimum 8 lettres avec des minuscules, majuscules et des chiffres ",
    });
  } else if (
    emailValidator.validate(req.body.email) ||
    passwordSchema.validate(req.body.password)
  ) {
    next();
  }
};

exports.checkPseudo = (req, res, next) => {
  /* on vérifie le pseudo*/
  const regex = /^[a-zA-Z0-9_]{3,30}$/; /* lettres, chiffres, _ et doit comprendre entre 3 et 30 caractères*/
  const pseudo = req.body.pseudo;
  if (regex.test(pseudo) === true) {
    next();
  } else {
    return res.status(400).send({
      error:
        "Votre pseudo doit comprendre entre 3 et 30 caractères (lettres, chiffres et underscore (_)) ",
    });
  }
};
