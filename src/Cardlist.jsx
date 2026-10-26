import Card from "./Card";
import './Cardlist.css'
import { StaffContext } from "./context/StaffContext";
import stafflist from "./stafflist";
import { useContext } from "react";
function Cardlist(props){

const {staff} = useContext(StaffContext)
  // const filteredstaff   = staff.filter((staff)=>{

  //   return(staff.name.toLowerCase().startsWith(props.searchTerm.toLowerCase()))


  //    })
return(
<div className="row">
   
  
   { Object.keys(staff)
     .filter((name) => {
       if (!props.searchTerm) return true;
       const staffName = staff[name].name || name;
       return staffName.toLowerCase().includes(props.searchTerm.toLowerCase());
     })
     .map(function c(name){
       return (
         <Card 
           key={name}
           image={staff[name].image}
           name={staff[name].name || name}
           job={staff[name].job}
         />
       );
     })}


</div>

)

}

export default Cardlist;