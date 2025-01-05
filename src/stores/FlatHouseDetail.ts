import { defineStore } from 'pinia'
import type * as FlatHouseDTO from '@/dto/FlatHouse'
import flatHouse from '@/api/FlatHouse'

export const FlatHouseDetailStore = defineStore({
  id: 'FlatHouseDetail',
  state: () => ({
    id: '',
    address: '',
    reviews: [{} as FlatHouseDTO.Review]
  }),
  getters: {},
  actions: {
    async getDetail(id: string) {
      await flatHouse.getDetail(id).then((response) => {
        console.log(response)
        const result = response.data as FlatHouseDTO.Detail
        this.id = result.id
        this.address = result.address
        this.reviews = result.flatHouseReviews.sort((first, second) => {
          if (first.moveOut > second.moveOut) {
            return -1
          } else if (first.moveOut < second.moveOut) {
            return 1
          } else {
            return 0
          }
        })
      })
    },
    reset() {
      this.id = ''
      this.address = ''
      this.reviews = []
    }
  }
})
