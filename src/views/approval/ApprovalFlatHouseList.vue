<template>
  <HomeHeader />
  <ul class="list-group">
    <li
      class="list-group-item"
      v-for="(flatHouseReviewDto, index) in flatHouseReviewDtoList"
      :key="index"
      @click="goToAccountDetail(flatHouseReviewDto)"
    >
      <div class="row">
        <span class="col-2">address: {{ flatHouseReviewDto.address }}</span>
        <span class="col-2">rent: {{ flatHouseReviewDto.rent }}</span>
        <span class="col-2">moveIn: {{ flatHouseReviewDto.moveIn }}</span>
        <span class="col-2">moveOut: {{ flatHouseReviewDto.moveOut }}</span>
        <span class="col-2">star: {{ flatHouseReviewDto.star }}</span>
      </div>
    </li>
  </ul>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import HomeHeader from '@/components/HomeHeader.vue'
import approval from '@/api/Approval'
import type { FlatHouse } from '@/script/ApprovalList'
import { useRouter } from 'vue-router'
import { FlatHouseEditStore } from '@/stores/FlatHouseEdit'
import { DateUtils } from '@/utils/DateUtils'
import { PictureSwipeStore } from '@/stores/PictureSwipe'

const flatHouseReviewDtoList = ref<FlatHouse[]>([])
const router = useRouter()
const flatHouseEditStore = FlatHouseEditStore()
const pictureSwipeStore = PictureSwipeStore()
const dateUtils = new DateUtils()

onMounted(async () => {
  approval.getFlatHouseReviewList().then((response) => {
    flatHouseReviewDtoList.value = response.data.flatHouseReviewDtoList
  })
})
const goToAccountDetail = async (flatHouseReviewDto: FlatHouse) => {
  flatHouseEditStore.reset()
  flatHouseEditStore.reviewId = flatHouseReviewDto.reviewId
  flatHouseEditStore.address.value = flatHouseReviewDto.address
  flatHouseEditStore.rent.value = flatHouseReviewDto.rent
  flatHouseEditStore.moveIn.value = dateUtils.toYearMonth(
    dateUtils.toDate(flatHouseReviewDto.moveIn)
  )
  flatHouseEditStore.moveOut.value = dateUtils.toYearMonth(
    dateUtils.toDate(flatHouseReviewDto.moveOut)
  )
  flatHouseEditStore.star = flatHouseReviewDto.star
  flatHouseEditStore.review.value = flatHouseReviewDto.review
  pictureSwipeStore.srcs = flatHouseReviewDto.pictures

  router.push({ name: 'approvalFlatHouseDetail' })
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
