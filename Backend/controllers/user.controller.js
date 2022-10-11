const UserModel = require("../models/user.model");
const ObjectID = require("mongoose").Types.ObjectId;
const fs = require("fs");
const filesDestination = `${__dirname}/../uploads`;

/**
 * Récupération de tous les utilisateurs & leurs email / passsword hash
 * 
 * Si tout se passe bien, permettre la récupération des infos utilisateurs.
 * @param {*} req 
 * @param {*} res 
 */
exports.getAllUsers = async (req, res) => {
  const users = await UserModel.find().select("-password -email");
  res.status(200).json(users);
};

/**
 * Vérification de l'Object id pour voir la correspondance entre l'utilisateur et la modif du commentaire.
 * 
 * Si tout se passe bien, permettre la récupération d'un utilisateur spécifique.
 * @param {*} req 
 * @param {*} res 
 * @returns Si l'object id n'est pas valdie, renvoyer une erreur 400 au client.
 */
exports.getOneUser = (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknown : " + req.params.id);

  UserModel.findById(req.params.id, (err, docs) => {
    if (!err) res.send(docs);
    else console.log("ID unknown : " + err);
  }).select("-password -email");
};

exports.uploadProfil = async (req, res) => {
  try {
    await UserModel.findByIdAndUpdate(
      req.body.userId,
      {
        $set: {
          picture: `${req.protocol}://${req.get("host")}/uploads/${
            req.file.filename
          }`,
        },
      },
      { new: true, upsert: true, setDefaultsOnInsert: true }
    )
      .then((data) => res.send(data))
      .catch((err) => res.status(500).send({ message: err }));
  } catch (err) {
    return res.status(500).send({ message: err });
  }
}

/**
 * Vérification de l'Object id pour voir la correspondance entre l'utilisateur et la mise à jour d'un profil utilisateur.
 * 
 * Si tout se passe bien, permettre la modification du profil.
 * @param {*} req 
 * @param {*} res 
 * @returns Si l'object id n'est pas valdie, renvoyer une erreur 400 au client.
 */
exports.updateUser = async (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknown : " + req.params.id);

  try {
    await UserModel.findOneAndUpdate(
      { _id: req.params.id },
      {
        $set: {
          bio: req.body.bio,
        },
      },
      { new: true, upsert: true, setDefaultsOnInsert: true })
      .then((data) => res.send(data))
      .catch((err) => res.status(500).send({ message: err }));
  } catch (err) {
    return res.status(500).json({ message: err });
  }
};

/**f
 * Vérification de l'Object id pour voir la correspondance entre l'utilisateur et la suppression du profil'.
 * 
 * Si tout se passe bien, permettre la suppression du profil.
 * @param {*} req 
 * @param {*} res 
 * @returns Si l'object id n'est pas valdie, renvoyer une erreur 400 au client.
 */
exports.deleteUser = async (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknown : " + req.params.id);

  try {
    await UserModel.remove({ _id: req.params.id }).exec();
    res.status(200).json({ message: "Successfully deleted. " });
  } catch (err) {
    return res.status(500).json({ message: err });
  }
};
