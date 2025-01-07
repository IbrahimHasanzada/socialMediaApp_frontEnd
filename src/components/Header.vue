<script setup lang="ts">
import { useModal } from '@/store/toggleModal';
import HomeIcon from './icons/HomeIcon.vue';
import NotifyIcon from './icons/NotifyIcon.vue';
import ProfileIcon from './icons/ProfileIcon.vue';
import SearchIcon from './icons/SearchIcon.vue';
import PenIcon from './icons/PenIcon.vue';
import PostModal from './PostModal.vue';

const Modal = useModal()

</script>

<template>
    <header>
        <div>
            <div class="h-12 w-12 bg-yellow-500 rounded-full my-3"></div>
        </div>
        <div>
            <ul>
                <li class="flex items-center gap-2 font-medium py-3">
                    <HomeIcon /> Home
                </li>
                <li class="flex items-center gap-2 font-medium py-3">
                    <SearchIcon />Search
                </li>
                <li class="flex items-center gap-2 font-medium py-3">
                    <NotifyIcon />Notifications
                </li>
                <li class="flex items-center gap-2 font-medium py-3">
                    <ProfileIcon />Profile
                </li>
            </ul>
        </div>

        <button @click="Modal.toggleModal" data-modal-target="default-modal" data-modal-toggle="default-modal"
            class="bg-[#1083fe] text-white flex gap-1 rounded-full text-md px-3 py-2 my-3" type="button">
            <PenIcon /> New post
        </button>
        <PostModal />
    </header>
</template>
