import type { YearMonth } from '@/utils/DateUtils'

export type InputString = {
  value: string
  isValid: boolean
  isInvalid: boolean
}

export type InputNumber = {
  value: number
  isValid: boolean
  isInvalid: boolean
}

export type InputYearMonth = {
  value: YearMonth
  isValid: boolean
  isInvalid: boolean
}
