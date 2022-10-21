import axios from "axios";
import { getCookie } from "cookies-next";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { isEmptyObject, validateEmail } from "../../../../../../lib/error";
import { currentUser } from "../../../../../../src/client_api/get";
import { Input, Textarea } from "../../../../../../src/components/input"
import SettingsLayout from "../../../../../../src/components/layout/settings"

const Profile = () => {
    const { register, handleSubmit, watch, setValue, resetField, formState: { errors } } = useForm();
    const router = useRouter()

    const query = router.query.index
    let token = getCookie('token')
    let btnValid = !isEmptyObject(errors)
    let { password, repassword } = watch()
    let isPassword = password?.length > 0 && repassword?.length > 0 ? password === repassword ? false : true : false
    const data = currentUser({ nim: query })
    const isData = data.data.data
    const fullname = isData.results.fullname
    const foto = isData.results.foto
    const roles = isData.results.user_setting.id_roles
    const userIsActive = isData.results.user_setting.user_active


    useEffect(() => {
        let name = data.data.data.results
        for (const key in name) {
            if (key === "user_setting") {
                let sett = name[key]
                console.log("sett")
                for (const key in sett) {
                    setValue(key, sett[key], { shouldDirty: true })
                }
            } else {
                setValue(key, name[key], { shouldDirty: true })
            }

        }
    }, [])

    const onSubmit = async data => {
        try {
            let form = new FormData()
            console.log(data)
            for (const key in data) {
                if (key === "foto") {
                    form.append(key, data[key][0])
                }  else {
                    form.append(key, data[key])
                }
            }

            let res = axios.put("/api/put/edit_profile", form, {
                headers: {
                    "Authorization": token
                }
            })
            await toast.promise(res, {
                success: {
                    render: () => {
                        resetField("password")
                        resetField("repassword")
                        return "Edit Success"
                    }
                },
                pending: {
                    render: () => {
                        return "Edit Pendding"
                    }
                },
                error: {
                    render: ({ data }) => {
                        data = data.response.data.message
                        return data
                    }
                }
            })
        } catch (error) {
            return error
        }
    };

    

    return <SettingsLayout title={"#EDIT PROFILE"} roles={roles}>
        <div className="w-full p-4">
            <div className="max-w-3xl bg-white m-auto">
                <form className="h-full flex flex-col justify-between" onSubmit={handleSubmit(onSubmit)}>
                    <div className="flex-1">
                        <div className="flex items-center justify-center relative" style={{
                            backgroundImage: "url('https://www.nsbpictures.com/wp-content/uploads/2020/04/sunset-hd-background-photos-12-scaled.jpg')",
                            backgroundRepeat: "no-repeat",
                            backgroundSize: "cover",
                            backgroundPosition: "center"
                        }}>
                            <div className="w-full h-full flex justify-center flex-col items-center text-white gap-4  bg-black bg-opacity-40 py-16 px-4 backdrop-blur-sm">
                                {userIsActive === 0 &&
                                    <div className="absolute left-0 top-0 w-full p-4 bg-red-500 text-center">
                                        <div>This account has been suspended</div>
                                    </div>
                                }
                                <img src={foto} className=" w-24 h-24 rounded-lg" />
                                <div className="font-semibold flex flex-col items-center justify-center gap-3">
                                    <div className="text-3xl">{fullname}</div>
                                    <div className={`${roles === 2 ? "bg-gray-500" : "bg-green-500"} px-4 rounded`}>{roles === 2 ? "Member" : "Admin"}</div>
                                </div>
                            </div>
                        </div>
                        <div className="w-full p-5 flex flex-col gap-6">
                            <div className="flex flex-wrap -mx-3">
                                <div className="w-full px-3">
                                    <label className={`block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 `}>
                                        *Nim
                                    </label>
                                    <Input disabled={true} type="number" placeholder="Nomor Induk Mahasiswa" name="nim" errors={errors.nim} customNameError="nim can't be less than 6 digits" register={register("nim", {
                                        required: true,
                                        valueAsNumber: true,
                                        validate: (v) => {
                                            return `${v}`.length >= 6
                                        }
                                    })} />
                                </div>
                            </div>
                            <div className="grid gap-4 grid-cols-2">
                                <div className="flex flex-wrap -mx-3 col-span-2">
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
                            <div className="grid gap-4 grid-cols-3">
                                <div className="flex flex-wrap -mx-3 col-span-2">
                                    <div className="w-full px-3">
                                        <label className={`block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 `}>
                                            *Nomor HP
                                        </label>
                                        <Input type="number" placeholder="Nomor HP" name="nohp" errors={errors.nohp} register={register("nohp", { required: true })} />
                                    </div>
                                </div>
                                <div className="flex flex-wrap -mx-3">
                                    <div className="w-full px-3">
                                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                                            *Status
                                        </label>
                                        <Input type="text" placeholder="Status" name="status" errors={errors.status} register={register("status", { required: true })} />
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
                            <div>
                                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                                    Upload Foto Profile
                                </label>
                                <Input accept="image/png, image/jpeg" type="file" placeholder="Upload Foto Profile" name="Foto Profile" errors={errors.foto} register={register("foto", { required: true })}
                                />
                            </div>

                            <div className="flex justify-end gap-3">
                                <div className={`text rounded p-2 px-4 bg-red-500  text-white cursor-pointer `} onClick={() => router.back()}>
                                    CANCEL
                                </div>
                                <button disabled={btnValid || isPassword} className={`text rounded p-2 px-4 bg-blue-500  text-white  ${btnValid || isPassword ? " bg-opacity-40 cursor-not-allowed" : "hover:bg-blue-700"}`}>
                                    SUBMIT
                                </button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </SettingsLayout>
}

export default Profile