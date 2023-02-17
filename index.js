// Importation de la librairie faker et mongodb
const {faker} = require("@faker-js/faker");
const {MongoClient} = require("mongodb");

// Configuration base de données
const url = 'mongodb://localhost:27017';
const dbName = 'tweeter';
const client = new MongoClient(url);

// Utilisateur qui tweet
const user = {
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    get fullName() {
        return `${this.firstName} ${this.lastName}`;
    },
    email: faker.internet.email()
}

// Utilisateur qui retweet
const retweetUser = {
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    get fullName() {
        return `${this.firstName} ${this.lastName}`;
    },
    email: faker.internet.email()
}

// Le tweet
const tweet = {
    content: faker.lorem.sentence(),
    author: user.name,
    date: new Date()
}

// Le commentaire du tweet
const comment = {
    content: faker.lorem.sentence(),
    author: user.name,
    date: new Date()
}

// Le retweet
const retweet = {
    author: retweetUser.name,
    date: new Date(),
    // Le contenu supplémentaire ajoutable par l'utilisateur qui retweet, c'est facultatif donc c'est possiblement null
    contentRetweet: null
}

// Le contenu supplémentaire de l'utilisateur qui retweet
const userContentRetweet = faker.lorem.sentence();

// Si le contenu supplémentaire de l'utilisateur qui retweet n'est pas vide
if (userContentRetweet) {
    retweet.contentRetweet = null
}

// Connexion à la base de données Mongo
async function run() {
    try {
        const database = client.db(dbName);
        const users = database.collection('users');
        const tweets = database.collection('tweets');

        // Insertion utilisateur
        await users.insertOne(user, function (error, result) {
            if (error) {
                console.log(error);
                return
            }
            console.log(`Utilisateur inséré : ${user.fullName}`);

            // Récupération de l'id de l'utilsateur
            const userId = result.insertId();
        })
    } finally {
        // Ensures that the client will close when you finish/error
        await client.close();
    }
}

run().catch(console.dir);