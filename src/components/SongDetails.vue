<template>
  <div class="details">

    <h3>{{props.song.title}}</h3>
    <p>{{props.song.artist}}</p>
    <div class="single-song">

        <div class="audio">
          <audio controls>
            <source :src="props.song.songUrl" type="audio/mpeg">
            Your browser does not support the audio tag.
          </audio>
        </div>

        <div class="delete">
          <button v-if="props.ownership & !isPending" @click="handleDeleteSong(props.song.id,props.song.filePath)">delete</button>
          <button v-if="props.ownership & isPending">deleting...</button>

        </div>



    </div>


  </div>
</template>

<script setup>

import useDocument from "@/composables/useDocument";
import {ref} from "vue";
import useStorage from "@/composables/useStorage";
const isPending = ref(false)
const name = "SongDetails"
const props = defineProps(['song','ownership','playlist'])
const {error,updateDocument,getPlaylistWithSongUrl} = useDocument('playlists',props.playlist.id)
const {deleteFile}=useStorage()

const handleDeleteSong = async (songId,songPath)=>{

  error.value = null // reset errors
  isPending.value = true


  //VA CERCATO NELLE PLAYLIST SE CI SONO SONG CON  stesso filePath
  //SE CE NE RIMANE SOLO 1 LA CANCELLO ANCHE DAL BUCKET SE NO NON CANCELLO IL FILE MA SOLO LA CAZONE DALLA PLAYLIST
  const {count} = await getPlaylistWithSongUrl(songPath)
  if (count===1) {
    //DEVO ELIMINARE ANCHE IL FILE
    await deleteFile(props.song.filePath)
  }
  const originalPaths = new Set(props.playlist.paths)
  originalPaths.delete(props.song.filePath)
  await updateDocument({

      songs: props.playlist.songs.filter(s=>s.id!==songId),
      //FARE UPDATE DEI SONGPATHS!!!!
      paths: [...originalPaths]

    })
  isPending.value = false
}


</script>

<style scoped>
button{
  margin-right: 10px;
  margin-top: 10px;
  margin-left: 10px;
}
.single-song {
  padding: 10px 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 2px dashed var(--secondary);
  margin-bottom: 20px ;
}
</style>
