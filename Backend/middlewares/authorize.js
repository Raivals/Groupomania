const jwt = require("jsonwebtoken");
const User = require("../models/User");

/**
 * Vérifier avec la librairie jsonwebtoken si le token spécifié dans "header authorization" est valide ou non.
 * 
 * Si une erreur se déclare, envoyer une réponse avec un code 401 (non autorisé) au client.
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
exports.token = async (req, res, next) => {
	try {
		// chaîne facultative "?." vérifie si l'autorisation existe ou non et renvoie "undefined" si non.
		const token = req.headers.authorization?.split(" ")[1];
		const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET_KEY);
		const userId = decodedToken.userId;

		// Vérifier si l'utilisateur existe toujours 
		const user = await User.findById(userId);
		if (!user) throw { message: "L'utilisateur n'existe plus" };

		if (req.body.userId && req.body.userId !== userId)
			throw { message: "Non autorisé" };

		res.locals.userId = userId;

		next();
	} catch (e) {
		res.status(401).json(e);
	}
};

/**
 * Vérifiez si la sauce appartient bien au demandeur.
 *
 * Si la sauce n'appartient pas au demandeur, envoyer une réponse avec un code 403 (forbidden) au client.
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @returns Si la sauce n'appartient pas au demandeur, arrêter le processus en retourannt la fonction.
 */
exports.sauce = (req, res, next) => {
	const userId = res.locals.userId;
	const sauce = res.locals.sauce;

	if (sauce.userId !== userId)
		return res.status(403).json({ message: "Sauce non possédée..." });

	next();
};
