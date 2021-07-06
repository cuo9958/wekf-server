import Router from "koa-router";

import user from "./api/user";
import test from "./api";

const router = new Router();

//对外提供的接口
router.use("/api/user", user);
router.use("/api/test", test);

export default router;
