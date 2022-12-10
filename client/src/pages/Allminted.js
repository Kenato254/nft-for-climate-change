import React, { Component } from "react";
import axios from 'axios';


function AllMinted() {
  axios.get("http://localhost:8000")
   .then(response=>{
      console.log(response.data);
   }); 

  return (
    <div>
    </div>
  )
}
export default AllMinted;
