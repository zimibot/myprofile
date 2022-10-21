
import { authenticated } from "../../../middleware/authApi";
import UsersSettings from "../../../models/users_settings.model";




const EditProfile = async (req, res) => {
    try {
        if (req.method === 'PUT') {
            await UsersSettings.update(req.body, {
                where: { nim: req.body.nim },
                returning: true,
                plain: true
            })
            res.status(200).send({ code: 200, message: 'Update success' })
        } else {
            res.status(405).send({ code: 405, message: 'Only Method PUT requests allowed' })
        };


    } catch (error) {
        console.log(error)
        res.status(500).json({ message: error });
    }
}

export default authenticated(EditProfile)