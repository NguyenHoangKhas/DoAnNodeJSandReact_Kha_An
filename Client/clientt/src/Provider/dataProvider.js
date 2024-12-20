import React, { createContext, useState, useEffect } from 'react';
import decodedJWT from '../middleWare/decodedJWT';

// Tạo Context
const DataContext = createContext();

const DataProvider = ({ children }) => {
    useEffect(() => {
        setData(decodedJWT());
    }, [])
    const [data, setData] = useState(decodedJWT());
    return (
        <DataContext.Provider value={{ data, setData }}>
            {children}
        </DataContext.Provider>
    );
};

export { DataContext, DataProvider };
