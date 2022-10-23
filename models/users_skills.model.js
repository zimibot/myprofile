import { Sequelize } from "sequelize";
import db from "../db/mysql";

const { DataTypes } = Sequelize;

const UserSkills = db.define('users_skills', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    nim: {
        type: DataTypes.INTEGER(22),
    },
    nama: {
        type: DataTypes.STRING,
    },
    nilai: {
        type: DataTypes.INTEGER,
    },

}, {
    freezeTableName: true
});

(async () => {
    await db.sync();
})();

export default UserSkills;