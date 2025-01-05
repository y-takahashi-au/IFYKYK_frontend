<template>
  <div class="m-4">
    <h1 class="mb-4">Create User</h1>
    <h3 class="mb-4">Register within 10 minutes of viewing this page.</h3>
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
      <div class="form-floating mb-3">
        <input
          type="password"
          v-model="store.password.value"
          class="form-control"
          :class="{
            'is-valid': store.password.isValid,
            'is-invalid': store.password.isInvalid
          }"
          id="floatingPassword"
          placeholder="Password"
        />
        <div v-if="store.password.isInvalid" class="invalid-feedback">
          Please enter at least 8 characters.
        </div>
        <div v-if="store.password.isInvalid" class="invalid-feedback">
          Please enter less than 20 characters.
        </div>
        <label for="floatingPassword">Password</label>
      </div>
    </div>
    <button type="button" class="btn btn-primary" @click="applyAccount">Register</button>
  </div>
  <SpinnerOverlay ref="spinner" />
  <div v-if="isModel" class="overlay d-flex align-items-center">
    <div class="h-100 w-100 d-flex justify-content-center align-items-center">
      <div class="bg-light d-flex flex-column w-75 p-3 rounded-4">
        <span class="mb-3 text-center">{{ message }}</span>
        <button @click="closeModel" type="button" class="btn btn-primary">CLOSE</button>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, onUnmounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { InitAccountStoreStore } from '@/stores/InitAccount'
import SpinnerOverlay from '@/components/SpinnerOverlay.vue'
import account from '@/api/Account'
import type { AccountInit } from '@/dto/AccountDto'
import type UserAuthentification from '@/dto/UserAuthentification'
import { AccountStore } from '@/stores/AccountStore'

const route = useRoute()

const store = InitAccountStoreStore()
store.userId = route.params.userId as string
const spinner = ref()
const message = ref<string>('')
const isModel = ref<boolean>(false)
const isSuccess = ref<boolean>(false)

const router = useRouter()
const accountStore = AccountStore()
const applyAccount = async () => {
  if (!store.validateValue()) {
    return
  }
  spinner.value.turnOn()
  const accountInit = {
    givenName: store.givenName.value,
    familyName: store.familyName.value,
    userId: store.userId,
    password: store.password.value
  } as AccountInit

  await account
    .apply(accountInit)
    .then(() => {
      message.value = 'Please wait for approval'
      isModel.value = true
      isSuccess.value = true
    })
    .catch((e) => {
      message.value = e.response.data
      isModel.value = true
    })
  spinner.value.turnOff()
}
const closeModel = async () => {
  isModel.value = false
  if (isSuccess.value) {
    const userAuthentification: UserAuthentification = {
      userId: store.userId,
      password: store.password.value
    }
    await account
      .login(userAuthentification)
      .then((response) => {
        document.cookie = 'authorization=' + response.headers.authorization
        accountStore.accountId = response.data.accountId
        accountStore.userId = response.data.userId
        accountStore.roll = response.data.roll
        router.push('/')
      })
      .catch((e: Error) => {
        console.log(e)
      })
  }
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
