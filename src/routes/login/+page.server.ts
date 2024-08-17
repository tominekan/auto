import databases from "$db/mongo";
import {login, createAdmin } from "$backend/accountSystem";

// I call it login, but it really handles both LOGIN and SIGNUP functions lmao
export const actions = {
    // Logs the person into an admin account
    login: async ({ request }) => {
        // Grab data from the form
        const formData = await request.formData();
        let username = formData.get("username");
        let password = formData.get("password");

        // Log in amd grab the usertoken assigned to the specific admin account
        let userInfo = await login(databases.accountDB, username, password);


        // Pass user's information to client
        return {
            info: userInfo,
            success: true,
        }
    },

    createadmin: async ({ request }) => {
        const formData = await request.formData();
        let username = formData.get("username");
        let password = formData.get("password");
        let fullName = formData.get("fullname");

        let userInfo = await createAdmin(databases.accountDB, username, fullName, password);

        return {
            info: userInfo,
            success: true,
        }
    }
}