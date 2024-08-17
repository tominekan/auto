import { Collection, type Document, type WithId, type GridFSBucket, type SortDirection } from "mongodb";
import { faker } from "@faker-js/faker";
import { v4 as uuidv4 } from "uuid";
import { accountIsValid } from "./accountSystem";


// BUNCH OF FAKE IMAGES
import image1 from "/src/lib/assets/fakeCars/image1.jpeg";
import image2 from "/src/lib/assets/fakeCars/image2.jpeg";
import image3 from "/src/lib/assets/fakeCars/image3.jpeg";
import image4 from "/src/lib/assets/fakeCars/image4.jpeg";
import image6 from "/src/lib/assets/fakeCars/image6.jpeg";
import image7 from "/src/lib/assets/fakeCars/image7.jpeg";


// * Grabs N cars according to a sorting method ("d_added" | "price" | "mileage" | "oldest") 
// * If N is zero or elss, then it grabs and sorts all the entries
// * It normaly goes from lowest to highest, unless reverse is being sorted
// * Searches for subtring "query" within the car names
export async function grabNCars(db: Collection, n: number, sort: string | undefined, reverse: boolean, query: string | null | undefined) {
    let sortD: SortDirection = reverse ? -1 : 1;
    let nCars = undefined;

    if (query === null || query === undefined) {
        nCars = db.find();
    } else {
        // Searhces for substring query within carNames
        let re = new RegExp(String.raw`${query}`, "i");
        console.log(re);
        nCars = db.find({carName: re}) 
    }

    if (sort === "d_added") {
        nCars.sort({id: sortD});
    } else if (sort === "price") {
        nCars.sort({carPrice: sortD});
    } else if (sort === "mileage") {
        nCars.sort({carMileage: sortD});
    } else if (sort === "oldest") {
        nCars.sort({carYear: sortD});
    }


    if (n > 0) {
        nCars = nCars.limit(n);
    } 

    let allCars: Array<WithId<Document>| null | object| undefined> = [];
    // Transform the Cursor type(nCars) into an Array of Documents(allCars)
    while (await nCars.hasNext()) {
        let singleCar = await nCars.next();
        let carData = {
            uniqueId: singleCar?.uniqueId,
            carName: singleCar?.carName,
            carManu: singleCar?.carManu,
            carModel: singleCar?.carModel,
            carMileage: singleCar?.carMileage,
            carPrice: singleCar?.carPrice,
            intColor: singleCar?.intColor,
            extColor: singleCar?.extColor,
            fuelType: singleCar?.fuelType,
            carYear: singleCar?.carYear,
            carImages: singleCar?.carImages,
        }

        allCars.push(carData);
    }
    return allCars;
}




async function genRandomNum(start: number, end: number): Promise<number> {
    let randomNumber: number = Math.round(Math.random() * (end - start));
    return randomNumber + start;
}

// * Generates n random cars lmao, pushes it to the database
export async function generateNRandomCars(db: Collection, n: number) {
    //db.deleteMany({}); // FIRST EMPTY OUT ALL THE LIST
    let carImages = [image1, image2, image3, image4, image6, image7];
    for (let i: number = 0; i < n; i++) {
        let fakeCar = {
            uniqueId: uuidv4(),
            carName: faker.vehicle.vehicle(), // Acura Model NSX
            carManu: faker.vehicle.manufacturer(), // Acura
            carModel: faker.vehicle.model(), // NSX
            carMileage: await genRandomNum(200, 278000), // random number between 200mi-278,000mi
            carPrice: await genRandomNum(1000, 100000), // random number between 1,000 to 100,000 dollars
            intColor: faker.color.human(), // blue
            extColor: faker.color.human(), // red
            fuelType: faker.vehicle.fuel(), // fuelType
            carYear: await genRandomNum(1995, 2024), // 2021
            carImages: await shuffleArray(carImages),
        }

        db.insertOne(fakeCar);
    }
}


// * SEARCHES CAR FOR SPECIFIC ID
export async function searchCarsById(db: Collection, unqiueId: string) {
    let singleCar = await db.findOne({uniqueId: unqiueId});
    console.log("----UUIDS---")
    console.log(singleCar);
    let carData = {
        uniqueId: singleCar?.uniqueId,
        carName: singleCar?.carName,
        carManu: singleCar?.carManu,
        carModel: singleCar?.carModel,
        carMileage: singleCar?.carMileage,
        carPrice: singleCar?.carPrice,
        intColor: singleCar?.intColor,
        extColor: singleCar?.extColor,
        fuelType: singleCar?.fuelType,
        carYear: singleCar?.carYear,
        carImages: singleCar?.carImages,
    }

    return carData;
}

// * ---- CAR CRUD FUNCTIONS --- (without read lmao)
export async function createCar(accountDB: Collection, carDB: Collection, userToken: string, carInfo: object) {
    if (await accountIsValid(accountDB, userToken)) {
        await carDB.insertOne(carInfo);
    }
}

export async function editCar(accountDB: Collection, carDB: Collection, userToken: string, updatedInfo: object, uniqueId: string) {
    if (await accountIsValid(accountDB, userToken)) {
        await carDB.updateOne({uniqueId: uniqueId}, {$set: updatedInfo});
    }
}

export async function deleteCar(carSold: boolean, accountDB: Collection, carDB: Collection, userToken: string, uniqueId: string) {
    if (await accountIsValid(accountDB, userToken)) {
        await carDB.deleteOne({uniqueId: uniqueId});
        if (carSold) {
            accountDB.updateOne({userToken: "siteStats"}, {$inc: {soldCars: 1}});
        }
    }
}




async function shuffleArray(array: Array<any>): Promise<Array<any>>{
    array.sort(() => Math.random() - 0.5);
    return [...array]
}
// * Example Car Model
// * IMAGES ARE STORED ON THE WEBSITE, SEPARATELY
let exampleCar = {
    uniqueId: "SOME-UNIQUE-ID", // identification for specific cars
    carName: "Acura Model NSX",
    carManu: "Acura", // Car Manufacturer
    carModel: "NSX",
    carMileage: 100000,
    carPrice: 50000,
    intColor: "blue", // Interior Colors
    extColor: "aquamarine", // Exterior Colors
    fuelType: "gasoline",
    carYear: 2008,
    carImages: ["lebron/james.png"] 
}