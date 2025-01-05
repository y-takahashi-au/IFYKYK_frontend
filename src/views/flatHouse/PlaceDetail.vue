<template>
  <HomeHeader />
  <div class="m-3">
    <div>
      <h3>
        {{ flatHouseDetailStore.address }}
      </h3>

      <h4 class="mb-3">reviews</h4>
      <ul class="list-group">
        <li
          class="list-group-item d-flex flex-column"
          v-for="(review, index) in flatHouseDetailStore.reviews"
          :key="index"
        >
          <div class="d-flex">
            <span>Reviewer:</span>
            <span>{{ review.accountName }}</span>
          </div>
          <div class="d-flex">
            <span>during:</span>
            <span>{{ MM_YYYY_SLASH(review.moveIn) }}</span>
            <span>—</span>
            <span>{{ MM_YYYY_SLASH(review.moveOut) }}</span>
          </div>

          <div class="d-flex">
            <span>rent:$</span>
            <span>{{ review.rent }}</span>
            <star-rating
              class="d-flex justify-content-end"
              v-model:rating="review.star"
              v-bind:increment="0.5"
              v-bind:star-size="20"
              v-bind:show-rating="false"
              v-bind:read-only="true"
            ></star-rating>
          </div>
          <div class="row w-100">
            <div
              class="col-4 col-md-3 mb-3"
              v-for="(picture, picIndex) in review.pictures"
              :key="picIndex"
            >
              <div class="position-relative">
                <img
                  class="picture rounded-4 border border-success"
                  :src="picture"
                  v-if="picture"
                  @click="displayBigPicture(picture, index, picIndex)"
                />
              </div>
            </div>
          </div>

          <div class="d-flex flex-column">
            <span>comment:</span>
            <span>{{ review.review }}</span>
          </div>
        </li>
      </ul>
    </div>
    <!-- <div class="justify-content-center d-flex mt-3">
      <button type="button" class="btn btn-primary" @click="goToAddReview">Add Review</button>
    </div> -->
  </div>
  <div class="overlay d-flex align-items-center" v-if="isOverlay" @click="turnOffOverlay">
    <i @click.stop="beforePicture" class="bi bi-arrow-left-square-fill h1"></i>
    <div class="h-100 w-100 d-flex justify-content-center align-items-center">
      <img class="big-picture" @click.stop="" :src="bigPicture" />
    </div>
    <i @click.stop="afterPicture" class="bi bi-arrow-right-square-fill h1"></i>
  </div>
</template>
<script setup lang="ts">
import { onBeforeMount, onUnmounted, ref } from 'vue'
import { FlatHouseDetailStore } from '@/stores/FlatHouseDetail'
import { useRouter, useRoute } from 'vue-router'
import { DateUtils } from '@/utils/DateUtils'
//@ts-ignore
import StarRating from 'vue-star-rating'
import HomeHeader from '@/components/HomeHeader.vue'
const dateUtils = new DateUtils()
const router = useRouter()
const route = useRoute()
const flatHouseDetailStore = FlatHouseDetailStore()
const isOverlay = ref(false)
const currentIndex = ref(0)
const currentPicIndex = ref(0)
const bigPicture = ref('')
onBeforeMount(async () => {
  flatHouseDetailStore.reset()
  await flatHouseDetailStore.getDetail(route.params.id as string)
  console.log(flatHouseDetailStore.reviews)
})

onUnmounted(() => {
  flatHouseDetailStore.reset()
})

const MM_YYYY_SLASH = (dateString: string) => {
  return dateUtils.MM_YYYY_SLASH(dateUtils.toDate(dateString))
}

const goToAddReview = () => {
  router.push({ name: 'addFlatHouseReview', params: { id: flatHouseDetailStore.id } })
}
const displayBigPicture = (src: string, index: number, picIndex: number) => {
  isOverlay.value = true
  bigPicture.value = src
  currentIndex.value = index
  currentPicIndex.value = picIndex
}
const beforePicture = () => {
  let index = currentPicIndex.value
  if (index === 0) {
    index = flatHouseDetailStore.reviews[currentIndex.value].pictures.length - 1
  } else {
    index = currentPicIndex.value - 1
  }
  currentPicIndex.value = index
  bigPicture.value = flatHouseDetailStore.reviews[currentIndex.value].pictures[index]
}

const afterPicture = () => {
  let index = currentPicIndex.value
  if (index === flatHouseDetailStore.reviews[currentIndex.value].pictures.length - 1) {
    index = 0
  } else {
    index = currentPicIndex.value + 1
  }
  currentPicIndex.value = index
  bigPicture.value = flatHouseDetailStore.reviews[currentIndex.value].pictures[index]
}
const turnOffOverlay = () => {
  isOverlay.value = false
}
</script>
<style scoped>
.big-picture {
  object-fit: contain;
  box-sizing: border-box;
  max-width: 100%;
  max-height: 100%;
}
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
.picture {
  aspect-ratio: 1 / 1;
  object-fit: cover;
  box-sizing: border-box;
  max-width: 100%;
  max-height: 100%;
  height: auto;
}
</style>
