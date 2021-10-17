<template>
  <form @submit.prevent="handleSubmit">
    <h3>Signup</h3>
    <input type="text" placeholder="Display name" v-model="displayName">
    <input type="email" placeholder="Email" v-model="email">
    <input type="password" placeholder="Password" v-model="password">
    <div v-if="error" class="error">{{error}}</div>
    <button v-if="!isPending">Signup</button>
    <button v-if="isPending" disabled>Loading...</button>
  </form>
</template>

<script setup>

import {ref} from "vue";
import useSignup from "@/composables/useSignup";

const name = "Signup"
const displayName = ref('')
const email = ref('')
const password = ref('')

const {error,signup,isPending} = useSignup()

const handleSubmit = async ()=>{
  const resp = await signup(email.value,password.value,displayName.value)
  if(!error.value){
    //TUTTO OK
    console.log("User signed up!")
  }
}
</script>

<style scoped>

</style>
