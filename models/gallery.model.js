import { Sequelize } from "sequelize";
import db from "../db/mysql";

const { DataTypes } = Sequelize;

const GalleryModel = db.define('users_gallery', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    nim: {
        type: DataTypes.INTEGER(20),
    },
    url: {
        type: DataTypes.STRING,
    },

}, {
    freezeTableName: true
});

(async () => {
    await db.sync();
})();

export default GalleryModel;