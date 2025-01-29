
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios"; 


function Personaldetails() {
    const { id } = useParams(); 
      console.log(id);
      const [employee, setEmployee] = useState(null); 
      
  return (
    <div>Policies</div>
  )
}

export default Personaldetails;