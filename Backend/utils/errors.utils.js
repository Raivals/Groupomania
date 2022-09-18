// Erreurs d'enregistrement
module.exports.signUpErrors = (err) => {
    let errors = { pseudo:'', email: '', password:'mauvais password'}

    if (err.message.includes('pseudo'))
    errors.pseudo = "Pseudo incorrect ou déjà prit."

    if (err.message.includes('email'))
    errors.email = 'Email incorrect ou déjà prit.'

    if (err.message.includes('password'))
    errors.password = 'Le mot de passe doit faire plus de 6 caractères.'

    if (err.code === 11000 && Object.keys(err.keyValue)[0].includes('pseudo'))
    errors.pseudo = 'Ce pseudo est déjà prit.';

    if (err.code === 11000 && Object.keys(err.keyValue)[0].includes('email'))
    errors.email = 'Cet email est déjà enregistré.';

    return errors;
};

// Erreurs de connexion
module.exports.signInErrors = (err) => {
    let errors = { email: '', password: ''}

    if (err.message.includes("email"))
    errors.email = "Email inconnu";

    if (err.message.includes("password"))
    errors.password = "Le mot de passe ne correspond pas"

    return errors
}