import { authenticated } from '../../../middleware/authApi';
import Users from '../../../models/users.models'
import UsersSettings from '../../../models/users_settings.model';
import { Sequelize } from "sequelize";


export default authenticated(async function getUser(req, res) {
    try {
        const { next, limit, search } = req.query
        let s = search.toLowerCase();

        if (!next && !limit) res.status(500).json({ erros: "Body data 'next' and 'limit' is required!" })

        Users.belongsTo(UsersSettings, {
            foreignKey: 'nim'
        });


        let where = search?.length > 0 ? {
            where: {
                fullname: Sequelize.where(Sequelize.fn('LOWER', Sequelize.col('fullname')), 'LIKE', '%' + s + '%')
            }
        } : {}

        let nt = parseInt(next) * parseInt(limit)

        const users = await Users.findAndCountAll({
            offset: nt,
            limit: parseInt(limit),
            ...where,
            order: [
                ['nim', 'DESC'],
            ],
            distinct: true,
            include: [{
                model: UsersSettings,
                attributes: ["id_roles", "user_active"]
            }]
        });


        const { count: totalItems } = users;
        const totalPages = Math.ceil(totalItems / limit);

        let data = {
            ...users,
            isdata: users.rows.length > 0,
            current_page: parseInt(next),
            totalPages
        }


        res.status(200).json({
            results: data
        })

    } catch (error) {
        res.status(500).json({ message: message.message })

    }

})