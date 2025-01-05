<template>
  <HomeHeader />
  <div class="m-3 row">
    <div v-if="isAdministrator()" class="col-md-3 col-6 p-2">
      <button
        type="button"
        class="w-100 btn btn-primary btn-lg d-flex flex-column position-relative"
        @click="goToApprovalFlatHouse"
      >
        <div class="d-flex flex-column justify-content-center w-100">
          <div class="d-flex justify-content-center">
            <img class="icon-size text-center" src="@/assets/house.svg" />
          </div>
          <span class="fs-6">FLATHOUSE</span>
        </div>
        <CircleNumber class="circle" v-if="flatHouseReviewCount > 0" :num="flatHouseReviewCount" />
      </button>
    </div>
    <div class="col-md-3 col-6 p-2" v-if="isAdministrator()">
      <button
        type="button"
        class="w-100 btn btn-primary btn-lg d-flex flex-column position-relative"
        @click="goToApprovalAccount"
      >
        <div class="d-flex flex-column justify-content-center w-100">
          <div class="d-flex justify-content-center">
            <img class="icon-size" src="@/assets/person.svg" />
          </div>
          <span class="fs-6">USER</span>
        </div>
        <CircleNumber class="circle" v-if="accountCount > 0" :num="accountCount" />
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import HomeHeader from '@/components/HomeHeader.vue'
import { useRouter } from 'vue-router'
import approval from '@/api/Approval'
import { AccountStore } from '@/stores/AccountStore'
import CircleNumber from '@/components/CircleNumber.vue'

const router = useRouter()
const accountStore = AccountStore()

const accountCount = ref<number>(0)

const flatHouseReviewCount = ref<number>(0)

onMounted(async () => {
  approval.getCount().then((response) => {
    accountCount.value = response.data.accountCount
    flatHouseReviewCount.value = response.data.flatHouseReviewCount
  })
})

const goToApprovalAccount = () => {
  router.push({ name: 'approvalAccountList' })
}
const goToApprovalFlatHouse = () => {
  router.push({ name: 'approvalFlatHouseList' })
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
