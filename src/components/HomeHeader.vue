<template>
  <div>
    <nav class="navbar navbar-light bg-info d-flex justify-content-between">
      <img src="@/assets/IFYKYK.png" class="header-logo" @click="goToHome" />
      <div class="d-flex justify-content-end">
        <!-- <i class="bi bi-plus-square header-icon mx-2" @click="createAccount"></i> -->
        <!-- <i class="bi bi-bell header-icon mx-2"></i> -->
        <!-- <i class="bi bi-person-circle header-icon mx-2"></i> -->
      </div>
    </nav>
  </div>
</template>
<script setup lang="ts">
import { onMounted } from 'vue'
import account from '@/api/Account'
import { useRouter } from 'vue-router'
import { AccountStore, type AccountInfo } from '@/stores/AccountStore'

const router = useRouter()
const accountStore = AccountStore()

const createAccount = () => {
  account
    .create()
    .then((response) => {
      router.push(`qr/${response.data}`)
    })
    .catch((e: Error) => {
      console.log(e)
    })
}
const goToHome = () => {
  router.push({ name: 'home' })
}
onMounted(() => {
  if (!accountStore.accountId) {
    const accountInfo = localStorage.getItem('AccountStore') as unknown as AccountInfo
    if (accountInfo) {
      accountStore.$state = accountInfo
    }
  }
})
</script>
<style scoped>
.header-icon {
  font-size: 40px;
}
.header-logo {
  height: 50px;
  width: 50px;
}
</style>
