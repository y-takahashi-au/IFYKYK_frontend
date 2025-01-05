<template>
  <ul class="list-group">
    <li class="list-group-item d-flex flex-column" v-for="(content, index) in list" :key="index">
      <div></div>
    </li>
  </ul>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import { FlatHouseEditStore } from '@/stores/FlatHouseEdit'
import { PictureSwipeStore } from '@/stores/PictureSwipe'
import { DateUtils } from '@/utils/DateUtils'
import { ApprovalList } from '@/script/ApprovalList'

const flatHouseEditStore = FlatHouseEditStore()
const pictureSwipeStore = PictureSwipeStore()
const dateUtils = new DateUtils()
const isModel = ref(false)
defineProps({
  list: []
})

const createFlatHouse = async () => {}
</script>
<style scoped>
.header-icon {
  font-size: 40px;
}
</style>
