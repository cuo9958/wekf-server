import Koa from "koa";
import KoaBody from "koa-body";
import routers from "./router";
import http from "http";
import Socket from "socket.io";

const app = new Koa();
const server = http.createServer(app.callback());
const SocketIO = new Socket.Server(server);

app.use(KoaBody({}));

//加载路由
app.use(routers.routes()).use(routers.allowedMethods());

//加载websocket
SocketIO.on("connection", (client: Socket.Socket) => {
    console.log("进入", client.id);
});

const port = process.env.PORT || "8082";

server.listen(port, function () {
    console.log(`服务器运行在http://127.0.0.1:${port}`);
});
