<template>
  <div class="overlay d-flex align-items-center" @click="goToHome">
    <div class="h-100 w-100 d-flex justify-content-center align-items-center">
      <div class="bg-light d-flex flex-column w-75 p-3 rounded-4">
        <span class="mb-3 text-center">Please wait for approval</span>
        <button type="button" class="btn btn-primary">Home</button>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import {} from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const goToHome = () => {
  router.push({ name: 'home' })
}
</script>
<style scoped>
.overlay {
  position: fixed; /* Sit on top of the page content */
  width: 100%; /* Full width (cover the whole page) */
  height: 100%; /* Full height (cover the whole page) */
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5); /* Black background with opacity */
  z-index: 2; /* Specify a stack order in case you're using a different order for other elements */
  cursor: pointer; /* Add a pointer on hover */
}
.compoment {
  border: solid;
  border-width: 1px;
  border-color: black;
  border-radius: 10%;
}
</style>
