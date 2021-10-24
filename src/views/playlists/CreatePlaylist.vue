<template>
  <form @submit.prevent="handleSubmit">
    <h4>Create New Playlist</h4>
    <input type="text" required placeholder="Playlist title" v-model="title">
    <textarea required placeholder="Playlist description" v-model="description"></textarea>
    <label>Upload your playlist cover image</label>
    <input type="file" @change="handleChange">
    <div class="error">{{fileError}}</div>
    <div class="error">{{error}}</div>
    <button v-if="!isPending">Create</button>
    <button v-if="isPending">Saving...</button>
  </form>
</template>

<script setup>
import {ref} from "vue";
import useStorage from "@/composables/useStorage";
import useCollection from "@/composables/useCollection";
import getUser from "@/composables/getUser";
import {serverTimestamp } from "firebase/firestore";
const {filePath, url, uploadImage} = useStorage()
const {error, addDocument} = useCollection('playlists')
const {user} = getUser()
const name = "CreatePlaylist"
const title = ref('')
const description = ref('')
const file = ref(null)
const fileError = ref(null)

//local is pending for multiple operations
const isPending = ref(false)


//allowed types
const types = ['image/png','image/jpeg']

const handleChange = (e) =>{
  const selected = e.target.files[0]
  if(selected && types.includes(selected.type)){
    file.value = selected
    //reset errori sul file
    fileError.value = null
  }
  else{
    file.value = null // rimesso a null se ho de-selezionato il file
    e.target.value=null
    fileError.value = "Please select an image file (png or jpeg)"

  }
  console.log(selected)
}

const handleSubmit =async () => {
  if(file.value){
    isPending.value = true
   await  uploadImage(file.value)
   await addDocument({
     title: title.value,
     description: description.value,
     userId: user.value.uid,
     userName: user.value.displayName,
     coverUrl: url.value,
     filePath: filePath.value, //to delete from phyiscal storage
     songs: [],
     createdAt: serverTimestamp()
   })
    isPending.value = false
    if(!error){
      console.log("Playlist added")
    }

  }
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
