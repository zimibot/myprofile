import Users from '../../../../models/users.models'
import GalleryModel from '../../../../models/gallery.model'

function getUniqueListBy(arr, key) {
    return [...new Map(arr.map(item => [item[key], item])).values()]
}




export default async function getGallery(req, res) {
    try {
        Users.belongsTo(GalleryModel, {
            foreignKey: "nim",
            targetKey: "nim",
        });


        let { nim, page, limit } = req.query

        let nt = parseInt(page) * parseInt(limit)


        let where = req.query.nim ? {
            nim: nim
        } : {}


        let data = await Users.findAndCountAll({
            attributes: ["fullname", "nim"],
            offset: nt,
            limit: parseInt(limit),
            where,
            include: [{
                model: GalleryModel,
                attributes: ["url", "id"],
            }],

        })


        let s = data.rows.map(d => {
            return {
                ...d
            }
        })

        let item = s.map(d => {
            return {
                ...d.dataValues,
                users_gallery: d.dataValues.users_gallery?.url,
                id: d.dataValues.users_gallery?.id,
                width: 1
            }

        })

        item = item.filter(d => d.users_gallery)


        let fullname = getUniqueListBy(item, "nim")

        const { count: totalItems } = data;
        const totalPages = Math.ceil(totalItems / limit);

        res.status(200).json({
            results: item,
            currentPage: parseInt(page),
            limit: parseInt(limit),
            total: item.length === 0 && data.count === 1 ? 0 : data.count,
            totalPages,
            attributes: fullname.map(d => {
                return {
                    fullname: d.fullname,
                    nim: d.nim
                }
            })
        })

    } catch (error) {
        res.status(500).json({ message: error.message, })
    }

}