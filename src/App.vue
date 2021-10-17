<template>
  <div class="content">
    <Navbar/>
    <router-view/>
  </div>

</template>

<script setup>

import Navbar from "@/components/Navbar";
</script>

<style>
.content{
  margin: 0 auto;
  max-width: 1200px;
  padding: 0 20px;
}
</style>
