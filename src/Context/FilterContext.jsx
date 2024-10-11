import { createContext, useEffect, useState } from "react";

export const FilterContext = createContext();

export const FilterContextProvider = ({ children }) => {
    const [filterValue, setFilterValue] = useState([]);

    const value = {
        filterValue,
        setFilterValue,
    };

    // console.log(filterValue);
    return (
        <FilterContext.Provider value={value}>
            {children}
        </FilterContext.Provider>
    );
};
