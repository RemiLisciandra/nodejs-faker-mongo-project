// Importation de la librairie faker et mongodb
const {faker} = require("@faker-js/faker");
const {MongoClient} = require("mongodb");
const express = require('express');

// Configuration base de données
const url = 'mongodb://localhost:27017';
const dbName = 'tweeter';
const client = new MongoClient(url);

let users = [];
let tweets = [];
let retweets = [];
let comments = [];
let retweetUsers = [];

users[0] = {
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    get fullName() {
        return `${this.firstName} ${this.lastName}`;
    },
    email: faker.internet.email()
}

retweetUsers[0] = {
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    get fullName() {
        return `${this.firstName} ${this.lastName}`;
    },
    email: faker.internet.email()
}

tweets[0] = {
    content: faker.lorem.sentence(),
    author: users[0].fullName,
    date: new Date()
}

comments[0] = {
    content: faker.lorem.sentence(),
    author: retweetUsers[0].fullName,
    date: new Date()
}

retweets[0] = {
    author: retweetUsers[0].fullName,
    date: new Date(),
    // Le contenu supplémentaire ajoutable par l'utilisateur qui retweet, c'est facultatif donc c'est possiblement null
    contentRetweet: faker.lorem.sentence()
}

const database = client.db(dbName);

async function run() {
    try {
        await database.collection('users').insertOne(users[0], function (error) {
            if (error) {
                console.log(error);
            }
        })

        await database.collection('tweets').insertOne(tweets[0], function (error) {
            if (error) {
                console.log(error);
            }
        })

        await database.collection('retweets').insertOne(retweets[0], function (error) {
            if (error) {
                console.log(error);
            }
        })

        await database.collection('comments').insertOne(retweets[0], function (error) {
            if (error) {
                console.log(error);
            }
        })
    } finally {
        // Ensures that the client will close when you finish/error
        await client.close();
    }
}

run().catch(console.dir);