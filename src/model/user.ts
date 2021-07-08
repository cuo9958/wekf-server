import { Model, DataTypes } from "sequelize";
import db from "../db/mysql";

class User extends Model {}
User.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        nickname: {
            type: DataTypes.STRING(100),
            defaultValue: "",
            comment: "昵称",
        },
        user_name: {
            type: DataTypes.STRING(100),
            unique: true,
            defaultValue: "",
            comment: "账户",
        },
        pwd: {
            type: DataTypes.STRING(100),
            defaultValue: "",
            comment: "密码",
        },
        headimg: {
            type: DataTypes.STRING,
            defaultValue: "",
            comment: "头像",
        },
        role: {
            type: DataTypes.STRING(100),
            defaultValue: "",
            comment: "权限",
        },
    },
    {
        sequelize: db,
        freezeTableName: true,
        tableName: "t_user",
        indexes: [
            {
                fields: ["user_name"],
            },
        ],
    }
);

//强制初始化数据库
// User.sync({ force: true });

export default {
    insert: function (model: any) {
        return User.create(model);
    },
    get: function (id: number) {
        return User.findOne({
            where: {
                id,
            },
        });
    },
    del: function (id: number | number[]) {
        return User.destroy({
            where: {
                id,
            },
        });
    },
    update(data: any, id) {
        return User.update(data, { where: { id } });
    },
    getBypwd(user_name: string, pwd: string) {
        return User.findOne({
            where: { user_name, pwd },
            attributes: ["id", "nickname", "user_name", "role", "headimg", "updatedAt"],
        });
    },
    check(user_name: string, pwd: string) {
        return User.count({
            where: { user_name, pwd },
        });
    },
    getlist(PageIndex: number, PageSize = 20) {
        let where = {};
        return User.findAndCountAll({
            order: [["id", "desc"]],
            offset: PageIndex * PageSize,
            limit: PageSize,
            attributes: ["id", "nickname", "user_name", "role", "headimg", "updatedAt"],
            where,
        });
    },
};
