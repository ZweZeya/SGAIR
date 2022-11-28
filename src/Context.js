import React, { createContext, useEffect, useState } from 'react'
import axios from "axios"

export const DataContext = createContext();

export default function Context({ children }) {
    const [data, setData] = useState();
    
    useEffect(() => {
        axios.get('http://localhost:4000/psi')
        .then(res => {

            const regions = ["west", "national", "east", "central", "south", "north"];

            for (let i = 0; i < regions.length; i++) {
                const newData = []
                const tmp = res.data.items[0].readings
                for (const pollutant in tmp) {
                    newData.push([pollutant, tmp[pollutant][regions[i]]])
                }
                setData(prev => {
                    return {
                        ...prev,
                        [regions[i]]: newData
                    }
                })
            }            

        })
        .catch(err => console.log(err.message));
    }, []);

    return (
        <DataContext.Provider value={data}>
            { children }
        </DataContext.Provider>
    )
}