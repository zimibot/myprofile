import formidable from "formidable";
import fs from "fs"
import Users from "../../../models/users.models";
import UsersSettings from "../../../models/users_settings.model";
import * as bcrypt from 'bcrypt';
import { validateEmail } from "../../../lib/error";
import { authenticated } from "../../../middleware/authApi";

export const config = {
    api: {
        bodyParser: false
    }
};



const saveFile = async (file, res) => {
    if (!file) return "/default.jpg";

    let path = `./public/uploads/${file.originalFilename}`
    let currentFoto = `/uploads/${file.originalFilename}`
    const data = fs.readFileSync(file.filepath);
    fs.writeFileSync(path, data);
    await fs.unlinkSync(file.filepath);

    return currentFoto
};


const EditProfile = async (req, res) => {
    try {
        if (req.method === 'PUT') {
            Users.belongsTo(UsersSettings, {
                foreignKey: 'nim'
            });


            const form = new formidable.IncomingForm();
            form.parse(req, async function (err, fields, files) {
                if (err) console.log(err);

                let data_foto = files.foto
                let d = fields
                d = {
                    nim: d.nim,
                    fullname: d.fullname,
                    username: d.username,
                    email: d.email,
                    nohp: d.nohp,
                    status: d.status,
                    password: d.password,
                    repassword: d.repassword,
                    alamat: d.alamat,
                    fb: d.fb,
                    twit: d.twit,
                    instagram: d.instagram,
                    updatedAt: d.updatedAt,
                    createdAt: d.createdAt,
                    id_roles: d.id_roles,
                    user_active: d.user_active,
                    job: d.job
                }
                
                let user = await Users.findAll({
                    where: { nim: d.nim },
                    attributes: ['password'],
                    distinct: true,
                })

                const match = await bcrypt.compare(d.password, user[0].dataValues.password);
                if (!d.password) return res.status(500).send({ code: 500, message: "Password is required!" });
                if (!validateEmail(d.email)) res.status(500).send({ code: 500, message: "Email does not match" });
                if (!match) return res.status(500).json({ message: "Your Password is Wrong", path: "password" });



                if (data_foto !== undefined) {
                    if (data_foto.mimetype === "image/png" || data_foto.mimetype === "image/jpeg") {
                        let foto = await saveFile(data_foto, res);
                        d = {
                            ...d,
                            foto
                        }
                    } else {
                        res.status(500).json({ message: "Upload file only jpg or png", path: "foto" })
                    }
                }

                const hash = await bcrypt.hash(d.password, 12);

                d = {
                    ...d,
                    password: hash,
                }

                let data = {
                    user_active: d.user_active,
                    id_roles: d.id_roles
                }

                await Users.update(d, {
                    where: { nim: d.nim },
                    returning: true,
                    plain: true
                })
                await UsersSettings.update(data, {
                    where: { nim: d.nim },
                    returning: true,
                    plain: true
                })
                res.status(200).json({ message: 'ok' });

            });


        } else {
            res.status(405).send({ code: 405, message: 'Only Method PUT requests allowed' })
        };
    } catch (error) {
        res.status(500).json({ message: error });
    }
}

export default authenticated(EditProfile)