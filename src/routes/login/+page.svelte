<script lang="ts">
    import { browser } from "$app/environment";
    import { goto } from "$app/navigation";
    export let form;

    // We're using sessionStorage because sessionStorage is impermanent
    function updateAdminInfo() {
        sessionStorage.setItem("fullName", form?.info.fullName);
        sessionStorage.setItem("userToken", form?.info.userToken);
        sessionStorage.setItem("username", form?.info.username);
    }


    // Dollar Sign Checks All the time instead of once
    $: if (form?.success && browser) {
        updateAdminInfo();
        goto("/dashboard");
    }
</script>


<!-- <h1>Admin Login</h1>
<form method="POST" action="?/login">
    <span>
        <p>Username</p>
        <input type="text" name="username" id="username">
    </span>
    <span>
        <p>Password</p>
        <input type="text" name="Password" id="password">
    </span>
</form> -->


<h1>Admin Signup</h1>
<form method="POST" action="?/createadmin">
    <span>
        <p>Full Name</p>
        <input type="text" name="fullname" id="fullname" required>
    </span>
    <span>
        <p>Username</p>
        <input type="text" name="username" id="username" required>
    </span>
    <span>
        <p>Password</p>
        <input type="text" name="password" id="password" autocomplete="off" required>
    </span>

    <button type="submit">Create Account</button>
</form>
