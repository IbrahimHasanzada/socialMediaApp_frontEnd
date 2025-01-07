<script setup lang="ts">
import { TweetsService } from '@/store/apiService';
import CommentsIcon from './icons/CommentsIcon.vue';
import HeartIcon from './icons/HeartIcon.vue';
import RepostIcon from './icons/RepostIcon.vue';
import { onMounted, ref } from 'vue';
import LikedIcon from './icons/LikedIcon.vue';
import router from '@/router';
import { useModal } from '@/store/toggleModal';
import PostModal from './PostModal.vue';
import { useRoute } from 'vue-router';

const likedTweets = ref<Record<string, boolean>>({});
const route = useRoute()
const props = defineProps({
    item: {
        type: Object,
        required: true
    },
    details: {
        type: Boolean,
        required: false
    }
});

const modal = useModal()

const handleLike = async (tweetId: string) => {
    try {
        const response = await TweetsService.likeTweet(tweetId);
        if (response) {
            const isLiked = likedTweets.value[tweetId];
            likedTweets.value[tweetId] = !isLiked;
            props.item.likesCount += isLiked ? -1 : 1;
        }
    } catch (error) {
        console.log(error);
    }
};
onMounted(async () => {
    try {
        const response = await TweetsService.checkedTweet(props?.item?._id && props?.item?._id || route.params.id);
        if (response) likedTweets.value[props.item?._id] = response;
    } catch (error) {
        console.log(error);
    }
});

const handleNavigate = () => {
    router.push(`/post/${props.item?._id}`)
}
const handleNavigateProfile = () => {
    router.push(`/profile/${props.item?.userId._id}`)
}

</script>

<template>
    <div>
        <div  class="px-5 py-3 flex gap-2 border">
            <div @click="handleNavigateProfile" class="w-[10%] cursor-pointer">
                <img v-if="props.item?.userId?.avatar" class="h-12 w-12 object-cover border rounded-full"
                    :src="props.item?.userId?.avatar" alt="img">
                <div v-else
                    class="w-11 h-11 text-xl text-white bg-yellow-500 rounded-full flex items-center justify-center pb-1">
                    @</div>
            </div>

            <div class="w-[90%]">
                <p @click="handleNavigateProfile" class="font-bold cursor-pointer">{{ props.item?.userId?.username }}</p>
                <p @click="handleNavigate" class="cursor-pointer">{{ props.item?.content }}</p>
                <div v-if="details" class="pt-2 flex items-center gap-4 text-[#42576C] text-sm">
                    <span>
                        {{ props.item?.updatedAt?.split('T')[0] }}
                    </span>
                    <span>
                        {{ props.item?.updatedAt?.split('T')[1].split('.')[0] }}
                    </span>
                </div>
                <div v-if="details" class="flex gap-4 py-3 mt-3 border-y">
                    <div>
                        <span class="font-bold">
                            {{ props.item.likesCount }}
                        </span> Likes
                    </div>
                    <div>
                        <span class="font-bold">
                            <span v-if="props.item?.comments">
                                {{ props.item?.comments.length }}
                            </span>
                        </span> Comments
                    </div>
                </div>
                <div class="flex py-2">
                    <button class="flex item-start gap-1 flex-1">
                        <div class="pt-1">
                            <CommentsIcon />
                        </div>
                        <div>
                            <span v-if="props.item?.comments">
                                <span class="font-bold" >
                                    {{ props.item?.comments.length }}
                                </span>
                                Comments
                            </span>
                        </div>
                    </button>
                    <button class="flex-1">
                        <RepostIcon />
                    </button>
                    <button @click="handleLike(props.item?._id)" class="flex-1 flex items-center gap-1 cursor-pointer">
                        <LikedIcon v-if="likedTweets[props.item?._id]" />
                        <HeartIcon v-else />
                        {{ props.item?.likesCount }}
                    </button>
                </div>
            </div>
        </div>
        <div v-if="details">
            <div>
                <button @click="modal.toggleModal" class="flex gap-2 py-3 px-4 border w-full cursor-pointer">
                    <div>
                        <img v-if="props.item?.userId?.avatar" class="h-12 w-12 object-cover border rounded-full"
                            :src="props.item?.userId?.avatar" alt="img">
                        <div v-else
                            class="w-6 h-6 text-sm text-white bg-yellow-500 rounded-full flex items-center justify-center pb-1">
                            @</div>
                    </div>
                    <p class="text-[#42576C]">Write your reply...</p>
                </button>
                <PostModal :item="props.item" />
            </div>
        </div>
    </div>
</template>
