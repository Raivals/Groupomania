const UserModel = require('../models/user.model');
const jwt = require('jsonwebtoken');
const { signUpErrors, signInErrors } = require('../utils/errors.utils');

// Durée de vie du cookie (24h)
const maxAge = 3 * 24 * 60 * 60 * 1000;

// Création du token
const createToken = (id) => {
  return jwt.sign({id}, process.env.TOKEN_SECRET, {
    expiresIn: maxAge
  })
};

/**
 * Inscription sur le site création d'un mail & mdp hash + attribution d'une photo de profil générique.
 *  
 * Si erreur lors de l'inscription, renvoyer erreur 200 au client.
 * @param {*} req 
 * @param {*} res 
 */
exports.signUp = async (req, res) => {
  const {pseudo, email, password} = req.body
  const picture = `http://localhost:${process.env.PORT}/uploads/random-user.png`;
  try {
    const user = await UserModel.create({pseudo, email, password, picture });
    res.status(201).json({ user: user._id});
  }
  catch(err) {
    const errors = signUpErrors(err);
    res.status(200).send({ errors })
  }
};

/**
 * Connexion sur l'application, attribution d'un token stocké dans les cookies pour sauvegardé la connexion si on quitte la page
 * 
 * Si il y a une erreur lors de la connexion, renvoyer une erreur 200 au client.
 * @param {*} req 
 * @param {*} res 
 */
exports.signIn = async (req, res) => {
  const { email, password } = req.body

  try {
    const user = await UserModel.login(email, password);
    const token = createToken(user._id);
    res.cookie('jwt', token, { maxAge});
    res.status(200).json({ user: user._id})
  } catch (err){
    const errors = signInErrors(err);
    res.status(200).json({ errors });
  }
};

exports.logout = (req, res) => {
  res.cookie('jwt', '', { maxAge: 1 });
  res.redirect('/');
};