const jwt = require("jsonwebtoken");
const UserModel = require("../models/user.model");


/**
 *  Vérifie le token reçue en front et permet uniquement à dess requêtes authentifié de réussir
 * 
 * Si une erreur se déclare, envoyer une réponse avec un code 401 (non authorisé) au client.
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
exports.checkUser = (req, res, next) => {
  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(token, process.env.TOKEN_SECRET, async (err, decodedToken) => {
      if (err) {
        res.locals.user = null;
        res.cookie("jwt", "", { maxAge: 1 });
        res.status(401).json({message: "non connecté"});
      } else {
        let user = await UserModel.findById(decodedToken.id);
        res.locals.user = user;
        next();
      }
    });
  } else {
    res.status(401).json({message: "non connecté"});
    res.locals.user = null;
  }
};


/**
 *  Vérifie si le token si un token a été attribué à un client 
 * 
 * Si ilm n'y a pas de token, renvoyer une erreur 200 au client "No token"
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
exports.requireAuth = (req, res, next) => {
  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(token, process.env.TOKEN_SECRET, async (err, decodedToken) => {
      if (err) {
        console.log(err);
        res.send(200).json('no token')
      } else {
        console.log(decodedToken.id);
        next();
      }
    });
  } else {
    console.log('No token');
  }
};


