<script setup lang="ts">
import LogoIcon from '@/components/icons/LogoIcon.vue';
import Loading from '@/components/Loading.vue';
import Tweets from '@/components/Tweets.vue';
import { TweetsService } from '@/store/apiService';
import { onMounted, ref } from 'vue';

const alltweet = ref<any[]>([]);
const loading = ref(true)
onMounted(async () => {
  try {
    const response = await TweetsService.allTweets();
    alltweet.value = response;
  } catch (error) {
    console.log(error);
  } finally {
    loading.value = false
  }
});
</script>

<template>
  <div class="border">
    <div class="border px-4 py-3">
      <div class="w-full flex justify-center items-center">
        <LogoIcon />
      </div>
      <div class="flex pt-5">
        <div class="w-[50%] flex justify-center">
          <button class="pb-2 border-b-4 border-blue-500 font-medium">Discover</button>
        </div>
        <div class="w-[50%] flex justify-center">
          <button class="font-medium ">Following</button>
        </div>
      </div>
    </div>
    <div>
      <div v-if="loading">
        <Loading />
      </div>
      <div v-else-if="alltweet.length > 0">
        <div v-for="(item, index) in alltweet" :key="index">
          <Tweets :item="item" />
        </div>
      </div>
      <div v-else>
        <h1 class="text-3xl font-medium text-center">No tweet yet!</h1>
      </div>
    </div>

  </div>
</template>
