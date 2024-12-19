import React, { createContext, useState } from 'react';
import decodedJWT from '../middleWare/decodedJWT';

// Tạo Context
const DataContext = createContext();

const DataProvider = ({ children }) => {
    const [data, setData] = useState(decodedJWT());

    return (
        <DataContext.Provider value={{ data, setData }}>
            {children}
        </DataContext.Provider>
    );
};

export { DataContext, DataProvider };
