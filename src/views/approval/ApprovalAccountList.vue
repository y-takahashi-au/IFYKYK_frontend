<template>
  <HomeHeader />
  <ul class="list-group">
    <li
      class="list-group-item"
      v-for="(accountInfo, index) in accountInfos"
      :key="index"
      @click="goToAccountDetail(accountInfo)"
    >
      <div class="row">
        <span class="col-4">Given name: {{ accountInfo.givenName }}</span>
        <span class="col-4">Family name: {{ accountInfo.familyName }}</span>
        <span class="col-4">User id: {{ accountInfo.userId }}</span>
      </div>
    </li>
  </ul>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import HomeHeader from '@/components/HomeHeader.vue'
import approval from '@/api/Approval'
import type { Account } from '@/script/ApprovalList'
import { InitAccountStoreStore } from '@/stores/InitAccount'
import { useRouter } from 'vue-router'

const accountInfos = ref<Account[]>([])
const store = InitAccountStoreStore()
const router = useRouter()

onMounted(async () => {
  approval.getAccountList().then((response) => {
    accountInfos.value = response.data.accountInfos
  })
  store.reset()
})
const goToAccountDetail = async (accountInfo: Account) => {
  store.givenName.value = accountInfo.givenName
  store.familyName.value = accountInfo.familyName
  store.userId = accountInfo.userId
  router.push({ name: 'approvalAccountDetail' })
}
</script>
<style scoped>
.icon-size {
  height: 50px;
  width: 50px;
}
.circle {
  position: absolute;
  top: 0px;
  right: 0px;
}
</style>
