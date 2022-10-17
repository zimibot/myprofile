import { useForm } from "react-hook-form";
import { isEmptyObject, validateEmail } from "../../../../lib/error";
import { Input, Textarea } from "../../../../src/components/input";
import axios from 'axios';
import { toast } from 'react-toastify';
import Link from "next/link";


const Register = () => {
    const { register, handleSubmit, watch, setError, reset, formState: { errors } } = useForm();

    let btnValid = !isEmptyObject(errors)
    let { password, repassword } = watch()
    let isPassword = password?.length > 0 && repassword?.length > 0 ? password === repassword ? false : true : false

    const onSubmit = async data => {
        try {
            await toast.promise(
                axios.post("/api/post/register", {
                    ...data
                }),
                {

                    pending: 'registration is pending',
                    success: {
                        render: () => {
                            reset()
                            return 'registration has been successful'
                        }
                    },
                    error: {
                        render({ data }) {
                            if (data.response.data.message) {
                                let inpt = data.response.data.message[0].value
                                let path = data.response.data.message[0].path ? data.response.data.message[0].path : data.response.data.path

                                console.log(data.response.data.path)
                                setError(path, { type: "focus" }, { shouldFocus: true });

                                return inpt ? <div><b>{inpt}</b>  is already registered</div> : data.response.data.message
                            } else {
                                let path = data.response.data.path
                                setError(path, { type: "focus" }, { shouldFocus: true });
                                return data.response.data.message
                            }
                        },
                    }
                },
            );

        } catch (error) {
            return error
        }
    };
    return (
        <div className="w-full h-full flex items-end bg-black bg-opacity-40 backdrop-blur flex-col gap-4">
            <div className="bg-white rounded flex flex-col gap-4 md:w-8/12 lg:w-5/12 h-full">
                <form className="h-full flex flex-col justify-between" onSubmit={handleSubmit(onSubmit)}>
                    <div className="flex-1">
                        <div className="border-b justify-between flex items-center">
                            <div className="px-4">
                                <h1 className="text-3xl text-[#555]">REGISTER</h1>
                            </div>
                            <Link href={"/views/items/login"}>
                                <div className="bg-slate-500 h-full p-4 text-white hover:bg-blue-500 block cursor-pointer">
                                    LOGIN
                                </div>
                            </Link>
                        </div>
                        <div className="w-full p-5 flex flex-col gap-6">
                            <div className="flex flex-wrap -mx-3">
                                <div className="w-full px-3">
                                    <label className={`block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 `}>
                                        *Nim
                                    </label>
                                    <Input min={1} max={9999999999}
                                        type="number" placeholder="Nomor Induk Mahasiswa" name="nim" errors={errors.nim} customNameError="nim can't be less than 6 digits" register={register("nim", {
                                            required: true,
                                            valueAsNumber: true,
                                            validate: (v) => {
                                                return `${v}`.length >= 6
                                            }
                                        })} />
                                </div>
                            </div>
                            <div className="grid gap-4 grid-cols-3">
                                <div className="flex flex-wrap -mx-3">
                                    <div className="w-full px-3">
                                        <label className={`block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 `}>
                                            *Fullname
                                        </label>
                                        <Input type="text" placeholder="Fullname" name="fullname" errors={errors.fullname} register={register("fullname", { required: true })} />
                                    </div>
                                </div>
                                <div className="flex flex-wrap -mx-3">
                                    <div className="w-full px-3">
                                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                                            *username
                                        </label>
                                        <Input type="text" placeholder="Username" name="username" errors={errors.username} register={register("username", { required: true })} />
                                    </div>
                                </div>
                                <div className="flex flex-wrap -mx-3">
                                    <div className="w-full  px-3">
                                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                                            *Email
                                        </label>
                                        <Input type="text" placeholder="Email" name="email" errors={errors.email} customNameError={"The email entered does not match"} register={register("email", { required: true, validate: validateEmail })} />
                                    </div>
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="flex flex-wrap -mx-3">
                                    <div className="w-full px-3">
                                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                                            *Password
                                        </label>
                                        <Input type="password" placeholder="Password" name="password" isCustomError={isPassword} customNameError="passwords are not the same" errors={errors.password || isPassword} register={register("password", {
                                            required: true,
                                            min: 4,
                                        })} />
                                    </div>
                                </div>
                                <div className="flex flex-wrap -mx-3">
                                    <div className="w-full px-3">
                                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                                            *Re-type Password
                                        </label>
                                        <Input type="password" placeholder="Re-type Password" name="re-type password" isCustomError={isPassword} customNameError="passwords are not the same" errors={errors.repassword || isPassword} register={register("repassword", {
                                            required: true,
                                            min: 4,
                                        })} />
                                    </div>
                                </div>
                            </div>
                            <div>
                                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                                    *Alamat
                                </label>
                                <Textarea placeholder="Alamat" name="alamat" errors={errors.alamat} customNameError="alamat must be longer than 3 characters" register={register("alamat", {
                                    required: true,
                                    validate: (v) => {
                                        return `${v}`.length >= 4
                                    }
                                })}
                                />
                            </div>

                        </div>
                    </div>
                    <div>
                        <button disabled={btnValid || isPassword} className={`text-4xl p-4 bg-blue-500 w-full text-white  ${btnValid || isPassword ? " bg-opacity-40 cur" : "hover:bg-blue-700"}`}>
                            SUBMIT
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Register