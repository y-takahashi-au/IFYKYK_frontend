<template>
  <div class="row">
    <input type="file" id="fileUpload" @change="onFileChange" accept="image/*" multiple hidden />
    <!-- <i class="bi bi-images col-3 col-md-2 mb-3" @click="chooseFiles"></i> -->
    <div class="col-3 col-md-2 mb-3">
      <div
        class="picture rounded-4 border border-success d-flex flex-column justify-content-center"
        @click="chooseFiles"
      >
        <span class="text-center">Add</span>
        <span class="text-center">Picture</span>
      </div>
    </div>
    <output class="col-3 col-md-2 mb-3" v-for="(src, index) in pictureSwipeStore.srcs" :key="index">
      <div class="position-relative">
        <i class="bi bi-x-circle text-danger delete" @click.stop="deletePicture(index)"></i>
        <img
          class="picture rounded-4 border border-success"
          :src="src"
          v-if="src"
          @click="displayBigPicture(src, index)"
        />
      </div>
    </output>
  </div>
  <div
    class="overlay d-flex align-items-center"
    v-if="pictureSwipeStore.overlay"
    @click="turnOffOverlay"
  >
    <i @click.stop="beforePicture" class="bi bi-arrow-left-square-fill h1"></i>
    <div class="h-100 w-100 d-flex justify-content-center align-items-center">
      <img class="big-picture" @click.stop="" :src="pictureSwipeStore.bigPicture" />
    </div>
    <i @click.stop="afterPicture" class="bi bi-arrow-right-square-fill h1"></i>
  </div>
</template>
<script setup lang="ts">
import { onBeforeMount, onUnmounted } from 'vue'
import { PictureSwipeStore } from '@/stores/PictureSwipe'
import ImageUtil from '@/utils/ImageUtil'

const pictureSwipeStore = PictureSwipeStore()
const chooseFiles = () => {
  document.getElementById('fileUpload')?.click()
}
const onFileChange = (event: any) => {
  const files = [...(event.target.files as FileList)].filter((file: File) => existFile(file))

  if (files.length < 1) {
    return null
  }

  files.map(async (file: File) => {
    const compFile = await ImageUtil.getCompressImageFileAsync(file)
    //ファイルサイズの表示
    console.log((file.size / 1024 / 1024).toFixed(4))
    console.log((compFile.size / 1024 / 1024).toFixed(4))
    // 画像情報の設定
    const reader = new FileReader()
    reader.onload = function (e) {
      if (e && e.target) {
        if (pictureSwipeStore.srcs.length >= 10) {
          alert('You can register up to 10 photos.')
          return
        }
        pictureSwipeStore.srcs.push(e.target.result as string)
      }
    }
    reader.readAsDataURL(compFile)
  })
}

const existFile = (file: File) => {
  if (!file) {
    return false
  }
  if (!file.type.match('image.*')) {
    return false
  }
  return true
}
const displayBigPicture = (src: string, index: number) => {
  pictureSwipeStore.turnOn()
  pictureSwipeStore.bigPicture = src
  pictureSwipeStore.index = index
}

const turnOffOverlay = () => {
  pictureSwipeStore.turnOff()
}

const beforePicture = () => {
  let index = pictureSwipeStore.index
  if (index === 0) {
    index = pictureSwipeStore.srcs.length - 1
  } else {
    index = pictureSwipeStore.index - 1
  }
  pictureSwipeStore.index = index
  pictureSwipeStore.bigPicture = pictureSwipeStore.srcs[index]
}

const afterPicture = () => {
  let index = pictureSwipeStore.index
  if (index === pictureSwipeStore.srcs.length - 1) {
    index = 0
  } else {
    index = pictureSwipeStore.index + 1
  }
  pictureSwipeStore.index = index
  pictureSwipeStore.bigPicture = pictureSwipeStore.srcs[index]
}
const deletePicture = (index: number) => {
  pictureSwipeStore.srcs.splice(index, 1)
}

onUnmounted(() => {
  pictureSwipeStore.reset()
})
</script>
<style scoped>
.picture {
  aspect-ratio: 1 / 1;
  object-fit: cover;
  box-sizing: border-box;
  max-width: 100%;
  max-height: 100%;
  height: auto;
}

.delete {
  position: absolute;
  right: -7px;
  top: -10px;
}
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
</style>
