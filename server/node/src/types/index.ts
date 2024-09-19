import type { PrismaClient } from '@prisma/client'
import type { Context } from 'koa'

declare module 'koa' {
  export interface DefaultState {
    stateProperty: boolean
  }
  export interface Context {
    prisma: PrismaClient
  }
  export interface DefaultContext {
    prisma: PrismaClient
  }
}
