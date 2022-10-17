import ErrorPage from 'next/error'
import { useRouter } from 'next/router';
import { currentUser, verify } from '../client_api/get';


const ProtectedRoute = ({ children }) => {

    const { data, error } = verify()
    let route = useRouter()
    const res = currentUser({nim: route.query.index})
     let unprotectedRoutes = [
        "/",
        "/views/items/login",
        "/views/items/register"
    ];
    
    let loading = <div className="fixed h-screen w-screen flex items-center justify-center bg-slate-200 bg-opacity-50">
    <span className="loading__anim"></span>
</div>;

    if (error) return <ErrorPage statusCode={401}></ErrorPage>;
    if (!data) return loading;
    if (unprotectedRoutes.indexOf(route.pathname) === -1 && route?.query.index) if (res.error) return <ErrorPage statusCode={res.error.response.status} title={res.error.response.data.message} />;
    if (!res.data && unprotectedRoutes.indexOf(route.pathname) === -1 ) return loading;

    let result = res?.data?.data.results
    let path = route.pathname.includes("admin")

    if (data?.isAuth && route.pathname === "/views/items/login") return <div><ErrorPage statusCode={404} /></div>;
    if (unprotectedRoutes.indexOf(route.pathname) === -1 && !data?.isAuth) return <ErrorPage statusCode={404} />;
    if (unprotectedRoutes.indexOf(route.pathname) === -1 && data?.isAuth && path && result?.user_setting.id_roles !== 1) return <ErrorPage statusCode={404}/>;


    return children

};
export default ProtectedRoute;