const schema = require("../models/password");

module.exports = (req, res, next) => {
    
    if (!schema.validate(req.body.password)) {

      res.status(401).json({
        error: ('Le mot de passe est trop faible !')
      });
    
     
    } else {
     
      next();
    }
  };
  