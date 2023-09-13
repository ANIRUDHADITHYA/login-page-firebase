import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

const ProtectedRoute = ({children}) => {
    let navigate = useNavigate();
    

    const { user } = useAuth();

    useEffect(()=> {
        console.log(user)

        if(!user) {
            navigate("/");
        }
    }, [user])// eslint-disable-line react-hooks/exhaustive-deps

    if(user) {
        return children
    }
    
}

export default ProtectedRoute;