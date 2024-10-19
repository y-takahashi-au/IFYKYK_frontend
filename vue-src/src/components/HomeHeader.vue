<template>
  <div>
    <nav class="navbar navbar-light bg-info d-flex justify-content-end">
      <i class="bi bi-plus-square header-icon mx-2" @click="createAccount"></i>
      <i class="bi bi-bell header-icon mx-2"></i>
      <i class="bi bi-person-circle header-icon mx-2"></i>
    </nav>
  </div>
</template>
<script setup lang="ts">
import account from '@/api/Account'
import { useRouter } from 'vue-router'

const router = useRouter()

const createAccount = () => {
  account
    .create()
    .then(() => {
      router.push('/')
    })
    .catch((e: Error) => {
      console.log(e)
    })
}
</script>
<style scoped>
.header-icon {
  font-size: 40px;
}
</style>
