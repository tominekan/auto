import {genHash, genBrowserToken } from "./dataGen";
import { compare } from "bcrypt";
import type { Collection, Document, WithId } from "mongodb";

// * Creates new account - MAYBE USE A SINGLE DICTIONARY INSTEAD OF AL THESE ARGUMENTS
export async function createAdmin(db: Collection, username: any, name: any, password: any): Promise<object> {
    // Generate password hash to store on server, and generate token specific to the user
    const hash = await genHash(password);
    const uToken = genBrowserToken();

    const userInfo = {
        fullName: name,
        hash: hash,
        userToken: uToken,
        username: username,
    }

    const result = await db.insertOne(userInfo);
    console.log(`New Admin Created: username: ${result.insertedId}`);

    let results = {
        fullName: name,
        userToken: uToken,
        username: username,
    }
    return results;
}

// * Checks if account if valid by seeing if userToken exists in accountDB
export async function accountIsValid(accountDB: Collection, userToken: string): Promise<boolean> {
    if (accountDB.findOne({userToken: userToken}) !== null) {
        return true;
    }
    return false;
}

// * This faciliatates a manual login
export async function login(db: Collection, username: any, password: any): Promise<object | boolean> {
    // Get hash of their entered password
    const serverHash = await getServerHash(db, username);
    let isSamePassword = await compare(password, serverHash);

    // If the passweord is the same, then grab the userinfo and pass it over to client
    if (isSamePassword) {
        let userInfo: WithId<Document> | null = await db.findOne({username: username});
        if (userInfo !== null) {
            return {
                fullName: userInfo.fullName,
                userToken: userInfo.userToken,
                username: userInfo.username,
            }
        }
        return false;
    }
    return false;
}

async function getServerHash(db: Collection, username: string): Promise<string> {
    let serverHash: WithId<Document> | null = await db.findOne({username: username});
    if (serverHash !== null) {
        return serverHash.hash;
    }
    return "false";
}


/*
// Checks if the username is unique 
export async function isValidUsername(db, username) {
    let otherUserNameExists = await db.find({username: username});
    if (otherUserNameExists) {
        return false;
    }
    return true;
}

// Get account info
export async function getAccountInfo(db, userID) {
    let accountInfo = await db.findOne({_id: userID}).lean();
    return accountInfo;
}

// Checks if the speicifed token exists on the server
// NEED TO CHECK THIS CODE AGAIN
async function tokenExistsOnServer(db, token, username) {
    let result = await db.users.findOne({
        "username": username,
        userToken: token,
    })
    if (result) {
        return true;
    }
    return false;
}


export async function autoLogin(db) {
    let username = localStorage.getDeviceId("username")
    let uToken = JSON.parse(localStorage.getItem("userToken"));
    let current_device_id = await getDeviceId()
    // The current device ID matches the stored device ID
    if ((uToken.hasOwnProperty(current_device_id))) {
        if (await tokenExistsOnServer(db, uToken, username)) {
            let newToken = await genBrowserToken(); // Generate new browser token
            // Update new browser token in localStorage
            localStorage.setItem("userToken", JSON.stringify(newToken));

            // Update browser token 
            db.users.updateOne({
                username: username,
                userToken: uToken,
            },
            {$set: {userToken: newToken}}
            );
            return true;
        }
    }

    // If the verification doesn't work, clear localStorage and reload
    localStorage.clear();
    location.reload();
}


async function infoLogin(db, username, password) {
    const currentHash = await genHash(password);
}

async function getServerHash(db, username) {
    
} 

*/