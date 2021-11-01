<template>
  <div class="details">
    <h3>{{props.song.title}}</h3>
    <p>{{props.song.artist}}</p>
    <audio :src="props.song.songUrl" ref="audioPlayer"></audio>
    <button v-if="!isPlaying || isPausing" @click="handlePlay">Play</button>
    <button v-if="isPlaying" @click="handlePause">Pause</button>
    <button v-if="isPlaying" @click="handleStop">Stop</button>
  </div>
</template>

<script setup>
import {ref} from "vue";

const name = "SongDetails"
const props = defineProps(['song'])
const audioPlayer = ref(null);
const isPlaying = ref(false)
const isPausing = ref(false)

const handlePlay = ()=>{
  isPlaying.value = true
  isPausing.value = false
  const audio = new Audio(props.song.)
  audio.play()
}

const handlePause = () => {
  isPausing.value = true
  // audio.pause()
}

const handleStop = () =>{
  isPlaying.value = false
  isPausing.value = false
  // audio.pause()
  audio.currentTime = 0
}
</script>

<style scoped>
button{
  margin-right: 10px;
}
</style>
