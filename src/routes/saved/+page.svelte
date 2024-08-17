<script lang="ts">
    import { getSavedCars, saveCarProfile } from "$backend/general";
    import { onMount } from "svelte";

    let allCars = "";
    async function grabSavedCarsData() {
        const response = await fetch(`/saved?savedCars=${localStorage.getItem("savedCars")}`, {
            method: "GET",
            headers: {
                "content-type": "application/json"
            }
        })

        let results = await response.json()
        console.log(results.cars[1]);
        return results.cars;
    }

    onMount(async () => {
        allCars = await grabSavedCarsData();
    })
</script>


<h1>Saved Cars</h1>
<p>Here are all the saved cars</p>
<div class="all_cars">
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
                    <button>See More</button>
                    <button on:click={saveCarProfile(car?.uniqueId)}>Save Car</button>
                </div>
            </div>
        {/if}
    {/each}
</div>

<style>
    .car_card {
        border: 1px solid black;
        width: max-content;
    }


    .five_cars {
        display: flex;
        justify-content: space-evenly;
    }
</style>