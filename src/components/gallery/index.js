import { useState } from "react";
import Zoom from 'react-medium-image-zoom'
import { Paggination } from "../paggination";


export const Gallery = ({ name, itemGallery = [], attribute = [], totalPages = 2, page, initialPage }) => {
    const [state, setstate] = useState();

    var newArray = itemGallery.filter(function (el) {
        return state ? el.nim === state : true
    });

    return (
        <div className="flex flex-col w-full h-full left-0 top-0 p-6">
            {!name && <>
                <div className="flex justify-center border-b border-[#111]">
                    <div className="text-[40px] font-bold">
                        <span className="text-rose-600">GALLERY</span>
                    </div>
                </div>
                <div className="p-4 flex gap-2">
                    <a className="bg-white shadow p-2 hover:bg-red-600 hover:text-white rounded cursor-pointer" onClick={() => setstate(null)}>All</a>
                    {attribute.map(d => {
                        return <a key={d.nim} className="bg-white shadow p-2 hover:bg-red-600 hover:text-white rounded cursor-pointer" onClick={() => setstate(d.nim)}>{d.fullname}</a>

                    })}

                </div>
            </>
            }
            <div className="overflow-auto flex-1 zoomable space-y-4">

                {newArray.length !== 0 ?
                    <div className="grid grid-cols-4 gap-3 p-4">
                        {
                            newArray.map((d, k) => {
                                return (
                                    <div key={k} className="scale-in">
                                        <Zoom>
                                            <div className="w-full h-full ">
                                                <img className="bg-white shadow border h-56 w-full object-cover object-center" src={d.users_gallery}  ></img>
                                            </div>
                                        </Zoom>
                                    </div>
                                )
                            })
                        }
                    </div>
                    : <div className=" bg-white p-3 shadow text-center">
                        Gallery Not Found
                    </div>
                }
                <Paggination pageCount={totalPages} pageNext={page} initialPage={initialPage}></Paggination>
            </div>
        </div>
    )
}