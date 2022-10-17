import axios from "axios";
import { getCookie } from "cookies-next";
import useSWR from "swr";

const fetcher = (...args) => fetch(...args).then(res => res.json())
const fetcherAuth = async ({ url, headers, body, type }) => {
    return type === "GET" ? axios.get(url, headers) :
        type === "POST" ? axios.post(url, body, headers) :
            type === "PUT" ? axios.put(url, body, headers) :
                axios.delete(url, headers)
}

export const verify = () => {

    const { data, error } = useSWR("/api/get/session", fetcher, {
        loadingTimeout: 1000
    });

    return {
        data,
        error
    }

}

export const dataUser = ({ next = 0, limit = 1, search }) => {
    let token = getCookie('token')
    const { data, error } = useSWR({
        url: `/api/get/user?next=${next}&limit=${limit}&search=${search}`, headers: {
            headers: {
                'Authorization': token,
            }
        }, type: "GET"
    }, fetcherAuth, {
        loadingTimeout: 1000
    });

    return {
        data,
        error
    }
}

export const currentUser = ({ nim }) => {
    let ver = verify()
    let token = getCookie('token')
    const { data, error } = useSWR({
        url: `/api/get/current_user?nim=${nim ? nim : ver?.data?.data?.nim}`,
        headers: {
            headers: {
                'Authorization': token,
            }
        },
        type: "GET"
    }, ver?.data?.data?.nim || nim ? fetcherAuth : [], {
        loadingTimeout: 2000,
    });

    return {
        data,
        error
    }
}