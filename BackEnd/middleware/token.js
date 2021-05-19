const JWT = require("jsonwebtoken"); /*package pour créer et verifier les tokens d'authentification */
//const config = require("../config/config");

function issueJWT(user) {
  /* on initialise le token*/
  const id = user.id;
  const expiresIn = "24H";
  const payload = {
    sub: id,
    iat: Date.now(),
  };
  const signedToken = JWT.sign(payload, "secret", { expiresIn: expiresIn });
  return {
    token: "Bearer " + signedToken,
    expires: expiresIn,
  };
}
function getUserId(req) {
  /* on vérifie le userId du token*/
  const token = req.headers.authorization.split(" ")[1]; /* on récupère le token de la requête entrante*/
  const decodedToken = JWT.verify(token, "secret"); /* verification */
  const userId = decodedToken.sub;
  return userId; /* on récupère l'id du token*/
}

module.exports.issueJWT = issueJWT;
module.exports.getUserId = getUserId;
