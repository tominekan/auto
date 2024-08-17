<script lang="ts">
    import { saveCarProfile } from "$backend/general";
    import { browser } from "$app/environment";
    export let data;
    export let form;

    let allCars = data?.allCars;

    function openCarModal(carID) {

        if (browser) {
            let dialog = document.getElementById(carID);
            dialog.showModal();
        }
    }

    function closeCarModal(carID) {
        if (browser) {
            let dialog = document.getElementById(carID);
            dialog.close();
        }
    }

    $: if (browser && form?.success) {
        allCars = form.results;
    }
</script>


<h1>Welcome to the Search Page </h1>

<form action="?/searchCars" method="POST" class="leform">
    <select name="carSort" id="sort">
        <option value="d_added">Default Sort</option>
        <option value="mileage">Mileage</option>
        <option value="price">Price</option>
        <option value="oldest">Oldest</option>
    </select>

    <select name="sortDirection" id="sortDirection">
        <option value={1}>Forward</option>
        <option value={-1}>Reverse</option>
    </select>
    <input type="text" placeholder="Search All Cars" name="submitQuery" id="sumbitQuery">
    <button type="submit">Search</button>
</form>


<div class="five_cars">
    {#each allCars as car}
        <!--IF THE CAR ISN'T UNDEFINED  -->
        {#if (car)}
            <div class="car_card">
                <div>
                    <img src={car?.carImages[0]} alt={"Image of " + car?.carName} width="200px">
                    <!-- .toLocaleString() JUST ADDS COMMAS IN THE RIGHT SPOTS -->
                    <h2>${car?.carPrice.toLocaleString()}</h2> 
                    <h3>{car?.carYear} {car?.carName}</h3>
                </div>
                <div class="action_buttons">
                    <button on:click={openCarModal(car?.uniqueId)}>See More</button>
                    <button on:click={saveCarProfile(car?.uniqueId)}>Save Car</button>
                </div>
                <dialog id={car?.uniqueId}>
                    <div class="modal_background">
                        <div class="modal">
                            <button on:click={closeCarModal(car?.uniqueId)}>Close this bih</button>
                            <h1>{car?.carName}</h1>
                            <h2>${car?.carPrice.toLocaleString()}</h2>
                            {#each car?.carImages as image}
                                <img src={image} alt={"Image of " + car?.carName}>
                            {/each}
                        </div>
                    </div>
                <dialog>
            </div>
        {/if}
    {/each}
</div>


<style>

    .leform {
        margin-bottom: 50px;
    }

    .five_cars {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr 1fr;
    }

    .modal_background {
        background-color: black;
        width: 100vw;
        height: 100vh;
        position: fixed;
        top: 0%;
        right: 0%;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .modal {
        width: 900px;
        height: max-content;
        padding-bottom: 10px;
        background-color: white;
    }
</style>