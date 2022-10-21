import { authenticated } from "../../../middleware/authApi";
import GalleryModel from "../../../models/gallery.model";
import Users from "../../../models/users.models";


const UserDelete = async (req, res) => {

    try {
        if (req.method === 'DELETE') {

            let { nim, email, url } = req.query
            // await Users.destroy({
            //     where: {
            //         nim
            //     },
            // })

            // await GalleryModel.destroy({
            //     where: {
            //         nim
            //     },

            // })

            const gallery = await GalleryModel.findAll({
                where: {
                    nim
                }
            })


            if (url !== "/default.jpg") {
                await fs.unlinkSync(serverPath(`/public/${url}`));
            }

            res.status(200).json({ message: `Delete User Success`, email });
        } else {
            res.status(405).send({ code: 405, message: `Only Method ${req.method} requests allowed` })
        };
    } catch (error) {
        res.status(500).json({ message: error });
    }
}

export default authenticated(UserDelete)