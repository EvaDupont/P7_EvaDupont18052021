const express = require('express');/* Framework qui facilite la création de serveur*/
const morgan = require('morgan');
const cors = require('cors');/* partage de ressources entre serveurs*/
const path = require('path');/*package pour manipuler et assurer les chemins vers les fichiers et les repertoires du code */
const helmet = require('helmet'); /* protege l'application de certaines vulnérabilités*/

/*Connection à MongoDB avec la sécurité vers le fichier .env */
require('dotenv').config();


/*routes*/
const userRoutes = require('./routes/user');
const postsRoutes = require('./routes/posts');

//db
const { sequelize } = require('./models/index');

const app = express();

app.use(morgan('tiny'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors()); 
app.use(helmet()); 

app.use('/upload', express.static(path.join(__dirname, 'upload')));
app.use('/api/users', userRoutes);
app.use('/api/posts', postsRoutes);


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
