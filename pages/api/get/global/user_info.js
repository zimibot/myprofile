import Users from "../../../../models/users.models"
import UserSkills from "../../../../models/users_skills.model"

const userInfo = async (req, res) => {
    try {
        if (req.method === "GET") {
            Users.hasMany(UserSkills, {
                foreignKey: "nim",
            })
            const users = await Users.findAndCountAll({
                attributes: ["id", "nim", "fullname", "twit", "instagram", "fb", "email", "alamat", "status", "nohp", "foto"],
                order: [
                    ['id', 'ASC'],
                ],
                include: [{
                    model: UserSkills,
                    attributes: ["id", "nama", "nilai"],
                }]
            })

            let attributes = await Users.findAll({
                attributes: ["id", "nim", "fullname", "foto", "job"],
                order: [
                    ['id', 'ASC'],
                ],
            })

            res.status(200).json({
                results: users,
                attributes
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

export default userInfo