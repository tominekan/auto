<script lang="ts">
    import { page } from "$app/stores";

    // Checks if the link is either the admin page or login page
    let isAdminLink = $page.url.pathname.includes("login") || $page.url.pathname.includes("dashboard")
</script>

<!-- IF IS NOT ADMIN PAGE, USE DEFAULT NAVBAR -->
{#if !isAdminLink}
<span class="s"><a href="/">Home</a></span>
<span class="s"><a href="/about">About</a></span>
<span class="s"><a href="/saved">Saved Cars</a></span>
<span class="s"><a href="/search">Search Cars</a></span>
<span class="s"><a href="/dashboard">Dashboard</a></span>
{/if}

<slot />

<style>
    .s {
        padding-right: 30px;
    }
</style>