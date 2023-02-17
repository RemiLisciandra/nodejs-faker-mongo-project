// Importation de la librairie faker et mongodb
import { faker } from "@faker-js/faker";
import { MongoClient, Db } from "mongodb";
import express from 'express';

// Configuration base de données
const url: string = 'mongodb://localhost:27017';
const dbName: string = 'tweeter';
const client: MongoClient = new MongoClient(url);

interface User {
    firstName: string;
    lastName: string;
    username: string;
    email: string;
}

interface Tweet {
    content: string;
    author: string;
    date: Date;
}

interface Comment {
    content: string;
    author: string;
    date: Date;
}

interface Retweet {
    author: string;
    date: Date;
    contentRetweet?: string | null;
}

let users: User[] = [];
let tweets: Tweet[] = [];
let retweets: Retweet[] = [];
let comments: Comment[] = [];
let retweetUsers: User[] = [];

users[0] = {
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    username: faker.internet.userName(),
    email: faker.internet.email()
}

retweetUsers[0] = {
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    username: faker.internet.userName(),
    email: faker.internet.email()
}

tweets[0] = {
    content: faker.lorem.sentence(),
    author: users[0].username,
    date: new Date()
}

comments[0] = {
    content: faker.lorem.sentence(),
    author: retweetUsers[0].username,
    date: new Date()
}

retweets[0] = {
    author: retweetUsers[0].username,
    date: new Date(),
    contentRetweet: faker.lorem.sentence()
}

const database: Db = client.db(dbName);

async function run(): Promise<void> {
    try {
        await database.collection('users').insertOne(users[0]);
        await database.collection('tweets').insertOne(tweets[0]);
        await database.collection('retweets').insertOne(retweets[0]);
        await database.collection('comments').insertOne(comments[0]);
    } finally {
        // Ensures that the client will close when you finish/error
        await client.close();
    }
}

run().catch(console.dir);