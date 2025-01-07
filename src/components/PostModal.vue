<script setup lang="ts">
import { reactive, watch } from 'vue';
import { TweetsService } from '@/store/apiService';
import { FormKit } from '@formkit/vue';
import { useModal } from '@/store/toggleModal';
import { useRoute } from 'vue-router';

const Modal = useModal();

const props = defineProps({
    item: {
        type: Object,
        required: false,
    },
});

const route = useRoute();

const data = reactive({
    content: '',
    parentId: props.item?._id || route.params.id || null
    // img: null
});

watch(
    () => [props.item?._id, route.params.id],
    ([newItemId, newRouteId]) => {
        data.parentId = newItemId || newRouteId || null;
    },
    { immediate: true }
);

const postTweet = async () => {
    
    const requestData = { ...data };
    if (!data.parentId) delete requestData.parentId;
    try {
        const response = await TweetsService.postTweet(requestData);
        Modal.toggleModal();
        console.log(response);
    } catch (error) {
        console.error(error);
    }
};
</script>

<template>
    <div v-if="Modal.flag" id="default-modal" tabindex="-1" aria-hidden="true"
        class="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 bottom-0 z-50 flex justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
        <div class="relative w-full max-w-2xl max-h-full">
            <div class="relative bg-white rounded-lg shadow-2xl dark:bg-gray-700">
                <div class="flex items-start justify-between flex-col p-2 rounded-t">
                    <div class="flex items-center justify-between w-full p-2 border-gray-200 rounded-b">
                        <button @click="Modal.toggleModal" data-modal-hide="default-modal" type="button"
                            class="ms-3 text-sm font-medium text-[#0168D5] bg-white rounded-lg">Cancel</button>
                        <button @click="postTweet" data-modal-hide="default-modal" type="button"
                            class="text-white bg-[#0168D5] font-medium rounded-full text-sm px-5 py-2.5 text-center">Post</button>
                    </div>
                    <div v-if="item" class="flex items-start gap-2 mx-4 mb-3 pb-4 border-b w-full">
                        <div>
                            <img v-if="props.item?.userId.avatar" class="h-12 w-12 object-cover border rounded-full"
                                :src="props.item?.userId.avatar" alt="img">
                            <div v-else
                                class="w-11 h-11 text-xl text-white bg-yellow-500 rounded-full flex items-center justify-center pb-1">
                                @</div>
                        </div>
                        <div>
                            <p class="font-bold">{{ props.item?.userId.username }}</p>
                            <p>{{ props.item?.content }}</p>
                        </div>
                    </div>
                    <div class="flex justify-between gap-5 w-full px-4">
                        <div
                            class="w-14 h-14 text-3xl text-white bg-yellow-500 rounded-full flex items-center justify-center pb-1">
                            @</div>
                        <div class="w-[90%]">
                            <FormKit validation="required|length:3|maxlength:300" v-model="data.content" max="300"
                                type="textarea" :style="{ height: '150px', outline: 'none' }"
                                placeholder="What's up?" />
                        </div>
                        <!-- <div class="custom-wrapper">
                            <FormKit @change="handleFileChange" type="file" multiple="true" placeholder="" />
                        </div>
                    </div> -->
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>


<style scoped>
.formkit-input:focus {
    box-shadow: none !important;
}

.custom-wrapper {
    white-space: nowrap;
    font-size: .7rem;
    width: 100px;
}
</style>