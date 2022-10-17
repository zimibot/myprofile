import { Sequelize } from "sequelize";

const db = new Sequelize('tugas', 'root', '', {
    host: "localhost",
    dialect: "mysql"
});

export default db;