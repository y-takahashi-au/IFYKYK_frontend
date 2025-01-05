import { useRouter, useRoute } from 'vue-router'

export type Account = {
  givenName: string
  familyName: string
  userId: string
}
export type FlatHouse = {
  reviewId: string
  address: string
  rent: number
  moveIn: string
  moveOut: string
  star: number
  review: string
  pictures: string[]
}

export abstract class ApprovalList {
  router = useRouter()
  list: []

  constructor(list: []) {
    this.list = list
  }

  abstract gotToDetail(): void
}

class AccountList extends ApprovalList {
  constructor(list: []) {
    super(list)
  }

  gotToDetail(): void {
    this.router.push({ name: 'addFlatHouseReview' })
  }
}

class FlatHouseList extends ApprovalList {
  constructor(list: []) {
    super(list)
  }

  gotToDetail(): void {
    this.router.push({ name: 'addFlatHouseReview' })
  }
}
