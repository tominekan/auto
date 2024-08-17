import { searchCarsById } from "$backend/carSystems";
import db from "$db/mongo";

export async function GET({ url }) {
    let savedCars: string  = url.searchParams.get("savedCars") ?? "";
    let allCarId: Array<any> = JSON.parse(savedCars); 
    let allCars: Array<any> = [,];


    for (let i = 0; i<allCarId.length; i++) {
        allCars.push(await searchCarsById(db.carDB, allCarId[i]));
    }

    let result = {
        cars: allCars,
    }

    return new Response(JSON.stringify(result))
}
