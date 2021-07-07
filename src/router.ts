import Router from "koa-router";

import user from "./api/user";
import upload from "./api/upload";
import test from "./api";

const router = new Router();

//对外提供的接口
router.use("/api/user", user);
router.use("/api/upload", upload);
router.use("/api/test", test);

export default router;
