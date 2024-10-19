<template>
  <h1 class="mb-4">ログインページ</h1>
  <div class="login">
    <div class="form-floating mb-3">
      <input
        v-model="loginId"
        class="form-control"
        id="floatingInput"
        placeholder="name@example.com"
      />
      <label for="floatingInput">ID</label>
    </div>
    <div class="form-floating mb-3">
      <input
        type="password"
        v-model="password"
        class="form-control"
        id="floatingPassword"
        placeholder="Password"
      />
      <label for="floatingPassword">Password</label>
    </div>
    <div class="input-group mb-3">
      <button type="button" class="btn btn-primary" @click="submit">ログイン</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import account from '@/api/Account'
import type UserAuthentification from '@/dto/UserAuthentification'
import { useRouter } from 'vue-router'

const loginId = ref<string>()
const password = ref<string>()
const router = useRouter()

const submit = async () => {
  if (!loginId.value) {
    return
  }
  if (!password.value) {
    return
  }
  const userAuthentification: UserAuthentification = {
    userId: loginId.value,
    password: password.value
  }
  await account
    .login(userAuthentification)
    .then((response) => {
      document.cookie = 'authorization=' + response.headers.authorization
      router.push('/')
    })
    .catch((e: Error) => {
      console.log(e)
    })
}
</script>
<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
