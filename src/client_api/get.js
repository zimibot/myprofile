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

    const { data, error } = useSWR("/api/get/global/session", fetcher, {
        loadingTimeout: 1000
    });

    return {
        data,
        error
    }

}

export const userInfo = () => {

    const { data, error } = useSWR("/api/get/global/user_info", fetcher, {
        loadingTimeout: 1000
    });

    return {
        data,
        error
    }

}

export const dataUser = ({ next = 0, limit = 1, search = "", attribute }) => {
    let token = getCookie('token')
    const { data, error, mutate } = useSWR({
        url: `/api/get/auth/user?next=${next}&limit=${limit}&search=${search}&attribute=${attribute}`, headers: {
            headers: {
                'Authorization': token,
            }
        }, type: "GET"
    }, fetcherAuth, {
        loadingTimeout: 1000
    });

    return {
        data,
        error,
        mutate
    }
}

export const currentUser = ({ nim }) => {
    let ver = verify()
    let token = getCookie('token')
    const { data, error, mutate } = useSWR({
        url: `/api/get/auth/current_user?nim=${nim ? nim : ver?.data?.data?.nim}`,
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
        error,
        mutate
    }
}

export const gallery = ({ nim, limit, page }) => {

    let d = nim ? `nim=${nim}` : ""

    const { data, error, mutate } = useSWR(`/api/get/global/gallery_view?limit=${limit}&page=${page}&${d}`, fetcher, {
        loadingTimeout: 1000
    });

    return {
        data,
        error,
        mutate
    }

}

export const skills = ({ nim }) => {
    let token = getCookie('token')


    const { data, error, mutate } = useSWR({
        url: `/api/get/auth/get_skills?nim=${nim}`, headers: {
            headers: {
                'Authorization': token,
            }
        }, type: "GET"
    }, nim ? fetcherAuth : [], {
        loadingTimeout: 1000
    });

    return {
        data,
        error,
        mutate
    }

}
