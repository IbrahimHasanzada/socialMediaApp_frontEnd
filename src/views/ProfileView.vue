<script setup lang="ts">
import Loading from '@/components/Loading.vue';
import Tweets from '@/components/Tweets.vue';
import { TweetsService, UserService } from '@/store/apiService';
import { onMounted, ref, watch } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();

const user = ref({});
const tweets = ref([]);
const loading = ref(true)
const follower_id = ref()

const handleGetUserById = async () => {
    try {
        const response = await UserService.getUserById(route.params.id);
        const tweetsResponse = await TweetsService.getTweetByUserById(response?.data?._id);
        if(tweetsResponse) tweets.value = tweetsResponse;
        if(response)  user.value = response.data;
    } catch (error) {
        console.error('Error fetching user or tweets:', error);
    }finally {
        loading.value = false
    }
};


const handleSendRequest = async () => {
    try {
        // const response = await UserService.sendFollowRequest(follower_id)
        // console.log(response)
    } catch (error) {
        console.log(error)
    }
}

// watch(() => user._id, ([oldValue, newValue]) => {
//     if(newValue != oldValue){
//         follower_id.value = user._id
//     }

// }, {immediate: true})

console.log(user?._id)

watch(
    () => route.params.id,
    (newValue, oldValue) => {
        if (newValue !== oldValue) handleGetUserById();
    },
    { immediate: true }
);

</script>

<template>
    <div v-if="!loading" class="w-full border relative">
        <div class="h-40">
            <img v-if="user?.banner" class="w-full" :src="user?.banner" alt="User Banner" />
            <div v-else class="bg-[#F1F3F5] h-full"></div>
        </div>
        <div class="px-4">
            <div class="absolute top-28">
                <img v-if="user?.avatar" class="w-20 h-20 rounded-full" :src="user?.avatar" alt="User Avatar" />
                <div v-else
                    class="w-20 h-20 text-2xl text-white bg-yellow-500 rounded-full flex items-center justify-center pb-1">
                    @
                </div>
            </div>
            <div class="w-full flex justify-end">
                <button @click="handleSendRequest" data-modal-target="default-modal" data-modal-toggle="default-modal"
                    class="bg-[#1083fe] text-white flex items-center gap-1 rounded-full text-md px-3 py-1.5 my-3"
                    type="button">
                    <span class="text-xl">+</span> Follow
                </button>
            </div>
            <div class="flex flex-col pb-2">
                <h1 class="font-bold text-3xl">{{ user?.username || 'User' }}</h1>
                <h2 class="text-[#42576C]">{{ user?.email || 'No email provided' }}</h2>
            </div>
            <div class="flex gap-2">
                <p>
                    <span class="font-bold">{{ user?.followersCount || 0 }}</span> followers
                </p>
                <p>
                    <span class="font-bold">{{ user?.followingsCount || 0 }}</span> following
                </p>
            </div>
        </div>
        <div>
            <div>
                <button class="w-[50%]">
                    <span class="pb-2 border-b-4 inline-block border-[#1083FE] font-bold">Posts</span>
                </button>
                <button class="w-[50%] pb-2 text-[#42576C] font-medium">Replies</button>
            </div>
        </div>
        <div v-for="(item, index) in tweets" :key="index">
            <Tweets :item="item" />
        </div>
    </div>
    <div v-else>
        <Loading />
    </div>
</template>