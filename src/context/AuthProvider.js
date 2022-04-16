import {Navigate, Outlet, useLocation, useNavigate} from "react-router-dom";
import {createContext, useContext, useEffect, useState} from "react";
import {getLoginToken, getLocalToken, clearToken} from "../utils/useAxios";
import jwt_decode from "jwt-decode";

let AuthContext = createContext(null);

function AuthProvider({children}) {
    let navigate = useNavigate()
    let [user, setUser] = useState(null)
    let [loading, setLoading] = useState(true)
    let [token, setToken] = useState(()=>getLocalToken())

    let signin = async (e) => {
        e.preventDefault()
        const loginToken = await getLoginToken(new FormData(e.target))
        if (loginToken) {
            setToken(loginToken)
            navigate("/")
        }else{
            navigate("/signup")
        }
    };

    let signout = async () => {
        clearToken()
        setToken(null);
        navigate("/")
    };

    let getUserObj = () => {
        if (token) {
            return jwt_decode(token.access)
        }
        return null
    }

    useEffect(()=>{
        if (token){
            let decodedToken = jwt_decode(token.access)
            setUser(decodedToken.username)
        }else{
            setUser(null)
        }
    },[token])

    // hack to prefetch token before renders
    useEffect(()=>{loading && setLoading(false)}, [loading])

    let contextData = {signin, signout, user, token, setToken, getUserObj};

    // only render after initial load (persist token through page refresh)
    return <AuthContext.Provider value={contextData}>{loading?null:children}</AuthContext.Provider>;
}


function RequireAuth() {
    let auth = useContext(AuthContext);
    let location = useLocation()

    if (!auth.user) {
        return <Navigate to="/login" state={{from:location}} replace />;
    }

    return <Outlet />;
}


export {AuthContext, AuthProvider, RequireAuth}