import formidable from "formidable";
import fs from "fs"
import { authenticated } from "../../../middleware/authApi";
import GalleryModel from "../../../models/gallery.model";


export const config = {
    api: {
        bodyParser: false
    }
};


const saveFile = async (file, res) => {
    if (!file) return "/default.jpg";
    let path = `./public/uploads/gallery/${file.originalFilename}`
    let currentFoto = `/uploads/gallery/${file.originalFilename}`
    const data = fs.readFileSync(file.filepath);
    fs.writeFileSync(path, data);
    await fs.unlinkSync(file.filepath);

    return currentFoto
};

const Gallery = async (req, res) => {

    try {
        if (req.method === 'POST') {
            const form = new formidable.IncomingForm();
            form.parse(req, async function (err, fields, files) {

                let data_foto = files.foto

                console.log(fields)

                if (data_foto?.mimetype === "image/png" || data_foto?.mimetype === "image/jpeg") {

                    let foto = await saveFile(data_foto, res);

                    let create = {
                        ...fields,
                        url: foto
                    }

                    GalleryModel.create(create)

                    res.status(200).json({ message: 'Gallery Upload Success' });
                } else {
                    res.status(500).json({ message: "Upload file only jpg or png", path: "foto" })
                }

            });


        } else {
            res.status(405).send({ code: 405, message: 'Only Method POST requests allowed' })
        };
    } catch (error) {
        res.status(500).json({ message: error });
    }
}

export default authenticated(Gallery)