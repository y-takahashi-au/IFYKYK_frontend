<template>
  <div class="m-2">
    <div class="row no-gutters">
      <div class="col-12 col-md-10">
        <div class="form-group">
          <label for="Address">Address</label>
          <input
            class="form-control form-control-md"
            :readonly="isAddress"
            :disabled="isAddress"
            id="Address"
            placeholder="Level 6/770"
            v-model="flatHouseEditStore.address.value"
            :class="{
              'is-valid': flatHouseEditStore.address.isValid,
              'is-invalid': flatHouseEditStore.address.isInvalid
            }"
          />
          <div v-if="flatHouseEditStore.address.isInvalid" class="invalid-feedback">
            Please enter alphabet.
          </div>
        </div>
      </div>
      <div class="col-3 col-md-2">
        <label for="state">State</label>
        <select class="form-select form-select-md" id="state" disabled>
          <option value="NSW" selected>NSW</option>
        </select>
      </div>
    </div>
    <div class="row no-gutters mb-3">
      <div class="col-4 col-md-3">
        <label for="basic-url">Rent</label>
        <div class="input-group">
          <div class="input-group-prepend">
            <span class="input-group-text">$</span>
          </div>
          <input
            type="number"
            class="form-control"
            id="basic-url"
            v-model="flatHouseEditStore.rent.value"
            :class="{
              'is-valid': flatHouseEditStore.rent.isValid,
              'is-invalid': flatHouseEditStore.rent.isInvalid
            }"
          />
          <div v-if="flatHouseEditStore.rent.isInvalid" class="invalid-feedback">
            Please enter number.
          </div>
        </div>
      </div>
      <div class="col-4 col-md-3">
        <label for="moveIn">Move in</label>
        <VueDatePicker
          month-picker
          auto-apply
          id="moveIn"
          v-model="flatHouseEditStore.moveIn.value"
          :clearable="false"
          :format="format(flatHouseEditStore.moveIn.value)"
          :class="{
            'is-valid': flatHouseEditStore.moveIn.isValid,
            'is-invalid': flatHouseEditStore.moveIn.isInvalid
          }"
        ></VueDatePicker>
      </div>
      <div class="col-4 col-md-3">
        <label for="moveOut">Move Out</label>
        <VueDatePicker
          month-picker
          auto-apply
          id="moveOut"
          v-model="flatHouseEditStore.moveOut.value"
          :clearable="false"
          :format="format(flatHouseEditStore.moveOut.value)"
          :class="{
            'is-valid': flatHouseEditStore.moveOut.isValid,
            'is-invalid': flatHouseEditStore.moveOut.isInvalid
          }"
        ></VueDatePicker>
        <div v-if="flatHouseEditStore.moveOut.isInvalid" class="invalid-feedback">
          Please enter the date that is newer than the move-in.
        </div>
      </div>
    </div>
    <div class="d-flex">
      <label> Rating: </label>
      <star-rating
        v-bind:increment="1"
        v-bind:star-size="30"
        v-bind:show-rating="false"
        v-bind:read-only="false"
        v-model:rating="flatHouseEditStore.star"
        class="mb-3"
      ></star-rating>
    </div>
    <PictureSwipe />
    <div class="form-group mb-3">
      <label for="exampleFormControlTextarea1">review</label>
      <textarea
        class="form-control"
        id="exampleFormControlTextarea1"
        rows="8"
        v-model="flatHouseEditStore.review.value"
        :class="{
          'is-valid': flatHouseEditStore.review.isValid,
          'is-invalid': flatHouseEditStore.review.isInvalid
        }"
      ></textarea>
      <div v-if="flatHouseEditStore.review.isInvalid" class="invalid-feedback">
        Please enter alphabet.
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue'
import { FlatHouseEditStore } from '@/stores/FlatHouseEdit'
import PictureSwipe from '@/components/PictureSwipe.vue'
//@ts-ignore
import StarRating from 'vue-star-rating'
import type { YearMonth } from '@/utils/DateUtils'
import { PictureSwipeStore } from '@/stores/PictureSwipe'
const flatHouseEditStore = FlatHouseEditStore()
const pictureSwipeStore = PictureSwipeStore()
const props = defineProps({
  isAddress: { type: Boolean, required: false, default: false }
})
const format = (yearMonth: YearMonth) => {
  const month = (yearMonth.month + 1).toString().padStart(2, '0')
  const fullYear = yearMonth.year.toString()
  const year = fullYear.slice(2)
  return `${month}/${year}`
}
onUnmounted(() => {
  flatHouseEditStore.reset()
  pictureSwipeStore.reset()
})
</script>
<style scoped>
.no-gutters {
  margin-right: 0;
  margin-left: 0;

  > .col,
  > [class*='col-'] {
    padding-right: 5px;
    padding-left: 0;
  }
}
</style>
