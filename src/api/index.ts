import Router from "koa-router";
import CrosMiddle from "../middleware/cros";
import { CreateJwtToken } from "../service/user";

const router = new Router();

router.all("/", CrosMiddle, function (ctx) {
    const data = CreateJwtToken({ a: 1 });
    ctx.body = data;
});

export default router.routes();
