const UserModel = require('../models/user.model');
const ObjectID = require('mongoose').Types.ObjectId;

module.exports.getAllUsers = async (req,res) => {
    const users = await UserModel.find().select('-password');
    res.status(200).json(users);
};

// Infos d'un seul utilisateur

module.exports.userInfo = (req, res) => {
    // req.params = ce qui est passé dans l'url donnée dans les requêtes (input/ cors) = req.body
    console.log(req.params);
    // Consulter une donnée avec req.params et spécifier l'id avec .id
    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send('ID unknown : ' + req.params.id)

    UserModel.findById(req.params.id, (err, docs) => {
        if (!err) res.send(docs);
        else console.log('ID unknown : ' + err);
    }).select('-password');
};

// Mise à jour de l'utilisateur

module.exports.updateUser = async (req, res) => {
    if (!ObjectID.isValid(req.params.id))
      return res.status(400).send("ID invalid : " + req.params.id);
  
    try {
      await UserModel.findOneAndUpdate(
        { _id: req.params.id },
        {
          $set: {
            bio: req.body.bio,
          },
        },
        { new: true, upsert: true, setDefaultsOnInsert: true }
      )
        .then((docs) => res.send(docs))
        .catch((err) => res.status(500).send({ message: err }));
    } catch (err) {
      res.status(500).json({ message: err });
    }
  };

// Delete user

module.exports.deleteUser = async (req, res) => {
    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send('ID unknown : ' + req.params.id)
    
    try {
        await UserModel.deleteOne({ _id: req.params.id }).exec();
        res.status(200).json({ message: "Successfully deleted. "});
    } catch (err) {
      return res.status(500).json({ message: err });
    }
};

// Follow user

module.exports.follow = async (req,res) => {
    if (!ObjectID.isValid(req.params.id) || !ObjectID.isValid(req.body.idToFollow))
        return res.status(400).send('ID unknown : ' + req.params.id)
    try {
        // add to the follower list
        await UserModel.findByIdAndUpdate(
            req.params.id,
            { $addToSet: { following: req.body.idToFollow }},
            { new: true, upsert: true },
            
        )
        .then((docs) => res.status(201).json(docs))
        .catch((err) => res.status(400).json({ message: err }));
        // add to following list
        await UserModel.findByIdAndUpdate(
            req.body.idToFollow,
            { $addToSet: { followers: req.params.id }},
            { new: true, upsert: true },
        )
        .catch((err) => res.status(400).json(err));

    } catch (err) {
        return res.status(500).json({ message: err });
    }
};

// Unfollow user

module.exports.unfollow = async (req,res) => {
    if (!ObjectID.isValid(req.params.id) || !ObjectID.isValid(req.body.idToUnfollow))
        return res.status(400).send('ID unknown : ' + req.params.id)
    try {
        // add to the follower list
        await UserModel.findByIdAndUpdate(
            req.params.id,
            { $pull: { following: req.body.idToUnfollow }},
            { new: true, upsert: true },
            
        )
        .then((docs) => res.status(201).json(docs))
        .catch((err) => res.status(400).json({ message: err }));
        // add to following list
        await UserModel.findByIdAndUpdate(
            req.body.idToUnfollow,
            { $pull: { followers: req.params.id }},
            { new: true, upsert: true },
        )
        .catch((err) => res.status(400).json(err));

    } catch (err) {
        return res.status(500).json({ message: err });
    }
};