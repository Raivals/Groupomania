const PostModel = require('../models/post.model');
const UserModel = require('../models/user.model');
const ObjectID = require('mongoose').Types.ObjectId; // vérifier que le paramêtre existe déjà dans la BDD
const fs = require('fs');

/**
 * Affichage des posts dans le fil d'actualité du plus récent au plus ancien
 * 
 * Si il y a une erreur d'affichage des posts, renvoyer une erreur "Cannot get data" au client.
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
exports.readPost = (req, res, next) => {
    PostModel.find((error, docs) => {
        if(!error) {
            res.send(docs);
        } else {
            console.log('Error to get data :' + error);
        }
    }).sort({ createdAt: -1 }); // tri du plus récent au plus ancien post
}


/**
 * Création d'un post, récupération de l'id du poster et de l'image de profil en dynamique, initialisation des likes et commentaires.
 * 
 * Si tout se passe bien, renvoyer un code 201 "création" au client.
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns Si il y a une erreur, renvoyer un code d'erreur 400 au client.
 */
exports.createPost = async (req, res, next) => {
    const newPost = new PostModel( {
        posterId: req.body.posterId,
        message: req.body.message,
        picture: req.file !== undefined ?  `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`: "",
        video: req.body.video,
        likers: [],
        comments: [],
    });

    try {
        const post = await newPost.save();
        return res.status(201).json(post);
    }
    catch (error) {
        return res.status(400).send(error);
    }
}


/**
 * Mise à jour d'un post déjà créé, récupération de l'object id pour vérifier si le post appartient bien à l'utilisateur pour permettre sa modification.
 * 
 * Si tout se passe bien , autoriser la modification du post.
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns Si object Id n'est pas le bon, renvoyer une erreur 400 'ID unknown'.
 */
exports.updatePost = (req, res, next) => {
    if (!ObjectID.isValid(req.params.id)) {
        return res.status(400).json('ID Unknown : ' + req.params.id);
    } else {
        const updatedRecord = {};
        if (req.body.message && req.body.message !== "null") {
            updatedRecord.message = req.body.message
        };
        if (req.file) {
            updatedRecord.picture = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`
        };
        PostModel.findByIdAndUpdate(
            req.params.id,
            { $set: updatedRecord },
            { new: true },
            (error, docs) => {
                if (!error) {
                    res.send(docs);
                } else {
                    console.log("Update error : " + error);
                }
            }
        )
    }
}


/**
 * Vérification de l'Object id pour voir la correspondance entre l'utilisateur et le post.
 * 
 * Si tout se passe bien, autorisé la suppression du post et image si il y a.
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns Si l'object id n'est pas valdie, renvoyer une erreur 400 au client.
 */
exports.deletePost = (req, res, next) => {
    if (!ObjectID.isValid(req.params.id)) {
        return res.status(400).json('ID Unknown : ' + req.params.id);
    } else {
        PostModel.findOne({ _id : req.params.id})
        .then((post) => {
            if (!post) {
                res.status(404).json({error: new Error('Post non trouvé !')});
              }
            const filename = post.picture.split('/uploads/')[1];
            
            fs.unlink(`./uploads/${filename}`, () => {
                PostModel.deleteOne({ _id: req.params.id }) 
                    .then(() => res.status(200).json({ message: 'Post supprimé !'}))
                    .catch(error => res.status(400).json({ error }));
            });
        })
    }
}


/**
 * Vérification de l'Object id pour voir la correspondance entre l'utilisateur et le like
 * 
 * Si tout se passe bien, permettre le like
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns Si l'object id n'est pas valdie, renvoyer une erreur 400 au client.
 */
exports.likePost = async (req, res, next) => {
    if (!ObjectID.isValid(req.params.id)) {
        return res.status(400).json('ID Unknown : ' + req.params.id);
    } else {
        try {
            await PostModel.findByIdAndUpdate(
                req.params.id,
                {
                    $addToSet: { likers: req.body.id }
                },
                { new : true },
            );
            await UserModel.findByIdAndUpdate(
                req.body.id,
                {
                    $addToSet: { likes: req.params.id}
                },
                { new : true },
            )
            return res.status(200).send('OK');
        }
        catch (error) {
            console.log(error)
            return res.status(400).send(error);
        }
    }
}


/**
 * Vérification de l'Object id pour voir la correspondance entre l'utilisateur et le unlike.
 * 
 * Si tout se passe bien, permettre le unlike.
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns Si l'object id n'est pas valdie, renvoyer une erreur 400 au client.
 */
exports.unLikePost = async (req, res, next) => {
    if (!ObjectID.isValid(req.params.id)) {
        return res.status(400).json('ID Unknown : ' + req.params.id);
    } else {
        try {
            await PostModel.findByIdAndUpdate(
                req.params.id,
                {
                    $pull: { likers: req.body.id }
                },
                { new : true },
            );
            await UserModel.findByIdAndUpdate(
                req.body.id,
                {
                    $pull: { likes: req.params.id}
                },
                { new : true },
            )
            return res.status(200).send('OK');
        }
        catch (error) {
            return res.status(400).send(error);
        }
    }
}

exports.commentPost = (req, res) => {
    if (!ObjectID.isValid(req.params.id))
      return res.status(400).send("ID unknown : " + req.params.id);
  
    try {
      return PostModel.findByIdAndUpdate(
        req.params.id,
        {
          $push: {
            comments: {
                commenterId: req.body.commenterId,
                commenterPseudo: req.body.commenterPseudo,
                text: req.body.text,
                timestamp: new Date().getTime(),
            },
          },
        },
        { new: true })
            .then((data) => res.send(data))
            .catch((err) => res.status(500).send({ message: err }));
    } catch (err) {
        return res.status(400).send(err);
    }
};

exports.editCommentPost = (req, res) => {
    if (!ObjectID.isValid(req.params.id))
      return res.status(400).send("ID unknown : " + req.params.id);
  
    try {
      return PostModel.findById(req.params.id, (err, docs) => {
        const theComment = docs.comments.find((comment) =>
          comment._id.equals(req.body.commentId)
        );
  
        if (!theComment) return res.status(404).send("Comment not found");
        theComment.text = req.body.text;
  
        return docs.save((err) => {
          if (!err) return res.status(200).send(docs);
          return res.status(500).send(err);
        });
      });
    } catch (err) {
      return res.status(400).send(err);
    }
};

exports.deleteCommentPost = (req, res) => {
    if (!ObjectID.isValid(req.params.id))
      return res.status(400).send("ID unknown : " + req.params.id);
  
    try {
      return PostModel.findByIdAndUpdate(
        req.params.id,
        {
          $pull: {
            comments: {
              _id: req.body.commentId,
            },
          },
        },
        { new: true })
              .then((data) => res.send(data))
              .catch((err) => res.status(500).send({ message: err }));
      } catch (err) {
          return res.status(400).send(err);
      }
  };