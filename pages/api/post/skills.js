import { authenticated } from "../../../middleware/authApi";
import UserSkills from "../../../models/users_skills.model";

const userSkills = async (req, res) => {
    try {
        if (req.method === 'POST') {
            let { nim, nama, nilai } = req.body

            if (!nim) res.status(405).json({ message: "nim is required!" });
            if (!nilai) res.status(405).json({ message: "nilai is required!" });
            if (!nama) res.status(405).json({ message: "nama is required!" });

            await UserSkills.create({ nim, nama, nilai })

            res.status(200).json({ message: `Add skill success`, nama });
        }
    } catch (error) {
        res.status(500).json({ message: error });
    }
}

export default authenticated(userSkills)