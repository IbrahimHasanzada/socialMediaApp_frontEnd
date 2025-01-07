<script setup lang="ts">
import SearchIcon from './icons/SearchIcon.vue';

</script>

<template>
    <div class=" w-full pl-4 py-5">
        <div class="relative flex items-center gap-2 py-3  rounded-xl !w-80">
            <SearchIcon class="absolute w-5" />
            <FormKit 
                :outer-class="'formik-input'" 
                :style="{ boxShadow: 'none', padding: '12px 25px' }" 
                class="bg-[#F1F3F5] !shadow-none" 
                type="text" 
                placeholder="Search..." 
                />

        </div>
        <div class="flex flex-col items-start gap-2.5 pb-5 border-b">
            <button class="font-medium">Discover</button>
            <button class="text-[#42576C]">Following</button>
        </div>
        <div>
            <ul class="text-[#1083FE] text-sm flex gap-2 mt-5">
                <li>Feedback</li>
                <li>Privacy</li>
                <li>Terms</li>
                <li>Help</li>
            </ul>
        </div>
    </div>
</template>

<style scoped>

.formkit-outer{
    margin:  0 !important;
    width: 100% !important;
    background-color: #F1F3F5 !important;
}
.formkit-input{
    box-shadow: none !important;
    padding: 12px 25px !important;
}
.custom-input {
    box-shadow: none !important;
}
</style>