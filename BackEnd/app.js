const express = require('express'); /* Framework qui facilite la création de serveur*/
const bodyParser = require('body-parser'); /* module permettant d'extraire l'objet JSON de la dde POST et analyser le body de la requete*/
const path = require('path'); /*package pour manipuler et assurer les chemins vers les fichiers et les repertoires du code */
const helmet = require('helmet'); /* protege l'application de certaines vulnérabilités*/
const xss = require('xss-clean');
const rateLimit = require("express-rate-limit");
const cors = require('cors');

require('dotenv').config();/*securise l'environement de connexion dans le dossier .env */
require("./db.config");

/*Routes */
const postsRoutes = require("./routes/posts");
const userRoutes = require("./routes/user");
const commentsRoutes = require("./routes/comments");

/* connection a la Base de données MySQL*/
//const { sequelize } = require('./models/index');

const app = express();

/*CORS Cross Origin Resource Sharing : systeme de sécurité qui empêche les requetes malveillantes*/
/*ces headers permettent d'accéder au serveur depuis n'importe quelle origine + d'envoyer des requêtes avec les methodes GET, POST...*/
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(helmet()); 
app.use(xss());
app.use(rateLimit());

app.use('/images', express.static(path.join(__dirname, 'images')));

app.use(cors());
app.use('/api/auth/post', postsRoutes);
app.use('/api/auth', userRoutes);
app.use('/api/auth', commentsRoutes);


module.exports = app;
