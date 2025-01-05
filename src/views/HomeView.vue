<template>
  <HomeHeader />
  <div class="m-3 row">
    <div class="col-md-3 col-6 p-2">
      <button
        type="button"
        class="w-100 btn btn-primary btn-lg d-flex flex-column"
        @click="goToFlatHouseList"
      >
        <div class="d-flex flex-column justify-content-center w-100">
          <div class="d-flex justify-content-center">
            <img class="icon-size text-center" src="@/assets/house.svg" />
          </div>
          <span class="fs-6">FLATHOUSE</span>
          <span class="fs-6">REVIEW</span>
        </div>
      </button>
    </div>
    <div class="col-md-3 col-6 p-2" v-if="isAdministrator()">
      <button
        type="button"
        class="w-100 btn btn-primary btn-lg d-flex flex-column"
        @click="createAccount"
      >
        <div class="d-flex flex-column justify-content-center w-100">
          <div class="d-flex justify-content-center">
            <img class="icon-size" src="@/assets/person.svg" />
          </div>
          <span class="fs-6">ADD</span>
          <span class="fs-6">USER</span>
        </div>
      </button>
    </div>
    <div class="col-md-3 col-6 p-2" v-if="isAdministrator()">
      <button
        type="button"
        class="w-100 btn btn-primary btn-lg d-flex flex-column position-relative"
        @click="goToApprovalMenu"
      >
        <div class="d-flex flex-column justify-content-center w-100">
          <div class="d-flex justify-content-center">
            <img class="icon-size" src="@/assets/approved.svg" />
          </div>
          <span class="fs-6">APPROVAL</span>
        </div>
        <CircleNumber class="circle" v-if="count > 0" :num="count" />
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import HomeHeader from '@/components/HomeHeader.vue'
import account from '@/api/Account'
import approval from '@/api/Approval'
import { useRouter } from 'vue-router'
import { AccountStore } from '@/stores/AccountStore'
import CircleNumber from '@/components/CircleNumber.vue'

const router = useRouter()
const accountStore = AccountStore()
const count = ref<number>(0)

onMounted(async () => {
  await account
    .authorize()
    .then(() => {
      console.log('成功')
    })
    .catch((e: Error) => {
      router.push('/login')
    })
  approval.getCount().then((response) => {
    count.value = response.data.accountCount + response.data.flatHouseReviewCount
  })
})
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
const goToApprovalMenu = () => {
  router.push({ name: 'approvalMenu' })
}
const goToFlatHouseList = () => {
  router.push({ name: 'flatHouseList' })
}
const isAdministrator = () => {
  if (accountStore.roll === 'ADMINISTRATOR') {
    return true
  }
  return false
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
