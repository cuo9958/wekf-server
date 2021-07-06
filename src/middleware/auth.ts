/**
 * 鉴权
 */
import { ParseJwtToken } from "../service/user";
import { BeError } from "../util/response";

export default async function (ctx: any, next: any) {
    const { token } = ctx.headers;
    if (token) {
        const model = ParseJwtToken(token);
        if (model) {
            ctx.user = model;
            await next();
        } else {
            ctx.body = BeError("没有权限", 401);
        }
    } else {
        ctx.body = BeError("登录失效", 402);
    }
}
