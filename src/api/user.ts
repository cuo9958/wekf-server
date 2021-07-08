import Router from "koa-router";
import { BeError, BeSuccess } from "../util/response";
import { GetUserList, DelUsers, EditUser } from "../service/user";

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
    const { ids } = ctx.request.body;
    let idlist: any[] = [];
    if (typeof ids === "number") {
        idlist.push(ids);
    } else {
        idlist = ids.split(",").map((item) => parseInt(item));
    }
    try {
        const data = await DelUsers(idlist);
        ctx.body = BeSuccess(data);
    } catch (error) {
        console.log(error);
        ctx.body = BeError(error.message);
    }
});
export default router.routes();
