import { useState } from "react"
import { dataUser } from "../../../../../../src/client_api/get"
import SettingsLayout from "../../../../../../src/components/layout/settings"
import { Paggination } from "../../../../../../src/components/paggination"


const SettingsProfile = () => {

    const [page, setPage] = useState(0)
    const [Search, setSearch] = useState("")

    const paggination = (count) => {
        setPage(count.selected)
    }
    const { data } = dataUser({ next: page, limit: 6, search: Search })


    let current_page = data?.data?.results.current_page
    let count = data?.data?.results.count

    let totalPages = data?.data.results.totalPages
    return <SettingsLayout title="#List Data Profile" classContent=" flex flex-col gap-6" >
        <div className="flex gap-1 justify-between">
            <div className="flex items-center">
                <div className="relative w-full">
                    <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                        <svg aria-hidden="true" className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd"></path></svg>
                    </div>
                    <input type="text" onChange={d => setSearch(d.target.value)} id="simple-search" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search Fullname" />
                </div>
            </div>
            <div className="bg-white py-2 px-3 shadow"> Total Count : {count} Data </div>
        </div>
        <div className="overflow-x-auto relative shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="py-3 px-6">
                            Foto
                        </th>
                        <th scope="col" className="py-3 px-6">
                            Nim
                        </th>
                        <th scope="col" className="py-3 px-6">
                            Fullname
                        </th>
                        <th scope="col" className="py-3 px-6">
                            Email
                        </th>
                        <th scope="col" className="py-3 px-6 text-center">
                            Status
                        </th>
                        <th scope="col" className="py-3 px-6">
                            Nomor HP
                        </th>
                        <th scope="col" className="py-3 px-6">
                            Alamat
                        </th>
                        <th scope="col" className="py-3 px-6 text-center">
                            Role User
                        </th>
                        <th scope="col" className="py-3 px-6 text-center">
                            User Active
                        </th>
                        <th scope="col" className="py-3 px-6">
                            Action
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <Rows rows={data} search={Search}/>
                </tbody>
            </table>
        </div>
            {count > 0 &&
            <div className="flex justify-between">
                <Paggination pageNext={paggination} pageCount={totalPages} />
                <div className="flex gap-1">
                    <div className="bg-white py-2 px-3 shadow">{current_page + 1} Pages</div>
                    <div className="bg-white py-2 px-3 shadow">of</div>
                    <div className="bg-white py-2 px-3 shadow"> Total {totalPages} Pages </div>
                </div>
            </div>
            }
    </SettingsLayout >
}

export const Rows = ({ rows, search = "" }) => {
    if (!rows) return <tr className="w-full p-6 text-center" >
        <td colSpan={100}>
            <div className="p-4 flex justify-center w-full">Loading....</div>
        </td>
    </tr>;
    if (rows.data.results.count === 0) {
      return  <tr className="w-full p-6 text-center" >
            <td colSpan={100}>
                <div className="p-4 flex justify-center w-full">Search <b>'{search}'</b> not found</div>
            </td>
        </tr>
    }
    rows = rows.data.results.rows
    return rows.map(d => {
        return (
            <tr className="bg-white border-b dark:bg-gray-900 dark:border-gray-700" key={d.nim}>
                <td width={130} className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white relative" >
                    <div className="relative">
                        <img src={d.foto} className="w-14 h-14 object-cover rounded shadow p-1 bg-slate-100" />
                    </div>
                </td>
                <td className="py-4 px-6">
                    {d.nim}
                </td>
                <td className="py-4 px-6">
                    {d.fullname}
                </td>
                <td className="py-4 px-6">
                    {d.email}
                </td>
                <td className="py-4 px-6 text-center">
                    {d.status}
                </td>
                <td className="py-4 px-6">
                    {d.nohp}
                </td>
                <td className="py-4 px-6">
                    {d.alamat}
                </td>
                <td className="py-4 px-6 text-center">
                    {d.user_setting?.id_roles === 1 ? <span className="text-blue-500 font-bold">ADMIN</span> : <span className="text-gray-500 font-bold">MEMBER</span>}
                </td>
                <td className="py-4 px-6 text-center">
                    {d.user_setting?.user_active === 1 ? <span className="text-green-500 font-bold">ACTIVE</span> : <span className="text-red-500 font-bold">DEACTIVE</span>}
                </td>
                <td className="py-4 px-6">
                    <div className="flex gap-4">
                        <a href={`/views/items/settings/member/profile/${d.nim}`} className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
                        <a href="#" className="font-medium text-red-600 dark:text-red-500 hover:underline">Delete</a>
                    </div>
                </td>
            </tr>
        )
    })
}

export default SettingsProfile