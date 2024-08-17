// COMMON FUNCTIONS USED ACROSS SEVERAL FILES
import { writeFileSync } from "fs";
import { genBrowserToken } from "./dataGen";

// * This just basically stores the unique Id of the car, then let's the backend pull car info based on the car's unique Id
export async function saveCarProfile(carId: string) {
    let savedCars = localStorage.getItem("savedCars");
    if (savedCars != undefined) { // if theres any cars already saved
        let updatedSaves = JSON.parse(savedCars); // Transform current array of saved cars back into an array lol
        // make sure entries are new
        if (!updatedSaves.includes(carId)) {
            updatedSaves.push(carId); 
        }
        localStorage.setItem("savedCars", JSON.stringify(updatedSaves)); 
    } else {
        localStorage.setItem("savedCars", JSON.stringify([carId,])) // Make a new array of car unique Id's, store that bih
    }
}

// * Grab all saved cars and returns their unique id's as a list
export function getSavedCars() {
    let savedCars = localStorage.getItem("savedCars")
    if (savedCars != undefined) {
        return JSON.parse(savedCars);
    }
}

// * Uploads a the image file to assets/carImages and returns the path 
export async function uploadCarImage(fileToUpload: File): Promise<string> {
    let imageName = genBrowserToken();
    let fileExtension = fileToUpload.name.split('.').pop();
    let pathName = `/src/lib/assets/carImages/${imageName}.${fileExtension}`;
    writeFileSync(pathName, Buffer.from(await fileToUpload.arrayBuffer()));
    return pathName;
}