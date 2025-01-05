import { defineStore } from 'pinia'
import type * as FlatHouseDTO from '@/dto/FlatHouse'
import flatHouse from '@/api/FlatHouse'

export const FlatHouseListStore = defineStore({
  id: 'FlatHouseList',
  state: () => ({
    searchCondition: {} as FlatHouseDTO.SearchCondition,

    flatHouses: [{} as FlatHouseDTO.Overview]
  }),
  getters: {
    getSearchCondition: (state) => state.searchCondition
  },
  actions: {
    async getList() {
      await flatHouse.getList(this.$state.searchCondition).then((response) => {
        const flatHouseOverviews = response.data.flatHouseOverviews as [FlatHouseDTO.Overview]
        flatHouseOverviews.map((flatHouseOverview) => {
          this.flatHouses.push({
            id: flatHouseOverview.id,
            address: flatHouseOverview.address,
            star: Math.round(flatHouseOverview.star * 2) / 2,
            picture: flatHouseOverview.picture
          } as FlatHouseDTO.Overview)
          flatHouseOverview.star
        })
      })
    },
    reset() {
      this.flatHouses = []
      this.searchCondition = {} as FlatHouseDTO.SearchCondition
    }
  }
})
