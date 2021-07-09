/**
 * 处理用户通过websocket进入
 */
import Socket, { Server } from "socket.io";

const Clients: Map<string, Socket.Socket> = new Map();

interface IUserData {
    uname: string;
    uid: string;
    project: string;
}

let SocketIO: Server;

export default function (server: any) {
    SocketIO = new Socket.Server(server, {
        path: "/_img",
        connectTimeout: 60000,
        cors: {
            origin: "*",
            methods: ["GET", "POST"],
        },
    });

    //加载websocket
    SocketIO.on("connection", (client: Socket.Socket) => {
        // console.log("进入", client.handshake.query);
        UserJoin(client.id, client.handshake.query as any, client);

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
}

//检查用户是否正常
function checkUser(data: IUserData) {
    return true;
}

//链接socket，自动进入房间
async function UserJoin(id: string, data: IUserData, client: Socket.Socket) {
    //1. 判断用户是否正常
    const isnom = await checkUser(data);
    if (!isnom) return UserLeave(id);
    //2. 根据项目id加入房间
    const room_name = data.project + "_" + data.uid;
    client.join(room_name);
    console.log("用户加入房间");
    //3. 通知项目负责的客服
    client.broadcast.emit("wait", id, data.uid, data.project);
    console.log("广播消息");
    //4. 缓存客户对象
    Clients.set(id, client);
}

//离开
function UserLeave(id: string) {
    //1. 清理缓存对象
    const client = Clients.get(id);
    if (!client) return;
    client.disconnect();
    Clients.delete(id);
    //2. 通知正在连接的客服，下线
}
//发消息
function UserTalk(id: string, msg: any) {
    console.log("说", msg);
    if (!id) return;
    const client = Clients.get(id);
    if (!client) return;
    client.broadcast.emit("talk", id, msg);
    // client.emit("join", "小姐姐");
    // client.emit("talk", { id: 1, type: "text", data: "回复消息内容" + msg.data });
}

//1. 用户连入系统
//2. 发送欢迎语句
//3. 发送询问语句
//4. 交互
//5. 用户离开
//6. 客服进入、换客服
//7. 工作时间
