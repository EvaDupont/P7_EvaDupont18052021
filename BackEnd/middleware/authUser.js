const emailValidator = require("email-validator");/*verifie la forme de l'email*/
const passwordValidator = require("password-validator");/*crypte le mdp*/

exports.valid = (req, res, next) => {
  
  const passwordSchema = new passwordValidator();
  passwordSchema
    .is()
    .min(8) /* longueur mini 8*/
    .is()
    .max(20) /* longueur maxi 20 */
    .has()
    .uppercase() /* doit contenir des majuscules */
    .has()
    .lowercase() /* doit contenir des minuscules */
    .has().not().spaces(); /* ne doit pas contenir d'espace */

  if (!emailValidator.validate(req.body.email) || !passwordSchema.validate(req.body.password)) {
    return res.status(400).send({
  error:
        "Merci de vérifier l'adresse mail. Le mot de passe doit contenir au minimum 8 lettres avec des minuscules et majuscules.",
    });
  } else if (emailValidator.validate(req.body.email) || passwordSchema.validate(req.body.password)) {
    next();
  }
};

/* vérification du pseudo */
exports.checkPseudo = (req, res, next) => {
  const regex = /^[a-zA-Z0-9_]{3,30}$/; // Lettres, espaces et doit être entre 4 et 30 caractères
  const pseudo = req.body.pseudo;
  if (regex.test(pseudo) === true) {
    next();
  } else {
    return res.status(400).send({
      error:
        "Votre pseudo contenir entre  3 et 30 catractères, sont acceptés les lettres, chiffres et underscore (_)  ",
    });
  }
};
