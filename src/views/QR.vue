<template>
  <div class="vw-100 vh-100 d-flex justify-content-center align-items-center">
    <qrcode-vue
      :value="value"
      :size="300"
      :level="level"
      :render-as="renderAs"
      :background="background"
      :foreground="foreground"
      :gradient="gradient"
      :gradient-type="gradientType"
      :gradient-start-color="gradientStartColor"
      :gradient-end-color="gradientEndColor"
    />
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import QrcodeVue from 'qrcode.vue'
import type { Level, RenderAs, GradientType } from 'qrcode.vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

const userId = route.params.userId
if (Array.isArray(userId)) {
  router.push('/')
}
const value = ref(`http://localhost:5173/initUser/${userId}`)
console.log(value)
const level = ref<Level>('M')
const renderAs = ref<RenderAs>('svg')
const background = ref('#ffffff')
const foreground = ref('#000000')
const margin = ref(0)

const gradient = ref(false)
const gradientType = ref<GradientType>('linear')
const gradientStartColor = ref('#000000')
const gradientEndColor = ref('#38bdf8')
</script>
<style scoped>
.header-icon {
  font-size: 40px;
}
</style>
