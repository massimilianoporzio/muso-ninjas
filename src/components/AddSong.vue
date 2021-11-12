<template>
 <div class="add-song">
   <button v-if="!showForm" @click="showForm=true">Add Songs</button>
   <form v-if="showForm" @submit.prevent="handleSubmit">
      <h4>Add a New Song</h4>
      <input type="text" placeholder="Song title" required v-model="title">
      <input type="text" placeholder="Artist" required v-model="artist">
      <label>Upload your song file (mp3)</label>
      <input type="file" @change="handleChange" ref="inputFile" required>
      <div class="error">{{fileError}}</div>
      <div class="error">{{error}}</div>
      <button v-if="!isPending">Add</button>
      <button v-if="isPending">Saving...</button>
   </form>
 </div>
</template>

<script setup>
import {ref} from "vue";
import useStorage from "@/composables/useStorage";
import useCollection from "@/composables/useCollection";
import useDocument from "@/composables/useDocument";
import getUser from "@/composables/getUser";
const {filePath, url, uploadSong} = useStorage()
const inputFile = ref(null)

const  name = "AddSong"
const props = defineProps(['playlist'])
const title = ref('')
const artist = ref('')
const file = ref(null)
const fileError = ref(null)
//local is pending for multiple operations
const isPending = ref(false)
const {error, updateDocument,getPlaylistWithSongUrl} = useDocument('playlists',props.playlist.id)
const {addDocument} = useCollection('songs') // for tracking all the added songs

const showForm = ref(false)
const { v4: uuidv4 } = require('uuid');

//allowed types
const types = ['audio/mpeg3','audio/x-mpeg-3','audio/mpeg']


const handleChange = (e) =>{

  const selected = e.target.files[0]
  console.log('type is',  selected.type)
  if(selected && types.includes(selected.type)){
    file.value = selected
    //reset errori sul file
    fileError.value = null
  }
  else{
    file.value = null // rimesso a null se ho de-selezionato il file
    e.target.value=null
    fileError.value = "Please select an mp3 file"

  }
  console.log(selected)
}

const handleSubmit = async ()=>{
  try{
     const {user}=getUser()
     error.value = null
      if(file.value){
      //VERIFICO CHE NON CI SIA STESSO FILE IN QUELLA PLAYLIST

      const path = `songs/${user.value.uid}/${file.value.name}`
        console.log('il path è',path)
      if(props.playlist.paths){
        if(props.playlist.paths.includes(path)){
          //FILE GIA PRESENTE!!!!
          throw new Error('This song is already present in this playlist')
        }
      }

      isPending.value = true
      await  uploadSong(file.value)

      const newSong = {
        title: title.value,
        artist: artist.value,
        id: uuidv4(),
        songUrl: url.value,
        filePath: filePath.value, //to delete from phyiscal storage
      }
      const paths = new Set(props.playlist.paths)

      const newPaths = paths.add(filePath.value)
      console.log('dopo',newPaths)
      await updateDocument({
        //spread the existing songs and add a newSong
        songs: [...props.playlist.songs,newSong],
        paths: [... newPaths]
      })
      isPending.value = false
      title.value = ''
      artist.value = ''
      file.value = null
      inputFile.value.value = null
      showForm.value = false
      }
  }catch (err){
    error.value=err.message
  }




}

</script>

<style scoped>
.add-song {
  text-align: center;
  margin-top: 40px;
}
form{
  max-width: 100%;
  text-align: left;
}
</style>
