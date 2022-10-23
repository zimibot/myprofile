import axios from "axios";
import { useState } from "react";
import Zoom from 'react-medium-image-zoom'
import { toast } from "react-toastify";
import { Paggination } from "../paggination";
import { getCookie } from "cookies-next";


export const Gallery = ({ name, itemGallery = [], attribute = [], totalPages = 2, page, initialPage, mutate, total = 0 }) => {
    const [state, setstate] = useState();

    var newArray = itemGallery.filter(function (el) {
        return state ? el.nim === state : true
    });

    const token = getCookie("token")


    const onDelete = async (url, id) => {

        try {
            await toast.promise(axios.delete(`/api/delete/gallery_delete?url=${url}&id=${id}`, {
                headers: {
                    "Authorization": token
                }
            }), {
                pending: "Delete Pending",
                error: "Delete Error",
                success: {
                    render: () => {
                        mutate()
                        return "Success Delete"
                    }
                }
            })
        } catch (error) {

        }

    }

    return (
        <div className="flex flex-col top-0 p-6 flex-1 ">
            {!name && <>
                <div className="flex justify-center border-b border-[#111]">
                    <div className="text-[40px] font-bold">
                        <span className="text-rose-600">GALLERY</span>
                    </div>
                </div>

            </>
            }
            {total !== 0 ?
                <div className="flex flex-col flex-1">
                    <div className="flex-1 flex-wrap overflow-auto relative">
                        <div className={`h-full left-0 top-0 ${name ? "" : "absolute"}`}>
                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-3 p-4">
                                {
                                    newArray.map((d, k) => {
                                        return (
                                            <div key={k} className="scale-in relative">
                                                <div className="w-full h-full">
                                                    {name &&
                                                        <button className=" bg-red-500 text-white p-2 absolute top-0 right-0 m-2 text-xs rounded" onClick={() => onDelete(d.users_gallery, d.id)}>
                                                            DELETE
                                                        </button>
                                                    }
                                                    <Zoom a11yNameButtonZoom={d.users_gallery.split("/").pop()}>
                                                        <img className="bg-white shadow border h-56 w-full object-cover object-center" src={d.users_gallery}  ></img>
                                                    </Zoom>
                                                    <div className="absolute bottom-0 p-3 bg-black text-white text-xs backdrop-blur w-full text-center bg-opacity-60">
                                                        <div className="text-ellipsis overflow-hidden">
                                                            {d.users_gallery.split("/").pop()}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div>
                    </div>
                    <div className="px-4 py-4">
                        <Paggination pageCount={totalPages} pageNext={page} initialPage={initialPage}></Paggination>
                    </div>
                </div>
                : <div className=" bg-white p-3 shadow text-center">
                    Gallery Not Found
                </div>
            }
        </div>
    )
}