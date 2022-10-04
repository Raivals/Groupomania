// Configuration de multer pour accepter les fichiers entrants (Gestion de fichier)
const multer = require('multer');


const MIME_TYPES = {
  'image/jpg': 'jpg',
  'image/jpeg': 'jpg',
  'image/png': 'png'
};
// Création d'un objet de configuration (savoir où vont être stocké les images)
const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "uploads");
  },
  filename: (req, file, callback) => {
    const name = file.originalname.split(' ').join('_');
    const extension = MIME_TYPES[file.mimetype];
    callback(null, name + Date.now() + '.' + extension);
  } 
});

const fileFilter = (req, file, callback) => {
  const extension = MIME_TYPES[file.mimetype];

  if(!extension)
    return callback(
      Error(
        "Image invalide, extension non autorisée"
      )
    );
  callback(null, true);

};


module.exports = multer({storage: storage, fileFilter}).single('file');