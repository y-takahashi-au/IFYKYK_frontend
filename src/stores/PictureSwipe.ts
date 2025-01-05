import { defineStore } from 'pinia'

export type PictureSwipeType = {
  src: string
}

export const PictureSwipeStore = defineStore({
  id: 'PictureSwipe',
  state: () => ({
    srcs: [] as string[],
    bigPicture: '',
    index: 0,
    overlay: false
  }),
  getters: {},
  actions: {
    async getPlace() {},
    reset() {
      this.srcs = []
      this.bigPicture = ''
      this.overlay = false
      this.index = 0
    },
    turnOn() {
      this.overlay = true
    },
    turnOff() {
      this.overlay = false
    }
  }
})
