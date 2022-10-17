import { removeCookies } from 'cookies-next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { currentUser } from '../client_api/get';

export const Navbar = () => {
    const [isActive, setIsActive] = useState(false)
    const routes = useRouter()
    let user = currentUser({nim: routes.query.index})
    if (!user.data) {
        return ""
    }
    
    let foto = user.data.data.results.foto
    let name = user.data.data.results.fullname

    const logout = () => {
        removeCookies("token")
        window.document.getElementsByTagName("body")[0].remove()
        window.location.href = "/views/items/login"
    }
    return (
        <nav className="bg-white border-gray-200 px-2 sm:px-4 py-2.5 sticky top-0 z-20 dark:bg-gray-900 items-center text-gray-700  md:text-sm md:font-medium gap-4 flex justify-center">
            <div className="container flex items-center">
                <div className=" flex-1 flex flex-wrap justify-between items-center mx-auto">
                    <a href="/" className="flex items-center">
                        <img src="https://flowbite.com/docs/images/logo.svg" className="mr-3 h-6 sm:h-9" alt="Flowbite Logo" />
                        <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">Flowbite</span>
                    </a>
                    <button data-collapse-toggle="navbar-default" type="button" className="inline-flex items-center p-2 ml-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" >
                        <span className="sr-only">Open main menu</span>
                        <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd"></path></svg>
                    </button>
                    <div className="hidden w-full md:block md:w-auto" id="navbar-default">
                        <ul className="flex flex-col p-4 mt-4 bg-gray-50 rounded-lg border border-gray-100 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                            <li>
                                <a href="/" className="block py-2 pr-4 pl-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white">Home</a>
                            </li>
                            <li>
                                <Link href="/" className="block py-2 pr-4 pl-3   bg-blue-700 rounded md:bg-transparent  md:p-0 dark:text-white">Gallery</Link>
                            </li>
                        </ul>
                    </div>
                </div>
                <div>
                    <button className="hover:bg-slate-200 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center gap-2 relative justify-center" onClick={() => setIsActive(!isActive)}>
                        <img src={foto}  className="rounded-full object-cover w-9 h-9 border border-green-500 shadow"  />
                        <svg className="ml-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                        {
                            isActive &&

                            <div id="dropdownNavbar" className="top-[66px] absolute z-10 w-44 font-normal bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600">
                                <ul className="py-1 text-sm text-gray-700 dark:text-gray-400">
                                    <li>
                                        <a href="#" className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">{name}</a>
                                    </li>
                                </ul>
                                <div className="py-1">
                                    <a href="#" className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-400 dark:hover:text-white" onClick={() => logout()}>Sign out</a>
                                </div>
                            </div>
                        }
                    </button>
                </div>
            </div>
        </nav>
    )
}