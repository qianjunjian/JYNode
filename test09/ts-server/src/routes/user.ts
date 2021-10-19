import * as Koa from "koa"
import { get, middlewares } from '../utils/decors'

@middlewares([
    async function guard(ctx: Koa.Context, next: () => Promise<any>) {
        console.log('guard', ctx.header);
        if (ctx.header.token) {
            await next();
        } else {
            throw "请登录";
        }
    }
])
export default class User {
    @get('/users')
    public list(ctx: Koa.Context) {
        const users = {"name": "你好啊"}
        ctx.body = { ok: 1, data: users }
    }
}