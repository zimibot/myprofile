import { useState } from "react";
import { XMasonry, XBlock } from "react-xmasonry"; // Imports precompiled bundle
import Zoom from 'react-medium-image-zoom'


export const Gallery = ({ name }) => {
    const [state, setstate] = useState();
    const itemGallery = [
        {
            id: 0,
            name: "harris",
            src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTCMWEKG0RjDQDxuVwgxXyCqD8gmjGxZJPWvQ&usqp=CAU",
            width: 1,
        },
        {
            id: 1,
            name: "harris",
            src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTCMWEKG0RjDQDxuVwgxXyCqD8gmjGxZJPWvQ&usqp=CAU",
            width: 1,
        },
        {
            id: 2,
            name: "rosalina",
            src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTOZq6Ikby8Mh3BxJQKtwARw2Kz8CY1UEdkYg&usqp=CAU",
            width: 1,
        },
        {
            id: 3,
            name: "rosalina",
            src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTOZq6Ikby8Mh3BxJQKtwARw2Kz8CY1UEdkYg&usqp=CAU",
            width: 1,
        },
        {
            id: 4,
            name: "rosalina",
            src: "https://dailyspin.id/wp-content/uploads/2021/11/walpaper-ff-2.jpg",
            width: 1,
        },
        {
            id: 5,
            name: "rosalina",
            src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTOZq6Ikby8Mh3BxJQKtwARw2Kz8CY1UEdkYg&usqp=CAU",
            width: 1,
        },
        {
            id: 6,
            name: "rojak",
            src: "https://dailyspin.id/wp-content/uploads/2021/11/walpaper-ff-2.jpg",
            width: 1,
        },
    ]

    var newArray = itemGallery.filter(function (el) {
        return state ? el.name === state : true
    });

    return (
        <div className="flex flex-col w-full h-full absolute left-0 top-0 p-6">
            {!name && <>
                <div className="flex justify-center border-b border-[#111]">
                    <div className="text-[40px] font-bold">
                        <span className="text-rose-600">GALLERY</span>
                    </div>
                </div>
                <div className="p-4 flex gap-2">
                    <a className="bg-white shadow p-2 hover:bg-red-600 hover:text-white rounded cursor-pointer" onClick={() => setstate(null)}>All</a>
                    <a className="bg-white shadow p-2 hover:bg-red-600 hover:text-white rounded cursor-pointer" onClick={() => setstate("harris")}>Harris Munahar</a>
                    <a className="bg-white shadow p-2 hover:bg-red-600 hover:text-white rounded cursor-pointer" onClick={() => setstate("rosalina")}>Rosalina</a>
                    <a className="bg-white shadow p-2 hover:bg-red-600 hover:text-white rounded cursor-pointer" onClick={() => setstate("rojak")}>Rojak</a>
                </div>
            </>
            }
            <div className="overflow-auto flex-1 zoomable">
                <XMasonry>
                    {
                        newArray.map(d => {
                            return (
                                <XBlock key={d.id} width={d.width}>
                                    <div className="card">
                                        <Zoom>
                                            <img src={d.src} className="w-full " />
                                        </Zoom>
                                    </div>
                                </XBlock>
                            )
                        })
                    }
                </XMasonry>
            </div>
        </div>
    )
}