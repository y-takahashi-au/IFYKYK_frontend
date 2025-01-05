<template>
  <HomeHeader />
  <FlatHouseEdit :is-address="true" />
  <button @click="approveFlatHouse" type="button" class="btn btn-primary btn-lg btn-block w-100">
    Approve FlatHouse
  </button>
  <SimpleModel v-if="isModel" />
  <SpinnerOverlay ref="spinner" />
</template>
<script setup lang="ts">
import { ref } from 'vue'
import { FlatHouseEditStore } from '@/stores/FlatHouseEdit'
import { PictureSwipeStore } from '@/stores/PictureSwipe'
import FlatHouseEdit from '@/components/FlatHouseEdit.vue'
import type { Edit } from '@/dto/FlatHouse'
import flatHouse from '@/api/FlatHouse'
import { DateUtils } from '@/utils/DateUtils'

import HomeHeader from '@/components/HomeHeader.vue'
import { AccountStore } from '@/stores/AccountStore'
import SimpleModel from '@/components/WaitApprovalModal.vue'
import SpinnerOverlay from '@/components/SpinnerOverlay.vue'

const flatHouseEditStore = FlatHouseEditStore()
const pictureSwipeStore = PictureSwipeStore()
const accountStore = AccountStore()
const dateUtils = new DateUtils()
const isModel = ref(false)
const spinner = ref()

const approveFlatHouse = async () => {
  if (!flatHouseEditStore.validateValue()) {
    return false
  }
  spinner.value.turnOn()
  const edit = {
    id: flatHouseEditStore.reviewId,
    address: flatHouseEditStore.address.value,
    rent: flatHouseEditStore.rent.value,
    moveIn: dateUtils.monthToDateString(
      flatHouseEditStore.moveIn.value.year,
      flatHouseEditStore.moveIn.value.month
    ),
    moveOut: dateUtils.monthToDateString(
      flatHouseEditStore.moveOut.value.year,
      flatHouseEditStore.moveOut.value.month
    ),
    star: flatHouseEditStore.star,
    review: flatHouseEditStore.review.value,
    accountId: accountStore.accountId,
    pictures: pictureSwipeStore.srcs
  } as Edit
  await flatHouse.approve(edit).then(() => {
    isModel.value = true
  })
  spinner.value.turnOff()
}
</script>
<style scoped>
.header-icon {
  font-size: 40px;
}
</style>
