import React, { createContext, useState } from "react";

export const LoaderContext = createContext();
console.log(LoaderContext)


export const LoaderProvider = ({ children }) => {

    const [loading, setLoading] = useState(false)

    return (
        <LoaderContext.Provider value={{ loading, setLoading }}>
            {children}
        </LoaderContext.Provider>
    )
}