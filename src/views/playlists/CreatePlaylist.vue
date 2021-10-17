<template>
  <form @submit.prevent="handleSubmit">
    <h4>Create New Playlist</h4>
    <input type="text" required placeholder="Playlist title" v-model="title">
    <textarea required placeholder="Playlist description" v-model="description"></textarea>
    <label>Upload your playlist cover image</label>
    <input type="file">
    <div class="error">{{error}}</div>
    <button>Create</button>
  </form>
</template>

<script setup>
import {ref} from "vue";
const name = "CreatePlaylist"
const title = ref('')
const description = ref('')

const handleSubmit = () => {

}

</script>

<style scoped>
form {
  background: white;
}
input[type="input"]{
  margin: 0;
  padding: 0;
}
label{
  display: block;
  font-size: 12px;
  margin-top: 30px;
}
button {
  margin-top: 20px;
}
</style>
