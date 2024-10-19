<template>
  <HomeHeader />
  <div class="m-3 row">
    <div class="col-lg-3 col-6 p-2">
      <button type="button" class="w-100 btn btn-primary btn-lg d-flex justify-content-start">
        <i class="bi bi-shop"></i><label class="ms-2">レストラン</label>
      </button>
    </div>
    <div class="col-lg-3 col-6 p-2">
      <button type="button" class="w-100 btn btn-primary btn-lg d-flex justify-content-start">
        <i class="bi bi-house-door"></i><label class="ms-2">シェアハウス</label>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import HomeHeader from '../components/HomeHeader.vue'
import account from '@/api/Account'
import { useRouter } from 'vue-router'

const router = useRouter()
onMounted(() => {
  account
    .authorize()
    .then(() => {
      console.log('成功')
    })
    .catch((e: Error) => {
      router.push('/login')
    })
})
</script>
<style scoped>
h1 {
  font-weight: 500;
  font-size: 2.6rem;
  position: relative;
  top: -10px;
}

h3 {
  font-size: 1.2rem;
}

.greetings h1,
.greetings h3 {
  text-align: center;
}
</style>
