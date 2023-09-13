import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react"
import { auth } from "../Auth/firebase-config";

const AuthContext = createContext()

export function useAuth() {
    return useContext(AuthContext)
}

export function AuthProvider({ children }) {
    const [user, setUser] = useState("");


    const [error, setError] = useState("");

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        });

        return () => {
            unsubscribe();

        }

    }, [])

    const register = async (registerEmail, registerConfirmPassword, registerPassword) => {

        const error = {

            registerPassword: ""
        }

        function ValidateRegister() {
            if (registerConfirmPassword !== registerPassword) {
                error.registerPassword = "Both Password should Match!"
            } else if (!registerConfirmPassword.trim()) {
                error.registerPassword = "Confirm Password Required"
            }

            setError(error)
        }


        ValidateRegister()
        if (!error.registerPassword) {
            try {

                const user = await createUserWithEmailAndPassword(
                    auth,
                    registerEmail,
                    registerPassword
                );
                console.log(user)
                window.alert("Registered Successfull")
                setError("")
            } catch (error) {
                window.alert(error.message)
            }
        }




    }

    const signin = async (loginEmail, loginPassword) => {
        if(user){
            logout()
            setError("")
        }
        

        try {

            const user = await signInWithEmailAndPassword(
                auth,
                loginEmail,
                loginPassword
            );
            setUser(user)
            setError("")
            console.log(user)
        } catch (error) {
            if(error.message === "Firebase: Error (auth/wrong-password).") {
                setError({login: "Invalid / Incorrect Password"})
            }else if(error.message === "Firebase: Error (auth/missing-password)."){
                setError({login: "Missing Password"})
            } else {
                window.alert(error.message)
            }
           
        }


    }

    const logout = async () => {
        await signOut(auth)

    }

    return (
        <AuthContext.Provider value={{ user, register, signin, logout, error }}>
            {children}
        </AuthContext.Provider>
    )

}

export function useUserAuth() {
    return useContext(useAuth);
}