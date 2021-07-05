import Koa from "koa";
import KoaBody from "koa-body";
import routers from "./router";
import http from "http";
import Socket from "socket.io";
import { UserJoin, UserLeave, UserTalk } from "./service/img";

const app = new Koa();
const server = http.createServer(app.callback());
const SocketIO = new Socket.Server(server, {
    path: "/_img",
    connectTimeout: 60000,
    cors: {
        origin: "*",
        methods: ["GET", "POST"],
    },
});

app.use(
    KoaBody({
        multipart: true,
    })
);

//加载路由
app.use(routers.routes()).use(routers.allowedMethods());

//加载websocket
SocketIO.on("connection", (client: Socket.Socket) => {
    console.log("进入", client.handshake.query);
    UserJoin(client.id, client);

    client.on("talk", (data) => {
        console.log("talk事件", data);
        UserTalk(client.id, data);
    });
    client.on("message", (data) => {
        console.log("message事件", data);
    });
    client.on("disconnect", (msg) => {
        console.log("用户退出", msg);
        UserLeave(client.id);
    });
});

const port = process.env.PORT || "8082";

server.listen(port, function () {
    console.log(`服务器运行在http://127.0.0.1:${port}`);
});
