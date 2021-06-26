/* package gérant les fichiers entrants dans les requetes http */
const multer = require("multer");

const MIME_TYPES = {
  "image/jpg": "jpg",
  "image/jpeg": "jpg",
  "image/png": "png",
  "image.gif": "gif",
  "image.webp": "webp",
};

/*configuration standard de multer : permet de gerer 
le stockage des images utilisées dans la création des posts 
- destination : savoir ou les stocker,
- filename : pour creer le nom de l'image a stocker*/
const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "upload");
  },
  filename: (req, file, callback) => {
    /* nouveau nom du fichier image pour éviter les doublons*/
    const name = file.originalname.replace(/\.[^/.]+$/, "");
    const extension = MIME_TYPES[file.mimetype];
    callback(null, name + Date.now() + "." + extension);
  },
});
module.exports = multer({ storage: storage }).single("image"); /* stockage de l'image publiée*/
