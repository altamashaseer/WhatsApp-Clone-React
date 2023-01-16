import { createContext, useEffect, useState } from "react";
import { auth } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";

const AuthContext = createContext();
const AuthContextProvider = ({ children }) => {
    const [currentUser, setcurrentUser] = useState({})

    useEffect(() => {
        const unsub = onAuthStateChanged(auth, (user) => {
            setcurrentUser(user)
            console.log(user);
        })
        return () => {
            unsub();
        }
    }, [])
    return (
        <AuthContext.Provider value={{ currentUser }}>
            {children}
        </AuthContext.Provider>
    )
}

export { AuthContext, AuthContextProvider }