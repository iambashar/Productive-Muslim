import React, { useState, createContext } from "react";

export const SalahContext = createContext();

export const SalahContextProvider = (props) => {
    const [displaySalahTime, setdisplaySalahTime] = useState([]);

    return (
        <SalahContext.Provider value={{ displaySalahTime, setdisplaySalahTime }}>
            {props.children}
        </SalahContext.Provider>
    );
};