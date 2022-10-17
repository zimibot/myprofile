import { Sequelize } from "sequelize";
import db from "../db/mysql";

const { DataTypes } = Sequelize;

const Users = db.define('users', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        unique: true

    },
    nim: {
        type: DataTypes.INTEGER(20),
        primaryKey: true,
    },
    username: {
        type: DataTypes.STRING
    },
    fullname: {
        type: DataTypes.STRING
    },
    email: {
        type: DataTypes.STRING
    },
    password: {
        type: DataTypes.STRING
    },
    alamat: {
        type: DataTypes.STRING
    },
    status: {
        type: DataTypes.STRING
    },
    foto: {
        type: DataTypes.STRING
    },
    nohp: {
        type: DataTypes.INTEGER
    },
    refresh_token: {
        type: DataTypes.TEXT
    }
}, {
    freezeTableName: true
});

(async () => {
    await db.sync();
})();

export default Users;