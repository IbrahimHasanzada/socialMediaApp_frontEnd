<script setup lang="ts">
import Header from '@/components/Header.vue';
import RightSideBar from '@/components/RightSideBar.vue';
import { RouterView } from 'vue-router';
</script>

<template>
  <div class="max-w-screen-lg mx-auto flex  ">
    <div class="w-72">
      <Header />
    </div>
    <main class="w-full">
      <RouterView />
    </main>
    <div class="!w-96">
      <RightSideBar />
    </div>
  </div>
</template>