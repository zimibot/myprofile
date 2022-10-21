import { Gallery } from "../../../../../../src/components/gallery"
import { Input } from "../../../../../../src/components/input"
import SettingsLayout from "../../../../../../src/components/layout/settings"
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import axios from "axios";
import { getCookie } from "cookies-next";
import { gallery, verify } from "../../../../../../src/client_api/get";
import { useState } from "react";

const GalleryRoute = () => {
    const { register } = useForm()

    const token = getCookie("token")
    const nimUser = verify()
    const [page, setpage] = useState(0);
    const { data, mutate } = gallery({ nim: nimUser.data?.data.nim, page: page, limit: 8 })
    const pageNext = (d) => {
        setpage(d.selected)
    }
    const uploads = async (d) => {
        try {
            if (d.target.files) {
                let files = d.target.files
                let form = new FormData()
                form.append("foto", files[0])
                form.append("nim", nimUser.data.data.nim)
                await toast.promise(
                    axios.post("/api/post/gallery", form, {
                        headers: {
                            "Authorization": token
                        }
                    }),
                    {
                        pending: "Upload Pending",
                        error: {
                            render: ({ data }) => {
                                return data.response.data.message
                            }
                        },
                        success: {
                            render: ({ data }) => {
                                mutate()
                                return <div>Upload <b className="text-cyan-500">{data.data.name}</b> success</div>
                            }
                        }
                    }
                )
            }
        } catch (error) {
            console.log(error)
        }




    }
    return <SettingsLayout>
        <div className="relative flex overflow-hidden justify-end">
            <label htmlFor="foto">
                <Input accept="image/*" className="opacity-0 absolute top-0 left-0 cursor-pointer" register={register("foto", {
                    onChange: (d) => uploads(d)
                })} type="file" name="foto"></Input>
                <div className="bg-slate-200 p-3 cursor-pointer hover:bg-blue-400 hover:text-white relative" id="foto">UPLOAD YOUR PHOTO</div>
            </label>
        </div>
        <div className="relative flex flex-col flex-1">
            {data ?
                <>
                    <Gallery name="user" mutate={mutate} animation={"scale-in"} itemGallery={data.results} totalPages={data.totalPages} page={pageNext} initialPage={page}></Gallery>
                </>
                : <div className="w-full p-4 text-center">Loading</div>
            }
        </div>
    </SettingsLayout>
}

export default GalleryRoute