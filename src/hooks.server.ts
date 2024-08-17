import { startMongo } from "$db/mongo";

// Start mongo db
startMongo().then(() => {
	console.log('Mongo Started.');
}).catch(e => { console.log("ERROR, ERROR"); console.error(e)});