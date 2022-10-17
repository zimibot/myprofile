import Link from "next/link"
import { Input } from "../../../../src/components/input";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-toastify";
import { useState } from "react";
import { useRouter } from "next/router";
import { useCookies } from 'react-cookie';

const Login = () => {
    const [cookies, setCookie] = useCookies(['token']);

    const { register, handleSubmit, setError, formState: { errors } } = useForm();

    const [isActive, setIsActive] = useState(false)

    const onSubmit = async (data) => {
        try {

            await toast.promise(
                axios.post("/api/post/login", {
                    ...data
                }),
                {

                    pending: 'Login is pending',
                    success: {
                        render: ({ data }) => {
                            let token = data.data.accessToken
                            let roles = data.data.roles
                            let nim = data.data.nim
                            setCookie('token', token, { path: '/' });
                            setIsActive(true)
                            setTimeout(() => {
                                if (roles === 1) {
                                    window.location.href = `/views/items/settings/admin/profile`
                                } else {

                                    window.location.href = `/views/items/settings/member/profile/${nim}`
                                }
                            }, 1000);
                            return 'Login has been successful'
                        },

                        autoClose: 1000
                    },
                    error: {
                        render({ data }) {
                            let msg = data.response.data.message
                            let path = data.response.data.path
                            setError(path, { type: "focus" }, { shouldFocus: true })
                            return msg
                        },
                    }
                }

            );
        } catch (error) {
            return error
        }
    }



    return (
        <div className="flex items-center justify-center w-full h-screen bg-black bg-opacity-60">
            <section className="max-w-7xl  bg-opacity-70 backdrop-blur  rounded-lg">
                <div className="container h-full">
                    <div className="flex justify-center items-center flex-wrap h-full g-6 text-gray-800">
                        <div className="md:w-8/12 lg:w-6/12 mb-12 md:mb-0">
                            <img
                                src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg"
                                className="w-full"
                                alt="Phone image"
                            />
                        </div>
                        <div className="md:w-8/12 lg:w-5/12 flex flex-col gap-10 flex-1 py-4 px-8 ">
                            {errors.email?.type === "required" || errors.password?.type === "required" ?
                                <div role="alert">
                                    <div className="bg-red-500 text-white font-bold rounded-t px-4 py-2">
                                        Alert
                                    </div>
                                    <div className="border border-t-0 border-red-400 rounded-b bg-red-100 px-4 py-3 text-red-700">
                                        <p>
                                            {errors.email && <><b>Email address</b> is required <br></br></>} {errors.password && <><b>Password</b> is required</>}
                                        </p>
                                    </div>
                                </div> : ""
                            }
                            <div className="text-white flex justify-center">
                                <a href="/" className="flex items-center">
                                    <img src="https://flowbite.com/docs/images/logo.svg" className="mr-3 w-10" alt="Flowbite Logo" />
                                    <span className="self-center text-4xl font-semibold whitespace-nowrap dark:text-white">Flowbite</span>
                                </a>
                            </div>
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <div className="mb-6">
                                    <Input type="email" classError={errors.email} placeholder="Email address" name="email" register={register('email', { required: true, disabled: isActive })} />
                                </div>
                                <div className="mb-6">
                                    <Input type="password" classError={errors.password} placeholder="Password" name="password" register={register('password', { required: true, disabled: isActive })} />
                                </div>
                                <button
                                    type="submit"
                                    disabled={isActive}
                                    className={`inline-block px-7 py-3 bg-blue-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out w-full ${isActive ? "bg-gray-600 cursor-not-allowed hover:bg-gray-600 active:bg-gray-600" : ""}`}
                                >
                                    Sign in
                                </button>

                                <div className="flex items-center my-4 before:flex-1 before:border-t before:border-gray-300 before:mt-0.5 after:flex-1 after:border-t after:border-gray-300 after:mt-0.5" >
                                    <p className="text-center font-semibold mx-4 mb-0 text-white">OR</p>
                                </div>
                                <Link href={"/views/items/register"}>
                                    <div
                                        className="cursor-pointer px-7 py-3 bg-[#55acee] text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-150 ease-in-out w-full flex justify-center items-center"
                                    >
                                        Register
                                    </div>
                                </Link>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Login