export interface SearchCondition {
  place: string
}

export interface Overview {
  id: string
  address: string
  star: number
  picture: string | null
}

export interface FlatHouseList {
  flatHouseOverviews: [Overview]
}

export interface Detail {
  id: string
  address: string
  flatHouseReviews: [Review]
}

export interface Review {
  id: string
  rent: string
  moveIn: string
  moveOut: string
  star: number
  review: string
  accountId: string
  accountName: string
  pictures: string[]
}

export interface Edit {
  id: string | undefined
  address: string
  rent: number | undefined
  moveIn: string
  moveOut: string
  star: number
  review: string
  accountId: string
  pictures: string[]
}
