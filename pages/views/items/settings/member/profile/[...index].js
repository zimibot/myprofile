import { Drawer,  Popover } from "antd";
import axios from "axios";
import { getCookie } from "cookies-next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { isEmptyObject, validateEmail } from "../../../../../../lib/error";
import { currentUser, skills } from "../../../../../../src/client_api/get";
import { Input, Textarea } from "../../../../../../src/components/input"
import SettingsLayout from "../../../../../../src/components/layout/settings"

const Profile = () => {
    const { register, handleSubmit, watch, setValue, resetField, formState: { errors } } = useForm();
    const [show, setshow] = useState(false)
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
                for (const key in sett) {
                    setValue(key, sett[key], { shouldDirty: true })
                }
            } else {
                setValue(key, name[key], { shouldDirty: true })
            }

        }
    }, [])

    const onSubmit = async dataItems => {
        try {
            let form = new FormData()
            for (const key in dataItems) {
                if (key === "foto") {
                    form.append(key, dataItems[key][0])
                } else {
                    form.append(key, dataItems[key])
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
                        data.mutate()
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
                <div className="h-full flex flex-col justify-between">
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
                                <img src={foto} className=" w-24 h-24 rounded-lg object-cover" />
                                <div className="font-semibold flex flex-col items-center justify-center gap-3">
                                    <div className="text-3xl">{fullname}</div>
                                    <div className={`${roles === 2 ? "bg-gray-500" : "bg-green-500"} px-4 rounded`}>{roles === 2 ? "Member" : "Admin"}</div>
                                </div>
                            </div>
                        </div>
                        <div className="site-drawer-render-in-current-wrapper overflow-hidden relative">
                            <form className="w-full p-5 flex flex-col gap-6" onSubmit={handleSubmit(onSubmit)}>
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
                                        *Job Description
                                    </label>
                                    <Input placeholder="Job Description" name="Job Description" errors={errors.job} register={register("job", {required: true})}
                                    />
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
                                    <Input accept="image/png, image/jpeg" type="file" placeholder="Upload Foto Profile" name="Foto Profile" errors={errors.foto} register={register("foto")}
                                    />
                                </div>
                                <div className="py-2 px-4 bg-cyan-600 text-white cursor-pointer text-center shadow hover:bg-cyan-500" onClick={() => setshow(true)}>
                                    + CLICK HERE TO ADD SKILLS
                                </div>
                                <div className="grid gap-4 grid-cols-3">
                                    <div className="flex flex-wrap -mx-3">
                                        <div className="w-full px-3">
                                            <label className={`block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 `}>
                                                Link Akun Facebook
                                            </label>
                                            <Input placeholder="Link Akun Facebook" name="Link Akun Facebook" errors={errors.fb} register={register("fb")} />
                                        </div>
                                    </div>
                                    <div className="flex flex-wrap -mx-3">
                                        <div className="w-full px-3">
                                            <label className={`block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 `}>
                                                Link Akun Twitter
                                            </label>
                                            <Input placeholder="Link Akun Twitter" name="Link Akun Twitter" errors={errors.twit} register={register("twit")} />
                                        </div>
                                    </div>
                                    <div className="flex flex-wrap -mx-3">
                                        <div className="w-full px-3">
                                            <label className={`block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 `}>
                                                Link Akun Instagram
                                            </label>
                                            <Input placeholder="Link Akun Instagram" name="Link Akun Instagram" errors={errors.instagram} register={register("instagram")} />
                                        </div>
                                    </div>
                                </div>

                                <div className="flex justify-end gap-3">
                                    <div className={`text rounded p-2 px-4 bg-red-500  text-white cursor-pointer `} onClick={() => router.back()}>
                                        CANCEL
                                    </div>
                                    <button disabled={btnValid || isPassword} className={`text rounded p-2 px-4 bg-blue-500  text-white  ${btnValid || isPassword ? " bg-opacity-40 cursor-not-allowed" : "hover:bg-blue-700"}`}>
                                        SUBMIT
                                    </button>
                                </div>
                            </form>
                            <Drawer
                                title="ADD SKILL"
                                placement="bottom"
                                closable={true}
                                onClose={() => setshow(false)}
                                open={show}
                                getContainer={false}

                            >
                                <AddSkill></AddSkill>
                            </Drawer>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </SettingsLayout>
}

const AddSkill = () => {
    const [show, setshow] = useState(false);
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const router = useRouter()
    const query = router.query.index
    const getSkills = skills({ nim: query[0] })

    let token = getCookie('token')
    const onDelete = async (id, name) => {
        try {
            await toast.promise(axios.delete(`/api/delete/skills_delete?id=${id}`, {
                headers: {
                    "Authorization": token
                }
            }),
                {
                    pending: "Delete skill pending",
                    error: "Delete skill error",
                    success: {
                        render: () => {
                            getSkills.mutate()
                            return <div>Delete skill <b className="text-cyan-500">{name}</b> success</div>
                        }
                    }
                })
        } catch (error) {

        }

    }

    const onSubmit = async (d) => {
        d = {
            nama: d.nama.toUpperCase(),
            nilai: parseInt(d.nilai),
            nim: parseInt(query[0])
        }

        await toast.promise(axios.post("/api/post/skills", d, {
            headers: {
                "Authorization": token
            }
        }),
            {
                pending: "Add skill pending",
                error: "Add skill error",
                success: {
                    render: () => {
                        reset()
                        getSkills.mutate()
                        return <div>Add skill <b className="text-cyan-500">{d.nama}</b> success</div>
                    }
                }
            })

    }


    const Content = (id, name) => {
        return <div>
            <button className="p-2 bg-red-500 text-white rounded w-full" onClick={() => onDelete(id, name)}>Delete</button>
        </div>
    }

    return <div>
        <Drawer
            title="List Skills"
            placement={"top"}
            closable={true}
            onClose={() => setshow(false)}
            open={show}
            getContainer={false}
            height={558}
        >
            <div className="grid grid-cols-4 gap-3">
                {getSkills.data ? getSkills.data.data.results.map(d => {
                    return (
                        <Popover id={d.id} autoAdjustOverflow zIndex={9099} content={Content(d.id, d.nama)} popupVisible={false} destroyTooltipOnHide placement="rightBottom" title="Button" trigger="hover">
                            <div key={d.id} className="flex justify-center flex-col items-center gap-3 bg-slate-100  rounded-xl shadow relative hover:shadow-xl hover:scale-105 transition-all cursor-pointer">
                                <div className="p-3 border-b text-ellipsis overflow-hidden text-center"> {d.nama} </div>
                                <div className="px-5 py-2">
                                    <CircularProgressbar
                                        value={d.nilai}
                                        text={`${d.nilai}%`}
                                        strokeWidth={6}
                                        styles={buildStyles({
                                            // Rotation of path and trail, in number of turns (0-1)
                                            rotation: 0.25,

                                            // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'


                                            // Text size
                                            textSize: '16px',

                                            // How long animation takes to go from one percentage to another, in seconds
                                            pathTransitionDuration: 0.5,

                                            // Can specify path transition in more detail, or remove it entirely
                                            // pathTransition: 'none',

                                            // Colors
                                            pathColor: `rgb(${parseInt(d.nilai / 1.2)}  ${parseInt(d.nilai / 1.8)} ${parseInt(d.nilai * 1.5)} )`,
                                            textColor: `rgb(${parseInt(d.nilai / 1.2)}  ${parseInt(d.nilai / 1.8)} ${parseInt(d.nilai * 1.5)} )`,
                                            trailColor: '#d6d6d6',
                                            backgroundColor: '#3e98c7',
                                        })}
                                    />
                                </div>
                            </div>
                        </Popover>

                    )
                }) : ""}

            </div>
        </Drawer>
        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-wrap -mx-3">
                <div className="w-full px-3">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                        *Name Skill
                    </label>
                    <Input errors={errors.nama} name="Name Skill" register={register("nama", { required: true })} />
                </div>
            </div>
            <div className="flex flex-wrap -mx-3">
                <div className="w-full px-3">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                        *Total Skill
                    </label>
                    <Input errors={errors.nilai} name="Total Skill" register={register("nilai", { required: true })} type="number" max={100} min={1} />
                </div>
            </div>
            <button className="px-4 py-1 bg-blue-600 text-white rounded-sm">Submit</button>
        </form>
        <div className="absolute bottom-0 px-4 w-full text-center left-0 bg-blue-500 py-2 text-white cursor-pointer hover:bg-blue-600" onClick={() => setshow(true)}>
            Click Here to Show Skill
        </div>


    </div>
}

export default Profile