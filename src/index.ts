import Koa from "koa";
import KoaBody from "koa-body";
import routers from "./router";
import http from "http";
import KFService from "./service/kf";

const app = new Koa();
const server = http.createServer(app.callback());

KFService(server);

app.use(
    KoaBody({
        multipart: true,
    })
);

//加载路由
app.use(routers.routes()).use(routers.allowedMethods());

const port = process.env.PORT || "8082";

server.listen(port, function () {
    console.log(`服务器运行在http://127.0.0.1:${port}`);
});
