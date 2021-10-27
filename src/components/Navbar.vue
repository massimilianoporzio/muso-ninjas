<template>
  <div class="navbar">
    <nav>
      <img src="@/assets/ninja.png" alt="ninja logo">
      <h1><router-link :to="{name:'Home'}">Muso Ninjas</router-link></h1>
      <div class="links">
        <div v-if="user">
          <router-link :to="{name:'CreatePlaylist'}">Create Playlist</router-link>
          <button @click="handleClick">Logout</button>
        </div>
        <div v-else>
          <router-link class="btn" :to="{name:'Signup'}">Signup</router-link>
          <router-link class="btn" :to="{name:'Login'}">Login</router-link>
        </div>

      </div>
    </nav>
  </div>
</template>

<script setup>

import {useRouter} from "vue-router";
import useLogout from "@/composables/useLogout";
import getUser from "@/composables/getUser";

const name = "Navbar"
const router = useRouter()
const {logout, error, isPending} = useLogout()
const handleClick = async ()=>{
  await logout()
  if(!error.value){
    console.log("USER LGOGED OUT - - - -")
    router.push({name: 'Login'})
  }
}

const {user} = getUser()

</script>

<style scoped>
.navbar {
  padding: 16px 10px;
  margin-bottom: 60px;
  background: white;
}
nav{
  display: flex;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
}
nav h1 {
  margin-left: 20px;
}
nav .links {
  margin-left: auto;
}

nav .links a,button {
  margin-left: 16px;
  font-size: 14px;
}

nav img {
  max-height: 60px;
}
</style>
