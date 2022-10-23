import { authenticated } from "../../../../middleware/authApi";
import UserSkills from "../../../../models/users_skills.model";

const getSkills = async (req, res) => {
    try {
        if (req.method === "GET") {
            const { nim } = req.query
            const skill = await UserSkills.findAll({
                attributes: ['nim', 'nilai', 'nama', 'id'],
                where: {
                    nim
                }
            })

            res.status(200).json({
                results: skill
            })

        } else {
            res.status(405).json({
                message: `not allowed method ${req.method}`
            })
        }
    } catch (error) {
        res.status(500).json({
            message: error
        })
    }
}

export default authenticated(getSkills)