// Importation de la librairie faker, mongodb et express
import { faker } from "@faker-js/faker";
import { MongoClient, Db } from "mongodb";
import express from 'express';

interface User {
    firstName: string;
    lastName: string;
    username: string;
    email: string;
}

// Configuration base de données
const url: string = 'mongodb://localhost:27017';
const dbName: string = 'tweeter';
const client: MongoClient = new MongoClient(url);

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

for (let i = 0; i < 200; i++) {
    users[i] = {
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        username: faker.internet.userName(),
        email: faker.internet.email()
    }

    tweets[i] = {
        content: faker.lorem.sentence(),
        author: users[i].username,
        date: new Date()
    }
    retweetUsers[i] = {
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        username: faker.internet.userName(),
        email: faker.internet.email()
    }
    comments[i] = {
        content: faker.lorem.sentence(),
        author: retweetUsers[i].username,
        date: new Date()
    }
    retweets[i] = {
        author: retweetUsers[i].username,
        date: new Date(),
        contentRetweet: faker.lorem.sentence()
    }
}

const database: Db = client.db(dbName);

async function run(): Promise<void> {
    try {
        await database.collection('users').insertMany(users);
        await database.collection('tweets').insertMany(tweets);
        await database.collection('retweets').insertMany(retweets);
        await database.collection('comments').insertMany(comments);
    } finally {
        // Ensures that the client will close when you finish/error
        await client.close();
    }
}

run().catch(console.dir);