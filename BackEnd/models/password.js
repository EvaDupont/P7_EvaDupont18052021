const passwordValidator = require('password-validator');

const passwordSchema = new passwordValidator();

passwordSchema
.is().min(8)                                    // longueur mini 8
.is().max(20)                                  // longueur maxi 20
.has().uppercase()                              // doit contenir des majuscules
.has().lowercase()                              // doit contenir des minuscules
.has().digits(2)                                // doit contenir deux chiffres
.has().not().spaces();                         // ne doit pas contenir d'espace

module.exports = passwordSchema;