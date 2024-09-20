import type { PrismaClient } from '@prisma/client'
import type { LuckyWheel, Prize } from '@prisma/client'
import { ApiResponse } from './response'
declare module 'koa' {
  interface Context {
    prisma: PrismaClient
    success: (data: ApiResponse) => void
    fail: (data: ApiResponse) => void
  }
}
export type LuckyWheelWithPrizeList = LuckyWheel & {
  prizeList: Prize[]
}
