import { grabNCars } from "$backend/carSystems";
import databases from "$db/mongo";

export const actions = {
    searchCars: async ({ request }) => {
        let data = await request.formData();
        let sortMethod = data.get("carSort")?.toString();
        let sortDirection = data.get("sortDirection") === "1" ? false : true; // reverse direction = true, forward direction = false
        let searchQuery: string | undefined | null = data.get("submitQuery")?.toString().trim();

        if (searchQuery === null || searchQuery === "") {
            searchQuery = null;
        }
        console.log("---LEBRON JAMES SEARCH BABY-----");
        console.log(`SORT FACTOR: ${sortMethod}`);
        console.log(`SORT DIRECTION: ${sortDirection}`);
        console.log(`SEARCH QUERY: ${searchQuery}`);

        let res = await grabNCars(databases.carDB, 0, sortMethod, sortDirection, searchQuery);
        console.log(res);

        return {
            results: res,
            success: true,
        }
    }
}

export async function load({}) {
    return {
        allCars: await grabNCars(databases.carDB, 0, "d_added", false, null),
    }
}