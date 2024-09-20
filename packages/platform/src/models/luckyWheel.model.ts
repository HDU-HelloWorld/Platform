export interface Prize {
  name: string
  weight: number
  prize: string
  remain: number
  amount: number
}

export interface LuckyWheel {
  name: string
  prizeList: Prize[]
}
