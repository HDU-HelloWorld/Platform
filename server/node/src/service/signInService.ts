import type { Context } from 'koa'
import { SignIn } from '@prisma/client'
class SignInService {
  async createSignInEvent(ctx: Context, event: string, studentId?: number[]) {
    // TODO: implement signIn
    const exist = await this.getSignInEvent(ctx, event)
    if (!exist) {
      return await ctx.prisma.signIn.create({
        data: {
          event,
          userIds: studentId || [],
        },
      })
    } else {
      return null
    }
  }
  async getSignInEvent(ctx: Context, event?: string) {
    // TODO: implement getSignIn
    if (!event) {
      return await ctx.prisma.signIn.findMany()
    }
    const signInEvent = await ctx.prisma.signIn.findUnique({
      where: {
        event,
      },
    })
    return signInEvent
  }
  async signIn(ctx: Context, event: string, studentId: number) {
    // TODO: implement signIn
    const signInEvent = await ctx.prisma.signIn.findUnique({
      where: {
        event,
      },
    })
    if (signInEvent) {
      return await ctx.prisma.signIn.update({
        where: {
          event,
        },
        data: {
          userIds: signInEvent.userIds.concat(studentId),
        },
      })
    } else {
      return { msg: 'event not exist' }
    }
  }
}
export default new SignInService()
