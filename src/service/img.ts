/**
 * 处理用户通过websocket进入
 */
import Socket from "socket.io";

const Clients = new Map();

//链接socket，自动进入房间
export function UserJoin(id: string, client: Socket.Socket) {
    client.join("room_id");
    Clients.set(id, client);
}
//离开
export function UserLeave(id: string) {}
//发消息
export function UserTalk(id: string, msg: string) {
    console.log("说", msg);
    const client = Clients.get(id);
    if (!id) return;
    client.emit("join", "小姐姐进入");
}

//1. 用户连入系统
//2. 发送欢迎语句
//3. 发送询问语句
//4. 交互
//5. 用户离开
//6. 客服进入、换客服
