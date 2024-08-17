<script lang="ts">
    import { browser } from "$app/environment";

    let fullName: string | null;
    if (browser) {
        fullName = sessionStorage.getItem("fullName");
    }
</script>

<p>
    Admin Page, Welcome {fullName}
</p>

<slot />