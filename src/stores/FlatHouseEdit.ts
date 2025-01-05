import { defineStore } from 'pinia'
import type { YearMonth } from '@/utils/DateUtils'
import { DateUtils } from '@/utils/DateUtils'
import type { InputString, InputNumber, InputYearMonth } from './StoreType'

export const FlatHouseEditStore = defineStore({
  id: 'FlatHouseEdit',
  state: () => ({
    reviewId: '',
    address: {} as InputString,
    rent: {} as InputNumber,
    moveIn: {
      value: {
        year: new Date().getFullYear() as number,
        month: new Date().getMonth() as number
      } as YearMonth,
      isValid: false,
      isInvalid: false
    } as InputYearMonth,
    moveOut: {
      value: {
        year: new Date().getFullYear() as number,
        month: new Date().getMonth() as number
      } as YearMonth,
      isValid: false,
      isInvalid: false
    } as InputYearMonth,
    star: 3,
    review: {} as InputString
  }),
  getters: {},
  actions: {
    validateValue(): boolean {
      this.resetValidate()
      let totalResult = true
      if (this.validateAddress()) {
        this.address.isValid = true
      } else {
        this.address.isInvalid = true
        totalResult = false
      }
      if (this.validateRent()) {
        this.rent.isValid = true
      } else {
        this.rent.isInvalid = true
        totalResult = false
      }
      if (this.validateMoveIn()) {
        this.moveIn.isValid = true
      } else {
        this.moveIn.isInvalid = true
        totalResult = false
      }
      if (this.validateMoveOut()) {
        this.moveOut.isValid = true
      } else {
        this.moveOut.isInvalid = true
        totalResult = false
      }
      if (this.validateReview()) {
        this.review.isValid = true
      } else {
        this.review.isInvalid = true
        totalResult = false
      }
      return totalResult
    },

    validateAddress() {
      if (!this.address.value) {
        return false
      }
      const re = /^[a-z0-9!-/:-@[-`{-~]{1,50}$/i
      if (!re.test(this.address.value)) {
        return false
      }
      return true
    },

    validateRent() {
      if (!this.rent.value) {
        return false
      }
      const re = /^\d{1,4}(.\d{1,2})?$/i
      if (!re.test(this.rent.value.toString())) {
        return false
      }
      return true
    },
    validateMoveIn() {
      return this.validateDate(this.moveIn.value.year, this.moveIn.value.month)
    },

    validateMoveOut() {
      if (!this.validateDate(this.moveIn.value.year, this.moveIn.value.month)) {
        return false
      }

      const dateUtils = new DateUtils()
      const moveIn = dateUtils.monthToDateString(this.moveIn.value.year, this.moveIn.value.month)
      const moveOut = dateUtils.monthToDateString(this.moveOut.value.year, this.moveOut.value.month)
      if (moveOut < moveIn) {
        return false
      }
      return true
    },

    validateDate(year: number, month: number) {
      if (!year && year !== 0) {
        return false
      }
      if (!month && month !== 0) {
        return false
      }
      // 有効な日付かチェック
      if (isNaN(new Date(new DateUtils().monthToDateString(year, month)).getDate())) {
        return false
      }
      return true
    },

    validateReview() {
      if (!this.review.value) {
        return true
      }
      const re = /^[a-z0-9!-/:-@[-`{-~]+/i
      if (!re.test(this.review.value.toString())) {
        return false
      }
      return true
    },
    reset() {
      this.reviewId = ''
      this.address = {} as InputString
      this.rent = {} as InputNumber
      this.moveIn = {
        value: {
          year: new Date().getFullYear() as number,
          month: new Date().getMonth() as number
        } as YearMonth,
        isValid: false,
        isInvalid: false
      } as InputYearMonth
      this.moveOut = {
        value: {
          year: new Date().getFullYear() as number,
          month: new Date().getMonth() as number
        } as YearMonth,
        isValid: false,
        isInvalid: false
      } as InputYearMonth
      this.star = 3
      this.review = {} as InputString
    },

    resetValidate() {
      this.address.isValid = false
      this.address.isInvalid = false
      this.rent.isValid = false
      this.rent.isInvalid = false
      this.moveIn.isValid = false
      this.moveIn.isInvalid = false
      this.moveOut.isValid = false
      this.moveOut.isInvalid = false
      this.review.isValid = false
      this.review.isInvalid = false
    }
  }
})
