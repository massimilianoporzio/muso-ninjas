<template>
  <div class="home">
    <div class="error" v-if="error">Could not fetch the data</div>
    <div v-if="documents">
     <ListView :playlists="documents"/>
    </div>
  </div>
</template>

<script setup>

import ListView from "@/components/ListView";

const name = 'Home'
import getCollection from "@/composables/getCollection";
const {documents,error} = getCollection('playlists')


</script>
