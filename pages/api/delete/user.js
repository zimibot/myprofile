import { authenticated } from "../../../middleware/authApi";
import GalleryModel from "../../../models/gallery.model";
import Users from "../../../models/users.models";
import fs from "fs"
import UsersSettings from "../../../models/users_settings.model";
import UserSkills from "../../../models/users_skills.model";
import serverPath from "../../../lib/pathUrl";


const UserDelete = async (req, res) => {

    try {
        if (req.method === 'DELETE') {

            let { nim, email, url } = req.query

            await GalleryModel.destroy({
                where: {
                    nim
                },
            })

            await UsersSettings.destroy({
                where: {
                    nim: nim
                },
            })
            
            await UserSkills.destroy({
                where: {
                    nim: nim
                },
            })

            await Users.destroy({
                where: {
                    nim: nim
                },
            })

            const gallery = await GalleryModel.findAll({
                raw: true,
                where: {
                    nim
                }
            })
            gallery.map(async (d) => {
                if (fs.existsSync(serverPath(`/public/${d.url}`))) {
                    return await fs.unlinkSync(serverPath(`/public/${d.url}`));
                }
            })

            if (url !== "/default.jpg") {
                await fs.unlinkSync(serverPath(`/public/${url}`));
            }

            res.status(200).json({ message: `Delete User Success`, email});
        } else {
            res.status(405).send({ code: 405, message: `Only Method ${req.method} requests allowed` })
        };
    } catch (error) {
        res.status(500).json({ message: error });
    }
}

export default authenticated(UserDelete)