import { createContext, useContext,  useState } from "react";

const AuthContext=createContext(null);

export const useAuth=()=>useContext(AuthContext);


// eslint-disable-next-line react/prop-types
function AuthProvider({children}){
    // eslint-disable-next-line no-unused-vars
    const [auth,setAuth]=useState(()=>{
        const storedAuth=localStorage.getItem('auth');
        return storedAuth?JSON.parse(storedAuth):null;
    });
    return (
        <AuthContext.Provider value={{auth,setAuth}}>
            {children}
        </AuthContext.Provider>
    )
}

export {AuthProvider};