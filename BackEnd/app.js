const express = require('express'); /* Framework qui facilite la création de serveur*/
const bodyParser = require('body-parser'); /* module permettant d'extraire l'objet JSON de la dde POST et analyser le body de la requete*/
const path = require('path'); /*package pour manipuler et assurer les chemins vers les fichiers et les repertoires du code */
const helmet = require('helmet'); /* protege l'application de certaines vulnérabilités*/
const morgan = require('morgan'); /* package node permettant la journalisation des requetes */
require('dotenv').config();/*securise l'envirement de connexion dans le dossier .env */

/*Routes */
const postsRoutes = require('./routes/posts');
const userRoutes = require('./routes/user');

/* Base de données */
const { sequelize } = require('./models/index');

const app = express();

/*CORS Cross Origin Resource Sharing : systeme de sécurité qui empêche les requetes malveillantes*/
/*ces headers permettent d'accéder au serveur depuis n'importe quelle origine + d'envoyer des requêtes avec les methodes GET, POST...*/
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });


app.use(morgan('tiny'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(helmet()); 

app.use('/upload', express.static(path.join(__dirname, 'upload')));
app.use('/api/user', userRoutes);
app.use('/api/posts', postsRoutes);

/*test de connection a la Base de données*/
const dbTest = async function () {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};
dbTest();

module.exports = app;
