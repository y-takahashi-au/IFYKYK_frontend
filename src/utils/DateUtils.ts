export type YearMonth = {
  month: number
  year: number
}

export class DateUtils {
  constructor() {}

  toDate(dateString: string): Date {
    return new Date(dateString)
  }
  MM_YYYY_SLASH(date: Date): string {
    return this.getMonth(date) + '/' + this.getYear(date)
  }
  getYear(date: Date): string {
    return date.getFullYear().toString().padStart(4, '0')
  }

  getMonth(date: Date): string {
    return (date.getMonth() + 1).toString().padStart(2, '0')
  }

  getDate(date: Date): string {
    return date.getDate().toString().padStart(2, '0')
  }

  monthToDateString(year: number, month: number) {
    const monthString = (month + 1).toString().padStart(2, '0')
    const yearString = year.toString().padStart(4, '0')
    return `${yearString}-${monthString}-01`
  }

  toYearMonth(date: Date): YearMonth {
    return {
      year: parseInt(date.getFullYear().toString().padStart(4, '0')),
      month: parseInt(date.getMonth().toString().padStart(2, '0'))
    } as YearMonth
  }
}
