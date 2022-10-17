import { Sequelize } from "sequelize";
import db from "../db/mysql";

const { DataTypes } = Sequelize;

const UsersSettings = db.define('user_settings', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        unique: true,
        
    },
    nim: {
        type: DataTypes.INTEGER(20),
        primaryKey: true,
    },
    id_roles: {
        type: DataTypes.INTEGER(1),
        field: 'id_roles'
    },
    user_active: {
        type: DataTypes.INTEGER,
        field: 'user_active'

    },
}, {
    freezeTableName: true
});

(async () => {
    await db.sync();
})();

export default UsersSettings;