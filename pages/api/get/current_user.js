import { authenticated } from '../../../middleware/authApi';
import Users from '../../../models/users.models'
import UsersSettings from '../../../models/users_settings.model';


export default authenticated(async function getCurrentUser(req, res) {
    try {
        const { nim } = req.query

        if (!nim) res.status(500).json({ erros: "Parameter 'nim' is required!" })

        const data = req.headers.cookie ? (JSON.parse(atob(req.headers.cookie?.split("=").pop().split('.')[1]))) : {}

        Users.belongsTo(UsersSettings, {
            foreignKey: 'nim'
        });

        const currentSettings = await UsersSettings.findAll({
            where: {
                nim: data.nim
            },
        });

        const setings = await UsersSettings.findAll({
            where: {
                nim: nim
            },
        });
        
        const users = await Users.findAll({
            where: {
                nim: nim
            },
            attributes: ["email", "alamat", "foto", "fullname", "nim", "nohp", "updatedAt", "createdAt", "status", "username"],
            include: [{
                model: UsersSettings,
                attributes: ["id_roles", "user_active"]
            }]
        });

        
        console.log(users[0]?.dataValues)
        let usr_setting = users[0]?.dataValues.user_setting.dataValues
        let roles = currentSettings[0]?.dataValues.id_roles
        // if (users.user_setting.user_active === 0)  res.status(401).json({ erros: "You have been banned" });
        if (users.length === 0) return res.status(404).json({ message: "Page Not Found" });
        if (usr_setting.user_active === 0 && roles === 2) return res.status(500).json({ message: "This account has been suspended." });
        if (data.nim !== parseInt(nim) && roles === 2) return res.status(500).json({ message: "User Not Found" });
        
        res.status(200).json({
            results: users[0]
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({ message: error.message })

    }

})