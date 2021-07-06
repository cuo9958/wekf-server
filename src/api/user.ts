import Router from "koa-router";
import { BeError, BeSuccess } from "../util/response";

const router = new Router();

router.get("/", async function (ctx) {
    try {
        const data = {
            count: 20,
            rows: [],
        };
        ctx.body = BeSuccess(data);
    } catch (error) {
        console.log(error);
        ctx.body = BeError(error.message);
    }
});

export default router.routes();
