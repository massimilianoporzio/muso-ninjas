<template>
  <div class="user-playlists">
    <h2>My Playlists</h2>
    <div v-if="playlists">
      <ListView :playlists="playlists"/>
    </div>
    <router-link :to="{name:'CreatePlaylist'}" class="btn">Create a new playlist</router-link>

  </div>
</template>

<script setup>
import getCollection from "@/composables/getCollection";
import ListView from "@/components/ListView";

const name =  "UserPlaylists"
import getUser from "@/composables/getUser";
import {onMounted} from "vue";
const {user} = getUser()
const {documents: playlists} = getCollection("playlists",['userId','==',user.value.uid]) // ALL THE PLAYLISTS

</script>

<style scoped>

</style>
