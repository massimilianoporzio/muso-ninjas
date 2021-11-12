<template>
  <div v-if="error" class="error">{{error}}</div>
  <div v-if="playlist" class="playlist-details">

    <!-- playlist information -->
    <div class="playlist-info">
      <div class="cover">
        <img :src="playlist.coverUrl" alt="playlist doc">
      </div>
      <h2>{{playlist.title}}</h2>
      <p class="username">Created by {{playlist.userName}}</p>
      <p class="description">{{playlist.description}}</p>
      <button @click="handleClick" v-if="ownership" >Delete playlist</button>
    </div>

      <!--    song list-->
      <div class="song-list">
        <div v-if="!playlist.songs.length">No songs have benn added yet</div>
        <div v-for="song in playlist.songs" :key="song.id" class="single-song">
            <SongDetails :song="song" :ownership="ownership" :playlist="playlist"/>

        </div>
        <AddSong v-if="ownership" :playlist="playlist"/>
      </div>
  </div>
</template>

<script setup>
import getDocument from "@/composables/getDocument";
import getUser from "@/composables/getUser";
import {computed} from "vue";
import useDocument from "@/composables/useDocument";
import useStorage from "@/composables/useStorage";
import {useRouter} from "vue-router";
import AddSong from "@/components/AddSong";
import SongDetails from "@/components/SongDetails";



const name = "PlayListDetails"
const props = defineProps(['id']) // arriva dal router come prop
const {error, document: playlist} = getDocument('playlists',props.id)
const {deleteDocument,updateDocument} = useDocument('playlists',props.id)

const {user} = getUser()
const {deleteFile} = useStorage()
const router = useRouter()



const handleClick =  async () => {
 await deleteFile(playlist.value.filePath)
 await deleteDocument()
 router.push({name: 'Home'})
}

// user is reactive and change if a user is logging out or logging in so we use a computed prop
const ownership = computed(()=>{
  //    c'è la palylist?  c'è un utente?    l'id utente della playlist = l'id utente corrente
  return playlist.value && user.value    && user.value.uid === playlist.value.userId
})
</script>

<style scoped>
.playlist-details {
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 80px;
}
.cover {
  overflow: hidden;
  border-radius: 20px;
  position: relative;
  padding: 160px;
}
.cover img {
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  min-width: 100%;
  min-height: 100%;
  max-width: 200%;
  max-height: 200%;
}
.playlist-info {
  text-align: center;
}
.playlist-info h2 {
  text-transform: capitalize;
  font-size: 28px;
  margin-top: 20px;
}
.playlist-info p {
  margin-bottom: 20px;
}
.username {
  color: #999;
}
.description {
  text-align: left;
}

</style>
