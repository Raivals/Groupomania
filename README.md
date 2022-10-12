# Groupomania
Projet numéro 7 de la formation Développeur Web Openclassrooms

Le projet consiste à construire un réseau social interne pour les employés de Groupomania. Le
but de cet outil est de faciliter les interactions entre collègues. Le département RH de
Groupomania a imaginé plusieurs fonctionnalités pour favoriser les échanges entre collègues.

NodeJs / Express / React(JS) / MongoDb / Redux / Sass

# Mise en place du Backend :

- Changer les informations de la ligne 5 dans /config/db.js pour y ajouter l'adresse de votre base de donnée MongoDB.
- Créez un fichier ".env" à la racine Backend et ajoutez :
    - PORT=5000
    - PORT_FRONT=3000
    - FRONT_END_URL=http://localhost:3000
    - DB_USER_PASS=Votre identifiant et Mdp de MongoDb sous cette forme : Identifiant:Mdp
    -TOKEN_SECRET=11c23d6f8685f9627fa49495775b7eb097b0ff296901922f704fd4eb8ea0c115475df3a0d31285bcad462f639cc423e919e060281d7cf76ad0faf006fb525713

 # Démarrer le back (la première fois) :

- Entrez dans la console cd Backend -> npm install 

# Mise en place du frontend : 

- Créez un fichier .env à la racine frontend et ajoutez :
    - REACT_APP_API_URL=http://localhost:5000/


 # Démarrer le Font (la première fois) :

- Entrez dans la console cd frontend -> npm install 

# Lancer le serveur back et mettre en ligne le front : 

Le Back-end : cd Backend -> npm start

Le Front-end : cd frontend -> npm start

Amusez vous bien !! 