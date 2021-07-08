import NJwt from "njwt";
import UserModel from "../model/user";

const jwt_key = "123";

export function CreateJwtToken(data: any) {
    const jwt = NJwt.create(data, jwt_key);
    return jwt.compact();
}

export function ParseJwtToken(token: string) {
    const data = NJwt.verify(token, jwt_key);
    if (!data) return null;
    return data.body;
}

export async function Login(user_name, pwd) {
    //用户名密码
    const model = await UserModel.getBypwd(user_name, pwd);
    if (!model) throw new Error("用户密码错误");
    //生成token
    const data = {
        nickname: model.nickname,
        user_name: model.user_name,
        headimg: model.headimg,
        role: model.role,
        updatedAt: model.updatedAt,
    };
    const token = CreateJwtToken(data);
    return {
        user_name,
        token,
        nickname: model.nickname,
        headimg: model.headimg,
        role: model.role,
    };
}

export async function GetUserList(pageindex = 0) {
    const data = await UserModel.getlist(pageindex);
    return data;
}

export async function DelUser(id: number) {
    return UserModel.del(id);
}
export async function DelUsers(ids: number[]) {
    return UserModel.del(ids);
}
export async function EditUser(model: any, id = 0) {
    if (!id) {
        await UserModel.insert(model);
    } else {
        await UserModel.update(model, id);
    }
}
