<script setup lang="ts">
import { AuthService } from '@/store/apiService';
import { ref } from 'vue';

const email = ref('')
const password = ref('')

const handleSubmit = async () => {
    try {
        const response = await AuthService.login(email.value, password.value)
        response.token && location.reload() 
    } catch (error) {
        console.log(error)
    }

}

</script>

<template>
    <div class="w-screen h-screen flex justify-center items-center">
        <form class="!max-w-md w-full mx-auto">
            <h1 class="text-center text-2xl font-medium mb-5">Blue Sky</h1>
            <FormKit 
                type="text" 
                v-model="email" 
                name="email" 
                label="Email" 
                help="Enter your email"
                placeholder="Enter your email" 
                validation="required|email"
                :validation-messages="{
                    required: 'Please provide your email.',
                    email: 'Enter a valid email address.'
                }"
            />
            <FormKit 
                type="password" 
                v-model="password"
                name="password" 
                label="Password" 
                help="Enter your password"
                placeholder="Enter your password" 
                validation="required|regex:/^[a-zA-Z0-9]{6,100}$/"
                :validation-messages="{
                    required: 'Password is required.',
                    max: 'Password cannot exceed 100 characters.',
                    regex: 'Password can only include alphanumeric characters and must be between 3 to 30 characters long.'
                }"
            />
            <button @click.prevent="handleSubmit"
                class="text-white bg-blue-700 hover font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center ">Submit</button>
        </form>
    </div>

</template>


<style >

.formkit-wrapper {
    max-width: 100% !important;
}

</style>