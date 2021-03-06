# Projet 7 - Groupomania !

Dernier projet de la formation développeur web d'Openclassrooms : Créer un réseau social d'entreprise.

Modules utilisés pour ce projet:

- VueJs + vuex + vuetify
- NodeJs + express + sequelize
- Mysql

## Frontend

Ouvrir le dossier Frontend dans le terminal de votre éditeur puis exécuter la commande:

    npm install

puis

    npm start

si le navigateur ne s'ouvre pas automatiquement allez à :

- http://localhost:8080/

## Backend

Ouvrir le dossier Backend dans le terminal de votre éditeur puis exécuter la commande:

    npm install

puis

    npm start ou nodemon serve

## Base de données

Se connecter au serveur **MySql** de votre choix.
Exécuter la commande: `CREATE DATABASE rseGP;`
Vérifiez les identifiants dans le fichier config.json du dossier Backend puis importer le fichier rseGP.sql s'il vous a été fourni :

    mysql -u root -p rseGP < rseGP.sql

Il faut remplacer `rseGP.sql` par le chemin du fichier dans votre machine.
Vous pouvez lancer le projet sans importer le fichier.sql, au lancement de l'application un compte administrateur est automatiquement créé (les identifiants vous on été fourni dans un fichier Id_Admin).

## Utilisation

Pour s'inscrire sur le réseau social de Groupomania, il vous faut renseigner :

- Un pseudo (entre 3 et 30 caractères)
- Une adresse mail valide
- Un mot de passe (de 8 à 20 caractères, lettres et chiffres acceptés uniquement, majuscules et minuscules, pas de symboles).
  Vous pouvez par la suite modifier votre profil (pseudo, bio, photo) en allant sur votre profil. Votre compte peut être supprimé par vous-même ainsi que par l'administrateur.

Une fois connecté vous pouvez voir les publications des utilisateurs et publier au choix:

- un statut
- un statut + un lien (gifs ok, pas de vidéos youtube)
- un statut + une image
  Ces publications peuvent être likées, commentées, modifiées, supprimées. Le modérateur peut les supprimer.
