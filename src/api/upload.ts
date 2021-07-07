import Router from "koa-router";
import CrosMiddle from "../middleware/cros";

const router = new Router();

router.all("/", CrosMiddle, function (ctx) {
    ctx.body = {};
});

export default router.routes();
