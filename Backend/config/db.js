const mongoose = require('mongoose');

mongoose    
    .connect(
        "mongodb+srv://" + process.env.DB_USER_PASS + "@cluster0.ui6swtq.mongodb.net/groupomania",
    )
    .then(() => console.log('Connected to MongoDb'))
    .catch((err) => console.log("Failed to connect to MongoDB", err));