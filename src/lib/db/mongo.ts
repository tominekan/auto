import { MongoClient } from "mongodb";
import { MONGO_KEY } from "$env/static/private";

const client = new MongoClient(MONGO_KEY);


export function startMongo() {
    console.log(`MONGO_KEY: ${MONGO_KEY}`)
    console.log("Starting MongoDB Client...");
    return client.connect();
}

export default {
    accountDB: client.db("autoviewdb").collection("accounts"),
    carDB: client.db("autoviewdb").collection("allCars"),
};