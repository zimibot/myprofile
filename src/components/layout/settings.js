import { Navbar } from "../navbar"
import Breadcrumbs from 'nextjs-breadcrumbs';
import Head from "next/head";

const SettingsLayout = ({ title, children, classContent = "", roles }) => {

    return <div className="h-screen flex flex-col">
          <Head>
            <title>{title}</title>
        </Head>
        <Navbar />
        <div className="px-4 py-16 bg-black bg-opacity-50 backdrop-blur text-white flex">
            <div className="container m-auto">
                <h1 className="text-4xl font-bold">
                    {title}
                </h1>
            </div>
        </div>
        <div className="w-full bg-slate-100 flex-1 p-4 flex flex-col">
            <div className={`container m-auto p-4 rounded flex-1 flex flex-col ${classContent} space-y-4`}>
                <div className="flex items-center gap-4">
                    <Breadcrumbs inactiveItemClassName=" bg-white p-2 text-sm " listClassName="flex gap-3" activeItemClassName="bg-green-500 text-white text-sm  p-2" transformLabel={(data) => {
                        return <div>{data}</div>
                    }} useDefaultStyle={false} rootLabel="Home" />
                </div>
                <div className="scale-in flex flex-col gap-4 flex-1">
                    {children}
                </div>
            </div>
        </div>
    </div>

}

export default SettingsLayout