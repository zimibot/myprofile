import fs from "fs"
import getConfig from "next/config";
import path from "path";
import serverPath from "../../../lib/pathUrl";
import { authenticated } from "../../../middleware/authApi";
import GalleryModel from "../../../models/gallery.model";


const GalleryDelt = async (req, res) => {

    try {
        if (req.method === 'DELETE') {

            let { url, id } = req.query

             await GalleryModel.destroy({
                where: {
                    id
                },
            })


            await fs.unlinkSync(serverPath(`/public/${url}`));

            res.status(200).json({ message: "Delete Success", img: url.split("/").pop() });
        } else {
            res.status(405).send({ code: 405, message: `Only Method ${req.method} requests allowed` })
        };
    } catch (error) {
        res.status(500).json({ message: error, });
    }
}

export default authenticated(GalleryDelt)