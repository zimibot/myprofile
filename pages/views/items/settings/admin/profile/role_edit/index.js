import axios from "axios";
import { getCookie } from "cookies-next";
import Link from "next/link";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { currentUser, dataUser } from "../../../../../../../src/client_api/get";
import { Selected } from "../../../../../../../src/components/input"
import SettingsLayout from "../../../../../../../src/components/layout/settings"

const EditRoles = () => {

    const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm();

    const { data } = dataUser({ attribute: ["fullname", "nim"] })
    const { nim } = watch()
    let token = getCookie('token')

    const item = currentUser({ nim: nim })
    const onSubmit = async (data) => {
        try {
            if (data.nim) {
                await toast.promise(
                    axios.put("/api/put/edit_roles", data, {
                        headers: {
                            'Authorization': token,
                        }
                    })
                    , {
                        pending: {
                            render: () => {
                                return "Update Pendding"
                            }
                        },
                        error: "Update Error",
                        success: "Update Success"
                    })
            } else {
                toast.error("Please Select fullname")
            }
        } catch (error) {

        }
    }

    useEffect(() => {
        if (nim) {      
            let val = item.data?.data.results.user_setting
            console.log(val)
            setValue("id_roles", val?.id_roles)
            setValue("user_active", val?.user_active)
        } else {
            setValue("id_roles", "")
            setValue("user_active", "")
        }
    }, [nim, item.data]);

    return <SettingsLayout title={"Role User Edit"}>
        {data &&
            <div className="bg-white p-4 max-w-lg shadow">
                <form className="space-y-3" onSubmit={handleSubmit(onSubmit)}>
                    <Selected errors={errors.nim} name="Fullname" register={register("nim", { required: true })}>
                        <option value={""}>Select Fullname</option>
                        {data.data.results.map(d => {
                            return <option key={d.nim} value={d.nim}>{d.fullname}</option>
                        })}
                    </Selected>
                    {nim && 
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <Selected placeholder="Select" register={register("user_active", { required: true })}>
                                    <option value={""}></option>
                                    <option value={1}>Active</option>
                                    <option value={0}>Deactive</option>
                                </Selected>
                            </div>
                            <div>
                                <Selected placeholder="Select" register={register("id_roles", { required: true })}>
                                    <option value={""}></option>
                                    <option value={1}>Admin</option>
                                    <option value={2}>Member</option>
                                </Selected>
                            </div>
                        </div>
                    }
                    <div className="grid gap-3 grid-cols-2">
                        <Link href={"/views/items/settings/admin/profile"}>
                            <div className="bg-red-500 text-center text-white p-2 hover:bg-red-600">
                                Cancel
                            </div>
                        </Link>
                        <button className="bg-cyan-500 text-white p-2 hover:bg-cyan-600">
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        }
    </SettingsLayout>
}

export default EditRoles