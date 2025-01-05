import { defineStore } from 'pinia'
import type { InputString } from './StoreType'

export const InitAccountStoreStore = defineStore({
  id: 'InitAccountStore',
  state: () => ({
    givenName: {} as InputString,
    familyName: {} as InputString,
    userId: '',
    password: {} as InputString,
    roll: {} as InputString
  }),
  actions: {
    validate() {
      this.givenName = {
        value: '',
        isValid: false,
        isInvalid: false
      } as InputString
      this.familyName = {
        value: '',
        isValid: false,
        isInvalid: false
      } as InputString
      this.userId = ''
      this.password = {
        value: '',
        isValid: false,
        isInvalid: false
      } as InputString
    },

    validateValue(): boolean {
      this.resetValidate()
      let totalResult = true
      if (this.validateName(this.givenName.value)) {
        this.givenName.isValid = true
      } else {
        this.givenName.isInvalid = true
        totalResult = false
      }
      if (this.validateName(this.familyName.value)) {
        this.familyName.isValid = true
      } else {
        this.familyName.isInvalid = true
        totalResult = false
      }
      if (this.validatePassword()) {
        this.password.isValid = true
      } else {
        this.password.isInvalid = true
        totalResult = false
      }
      return totalResult
    },
    validateName(name: string) {
      if (!name) {
        return false
      }
      const re = /^[0-9a-z]+$/i
      if (!re.test(name)) {
        return false
      }
      return true
    },
    validatePassword() {
      if (!this.password.value) {
        return false
      }
      const re = /^[a-z0-9!-/:-@[-`{-~]{8,20}$/i
      if (!re.test(this.password.value)) {
        return false
      }
      return true
    },

    validateRoll() {
      if (!this.roll.value) {
        return false
      }
      return true
    },

    validateApprovalValue(): boolean {
      this.resetValidate()
      let totalResult = true
      if (this.validateName(this.givenName.value)) {
        this.givenName.isValid = true
      } else {
        this.givenName.isInvalid = true
        totalResult = false
      }
      if (this.validateName(this.familyName.value)) {
        this.familyName.isValid = true
      } else {
        this.familyName.isInvalid = true
        totalResult = false
      }
      if (this.validateRoll()) {
        this.roll.isValid = true
      } else {
        this.roll.isInvalid = true
        totalResult = false
      }
      return totalResult
    },
    reset() {
      this.givenName = {
        value: '',
        isValid: false,
        isInvalid: false
      } as InputString
      this.familyName = {
        value: '',
        isValid: false,
        isInvalid: false
      } as InputString
      this.userId = ''
      this.password = {
        value: '',
        isValid: false,
        isInvalid: false
      } as InputString
      this.roll = {
        value: '',
        isValid: false,
        isInvalid: false
      } as InputString
    },
    resetValidate() {
      this.givenName.isValid = false
      this.givenName.isInvalid = false
      this.familyName.isValid = false
      this.familyName.isInvalid = false
      this.password.isValid = false
      this.password.isInvalid = false
      this.roll.isValid = false
      this.roll.isInvalid = false
    }
  }
})
