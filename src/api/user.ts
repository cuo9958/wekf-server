import Router from "koa-router";
import { BeError, BeSuccess } from "../util/response";
import { GetUserList, DelUser, EditUser } from "../service/user";

const router = new Router();

router.get("/", async function (ctx) {
    const { pageindex } = ctx.query;
    try {
        const data = await GetUserList(pageindex);
        ctx.body = BeSuccess(data);
    } catch (error) {
        console.log(error);
        ctx.body = BeError(error.message);
    }
});
router.post("/edit", async function (ctx) {
    const { id, nickname, user_name, pwd, headimg, role } = ctx.request.body;
    try {
        const model = { nickname, user_name, pwd, headimg, role };
        const data = await EditUser(model, id);
        ctx.body = BeSuccess(data);
    } catch (error) {
        console.log(error);
        ctx.body = BeError(error.message);
    }
});

router.post("/del", async function (ctx) {
    const { id } = ctx.request.body;
    try {
        const data = await DelUser(id * 1);
        ctx.body = BeSuccess(data);
    } catch (error) {
        console.log(error);
        ctx.body = BeError(error.message);
    }
});
export default router.routes();
