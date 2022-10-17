import uniqid from 'uniqid';
import { isEmptyObject, validateEmail } from '../../../lib/error'
import Users from '../../../models/users.models';
import * as bcrypt from 'bcrypt';
import UsersSettings from '../../../models/users_settings.model';

export default async function handler(req, res) {
    try {

        let data = req.body

        if (req.method === 'POST') {
            if (isEmptyObject(data)) res.status(405).send({ code: 500, message: "Parameter is not defined" });
            if (!data.fullname) res.status(500).send({ code: 500, message: "Fullname is required!" });
            if (!data.password) res.status(500).send({ code: 500, message: "Password is required!" });
            if (!data.username) res.status(500).send({ code: 500, message: "Username is required!" });
            if (!data.email) res.status(500).send({ code: 500, message: "email is required!" });
            if (!data.nim) res.status(500).send({ code: 500, message: "Nim is required!" });
            if (`${data.nim}`.length < 6    ) res.status(500).send({ code: 500, message: "NIM Can't Be Less Than 6   Characters", path: "nim" });
            if (`${data.password}`.length < 4) res.status(500).send({ code: 500, message: "Password Can't Be Less Than 4 Characters", path: "password" });
            if (`${data.username}`.length < 4) res.status(500).send({ code: 500, message: "Username Can't Be Less Than 4 Characters", path: "username" });
            if (`${data.fullname}`.length < 4) res.status(500).send({ code: 500, message: "Fullname Can't Be Less Than 6 Characters", path: "fullname" });
            if (!validateEmail(data.email)) res.status(500).send({ code: 500, message: "Email does not match", path: "email" });

            const hash = await bcrypt.hash(data.password, 12);

            data = {
                ...data,
                foto: "/default.jpg",
                password: hash
            }

            let settingsData = {
                nim: data.nim,  
            }

            await Users.create(data);
            await UsersSettings.create(settingsData);


            res.status(200).json({
                result: {
                    success: {
                        code: 200,
                        message: "Register Berhasil"
                    }
                }
            })

        } else {
            res.status(405).send({ code: 405, message: 'Only POST requests allowed' })
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({
            code: 500,
            message: !error.errors ? error.message : {
                ...error.errors.map(d => ({
                    ...d,
                    instance: null
                }))
            }
        })
    }
}

