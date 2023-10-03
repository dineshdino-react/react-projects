import React,{ createContext, useState} from "react";

export const AuthContext = createContext();

export const AuthProvider = ({Children}) => {
    const [isLoading, setIsLoading] = useState(true);
    const [userToken, setUserToken]=  useState(null);
    return(
        <AuthContext.Provider value={{test}}>
            {Children}
        </AuthContext.Provider>
    );
}