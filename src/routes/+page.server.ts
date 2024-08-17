import databases from "$db/mongo";
import { generateNRandomCars, grabNCars } from "$backend/carSystems";

// Loads data on home page login
export async function load({}) {
    return {
        latestCars: await grabNCars(databases.carDB, 5, "d_added", false, null),
    }
}