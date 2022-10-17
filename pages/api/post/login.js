import Users from "../../../models/users.models";
import * as bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";
import { validateEmail } from "../../../lib/error";
import UsersSettings from "../../../models/users_settings.model";


const Login = async (req, res) => {
    try {
        if (req.method === 'POST') {

            Users.belongsTo(UsersSettings, {
                foreignKey: 'nim',
            });


            let user = await Users.findAll({
                where: {
                    email: req.body.email
                },
                include: [{
                    model: UsersSettings,
                    attributes: ['id_roles', 'user_active']
                }]
            });

            console.log(user)


            user = user[0].dataValues
            const match = await bcrypt.compare(req.body.password, user.password);

            if (!req.body.password) return res.status(500).send({ code: 500, message: "Password is required!" });
            if (!validateEmail(req.body.email)) res.status(500).send({ code: 500, message: "Email does not match" });
            if (!match) return res.status(500).json({ message: "Your Password is Wrong", path: "password" });

            const nim = user.nim;
            const email = user.email;
            const roles = user.user_setting.id_roles
            const user_active = user.user_setting.user_active
            if (!user_active) {
                res.status(500).json({ message: `User "${email}" has been banned permanent`, path: "email" });
            }
            const accessToken = jwt.sign({ nim, roles }, process.env.ACCESS_TOKEN_SECRET, {
                expiresIn: '1d'
            });

            res.json({ accessToken, roles, nim });

        } else {
            res.status(405).send({ code: 405, message: 'Only Method POST requests allowed' })
        };


    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "E-mail address is not registered", path: "email" });
    }
}

export default Login