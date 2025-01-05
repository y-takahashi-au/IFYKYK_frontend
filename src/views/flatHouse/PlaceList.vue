<template>
  <HomeHeader />
  <ul class="row no-gutters list-unstyled">
    <li
      class="border col-12 col-md-6"
      v-for="flathouse in flatHouseListStore.flatHouses"
      :key="flathouse.id"
      @click="goToDetail(flathouse.id)"
    >
      <div class="row no-gutters">
        <div class="col-4">
          <img
            v-if="flathouse.picture"
            class="picture rounded-4 border border-success"
            :src="flathouse.picture"
          />
          <svg
            v-else
            class="w-100"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 -960 960 960"
            fill="#e8eaed"
          >
            <path
              d="m840-234-80-80v-446H314l-80-80h526q33 0 56.5 23.5T840-760v526ZM792-56l-64-64H200q-33 0-56.5-23.5T120-200v-528l-64-64 56-56 736 736-56 56ZM240-280l120-160 90 120 33-44-283-283v447h447l-80-80H240Zm297-257ZM424-424Z"
            />
          </svg>
        </div>
        <div class="col-8 d-flex flex-column">
          <div>
            {{ flathouse.address }}
          </div>
          <star-rating
            v-model:rating="flathouse.star"
            v-bind:increment="0.5"
            v-bind:star-size="20"
            v-bind:show-rating="false"
            v-bind:read-only="true"
          ></star-rating>
        </div>
      </div>
    </li>
  </ul>
  <button type="button" class="w-100 btn btn-primary" @click="goToEdit">Add Flat House</button>
  <SpinnerOverlay ref="spinner" />
</template>
<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import { FlatHouseListStore } from '../../stores/FlatHouseList'
import { useRouter } from 'vue-router'
//@ts-ignore
import StarRating from 'vue-star-rating'
import HomeHeader from '@/components/HomeHeader.vue'
import SpinnerOverlay from '@/components/SpinnerOverlay.vue'

const router = useRouter()
const flatHouseListStore = FlatHouseListStore()
const spinner = ref()
onMounted(async () => {
  spinner.value.turnOn()
  flatHouseListStore.reset()
  await flatHouseListStore.getList()
  spinner.value.turnOff()
})

onUnmounted(() => {
  flatHouseListStore.reset()
})
const goToDetail = (id: string) => {
  router.push({ name: 'flatHouseDetail', params: { id: id } })
}

const goToEdit = () => {
  router.push({ name: 'addFlatHouse' })
}
</script>
<style scoped>
.header-icon {
  font-size: 40px;
}
.picture {
  aspect-ratio: 1 / 1;
  object-fit: cover;
  box-sizing: border-box;
  max-width: 100%;
  max-height: 100%;
  height: auto;
}
.no-gutters {
  margin-right: 0;
  margin-left: 0;

  > .col,
  > [class*='col-'] {
    padding: 3px;
  }
}
</style>
