<script lang="ts">
export let data;
import { saveCarProfile } from "$backend/general";
</script>

<h1>Welcome to da Home Page</h1>
<p>U want cars, we got cars. Check out our latest selection</p>
<div class="five_cars">
    {#each data?.latestCars as car}
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