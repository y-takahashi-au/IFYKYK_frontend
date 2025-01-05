<template>
  <div class="circle_number bg-danger d-flex justify-content-center align-items-center">
    <span>{{ num }}</span>
  </div>
</template>
<script setup lang="ts">
defineProps(['num'])
</script>
<style scoped>
.circle_number {
  margin: 0;
  padding: 0;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  text-align: center;
  box-sizing: border-box;
}
</style>
