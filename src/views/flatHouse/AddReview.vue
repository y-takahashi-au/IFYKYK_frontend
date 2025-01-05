<template>
  <HomeHeader />
  <FlatHouseEdit />
  <button @click="createFlatHouse" type="button" class="btn btn-primary btn-lg btn-block w-100">
    Add FlatHouse
  </button>
</template>
<script setup lang="ts">
import {} from 'vue'
import { FlatHouseEditStore } from '@/stores/FlatHouseEdit'
import { PictureSwipeStore } from '@/stores/PictureSwipe'
import { useRouter, useRoute } from 'vue-router'
import FlatHouseEdit from '@/components/FlatHouseEdit.vue'
import type { Edit } from '@/dto/FlatHouse'
import flatHouse from '@/api/FlatHouse'
import { DateUtils } from '@/utils/DateUtils'

import HomeHeader from '@/components/HomeHeader.vue'
import { AccountStore } from '@/stores/AccountStore'
const router = useRouter()
const route = useRoute()
const flatHouseEditStore = FlatHouseEditStore()
const pictureSwipeStore = PictureSwipeStore()
const accountStore = AccountStore()
const dateUtils = new DateUtils()

const createFlatHouse = async () => {
  const edit = {
    id: undefined,
    address: flatHouseEditStore.address,
    rent: flatHouseEditStore.rent,
    moveIn: dateUtils.monthToDateString(
      flatHouseEditStore.moveIn.year,
      flatHouseEditStore.moveIn.month
    ),
    moveOut: dateUtils.monthToDateString(
      flatHouseEditStore.moveOut.year,
      flatHouseEditStore.moveOut.month
    ),
    star: flatHouseEditStore.star,
    review: flatHouseEditStore.review,
    accountId: accountStore.accountId,
    pictures: pictureSwipeStore.srcs
  } as Edit
  await flatHouse.create(edit).then(() => {})
}
</script>
<style scoped>
.header-icon {
  font-size: 40px;
}
</style>
