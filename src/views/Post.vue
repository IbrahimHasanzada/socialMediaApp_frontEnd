<script setup lang="ts">
import Loading from '@/components/Loading.vue';
import Tweets from '@/components/Tweets.vue';
import { TweetsService } from '@/store/apiService';
import { useModal } from '@/store/toggleModal';
import { ArrowLeftIcon } from '@heroicons/vue/20/solid';
import { ref, watch, onMounted } from 'vue';
import { RouterLink, useRoute } from 'vue-router';

const post = ref({});
const route = useRoute();
const modal = useModal();

const getPost = async () => {
    try {
        const response = await TweetsService.getTweetById((route?.params?.id) as any);
        post.value = response;
    } catch (error) {
        console.error(error);
    }
};

onMounted(() => {
    getPost();
});

watch(() => modal.flag, (newValue, oldValue) => {
    if (newValue !== oldValue) {
        getPost();
    }
});

watch(
    () => route.params.id,
    (newId, oldId) => {
        if (newId !== oldId) {
            getPost();
        }
    }
);
</script>

<template>
    <div>
        <div class="px-5 py-1 flex items-center border min-h-14">
            <div class="w-full py-3 flex items-center gap-2">
                <button>
                    <RouterLink to="/">
                        <ArrowLeftIcon class="w-6 h-6" />
                    </RouterLink>
                </button>
                <p class="text-xl font-bold">Post</p>
            </div>
        </div>
      
        <div v-if="post.content">
            <div>
                <Tweets :details="true" :item="post" />
            </div>
            <div v-if="post.comments" v-for="(item, index) in post.comments" :key="index">
                <Tweets :item="item" />
            </div>

        </div>
        <div v-else>
                <Loading />
            </div>
    </div>
</template>
