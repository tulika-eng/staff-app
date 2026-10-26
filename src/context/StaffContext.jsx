import { createContext, useEffect, useState } from "react";
import stafflist from "../stafflist";
import { addcollectionanddocuments, fetchstaffdata } from "../utils/firebase";
export const StaffContext =createContext(
{
  staff:{}
}
);

export function StaffProvider({children}){
    const [staff, setstaff] = useState({})
    useEffect( ()=>{
        const fetchstaffMap= async()=>{
            try {
                const staffmap=await fetchstaffdata();
                console.log(staffmap)
                setstaff(staffmap || {})
            } catch (err) {
                console.error("Failed to fetch staff data:", err);
            }
        }

fetchstaffMap()  },[])

    const value= {staff}
    return<StaffContext.Provider value ={value}>{children}</StaffContext.Provider>


}