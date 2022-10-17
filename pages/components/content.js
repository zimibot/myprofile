export const Content = () => {
    return (
        <div className="w-full h-full fixed top-0 left-0 flex justify-between bg-black bg-opacity-40 backdrop-blur-sm">
            <div></div>
            <div className="w-4/5 h-full bg-[#111] text-[rgb(170,170,170)] p-10">
                <div className="text-3xl flex justify-end items-center ">
                    <button className="bg-red-500 p-3 text-lg font-bold text-white rounded-md">
                        CLOSE
                    </button>
                </div>
                <div className="flex">
                    <div>
                        ABOUT ME
                    </div>
                </div>
            </div>
        </div>
    )
}