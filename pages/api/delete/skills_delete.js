import { authenticated } from "../../../middleware/authApi";
import UserSkills from "../../../models/users_skills.model";


const skillDelete = async (req, res) => {

    try {
        if (req.method === 'DELETE') {

            let { id } = req.query

            await UserSkills.destroy({
                where: {
                    id: parseInt(id)
                },
            })


            res.status(200).json({ message: "Delete Success" });
        } else {
            res.status(405).send({ code: 405, message: `Only Method ${req.method} requests allowed` })
        };
    } catch (error) {
        res.status(500).json({ message: error, });
    }
}

export default authenticated(skillDelete)