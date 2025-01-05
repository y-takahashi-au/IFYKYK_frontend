<template>
  <HomeHeader />
  <div class="m-4">
    <h1 class="mb-4">Applied User</h1>
    <div class="login">
      <div class="row no-gutters">
        <div class="form-floating mb-3 col-12 col-md-4">
          <input
            v-model="store.givenName.value"
            class="form-control"
            :class="{
              'is-valid': store.givenName.isValid,
              'is-invalid': store.givenName.isInvalid
            }"
            id="givenNameInput"
          />
          <div v-if="store.givenName.isInvalid" class="invalid-feedback">
            Please enter alphabet.
          </div>
          <label for="givenNameInput">givenName</label>
        </div>
        <div class="form-floating mb-3 col-12 col-md-4">
          <input
            v-model="store.familyName.value"
            class="form-control"
            :class="{
              'is-valid': store.familyName.isValid,
              'is-invalid': store.familyName.isInvalid
            }"
            id="familyNameInput"
          />
          <div v-if="store.familyName.isInvalid" class="invalid-feedback">
            Please enter alphabet.
          </div>
          <label for="familyNameInput">familyName</label>
        </div>
        <div class="form-floating mb-3 col-12 col-md-4">
          <input
            readonly
            name="id"
            v-model="store.userId"
            class="form-control-plaintext"
            id="passwordInput"
          />
          <label for="passwordInput">userId(Don't forget this ID)</label>
        </div>
      </div>
      <div class="mb-3">
        <label for="roll">Roll</label>
        <select
          id="roll"
          class="form-select form-select-md"
          :class="{
            'is-valid': store.roll.isValid,
            'is-invalid': store.roll.isInvalid
          }"
          v-model="store.roll.value"
        >
          <option value="Student">Student</option>
          <option value="Administrator">Administrator</option>
        </select>
        <div v-if="store.roll.isInvalid" class="invalid-feedback">Please select roll.</div>
      </div>
    </div>
    <button type="button" class="btn btn-primary" @click="approveAccount">Approve</button>
  </div>
  <SpinnerOverlay ref="spinner" />
  <div v-if="isModel" class="overlay d-flex align-items-center">
    <div class="h-100 w-100 d-flex justify-content-center align-items-center">
      <div class="bg-light d-flex flex-column w-75 p-3 rounded-4">
        <img src="@/assets/kangaroo2.gif" />
        <span class="mb-3 text-center">{{ message }}</span>
        <button @click="closeModel" type="button" class="btn btn-primary">CLOSE</button>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { onUnmounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { InitAccountStoreStore } from '@/stores/InitAccount'
import SpinnerOverlay from '@/components/SpinnerOverlay.vue'
import account from '@/api/Account'
import type { ApprovalAccount } from '@/dto/AccountDto'
import HomeHeader from '@/components/HomeHeader.vue'

const store = InitAccountStoreStore()

const spinner = ref()
const message = ref<string>('')
const isModel = ref<boolean>(false)
const isSuccess = ref<boolean>(false)

const router = useRouter()
const approveAccount = async () => {
  if (!store.validateApprovalValue()) {
    return
  }
  spinner.value.turnOn()
  const approvalAccount = {
    givenName: store.givenName.value,
    familyName: store.familyName.value,
    userId: store.userId,
    roll: store.roll.value
  } as ApprovalAccount

  await account
    .approve(approvalAccount)
    .then(() => {
      message.value = 'done'
      isModel.value = true
      isSuccess.value = true
    })
    .catch((e) => {
      message.value = e.response.data
      isModel.value = true
    })
  spinner.value.turnOff()
}
const closeModel = () => {
  router.push('/')
}
onUnmounted(() => {
  store.reset()
})
</script>
<style scoped>
.no-gutters {
  margin-right: 0;
  margin-left: 0;

  > .col,
  > [class*='col-'] {
    padding-right: 3px;
    padding-left: 0px;
    padding-top: 0px;
    padding-bottom: 0px;
  }
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
</style>
