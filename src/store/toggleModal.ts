import { defineStore } from "pinia";
import { ref } from "vue";

export const useModal = defineStore('modal', () => {
    const flag = ref(false);

    function toggleModal() {
        flag.value = !flag.value;
    }

    return { flag, toggleModal };
});
