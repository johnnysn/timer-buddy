<script lang="ts">

import { activities } from "$lib/stores/activities-store";

</script>

<ul>
  {#each $activities as a}
    <li>{a.name}</li>
  {/each}
</ul>