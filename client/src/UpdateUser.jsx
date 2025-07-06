import React from 'react'
import {useParams} from "react-router-dom"
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import  { useState,useEffect } from 'react'

function UpdateUser() {
  const {id}=useParams()
  const [name,setName]=useState('');
     const [email,setEmail]=useState('');
      const [age,setAge]=useState('');
      const navigate=useNavigate();

       useEffect(()=>{
        axios.get('http://localhost:3001/getUser/'+id)
        .then(result =>{console.log(result)
          setName(result.data.name)
          setEmail(result.data.email)
          setAge(result.data.age)
        })
        .catch(err=>console.log(err))
      },[])
const Update=(e)=>{
     e.preventDefault(); //this prevents form to reload when submitted
    axios.put('http://localhost:3001/updateUser/' +id,{name,email,age}) //it means to send data to backend/server
    .then(result=> {console.log(result);
    navigate("/");}  //after submit move back to the / route
).catch(err=>console.log(err))
}
  return (
     <div className='d-flex vh-100 bg-primary justify-content-center align-items-center'>
         <div className='w-80 bg-white rounded p-3'>
      <form onSubmit={Update}>
        <h2>Update User</h2>
        <div class="mb-2">
    <label for="" >Name</label>
    <input type="text" class="form-control" placeholder='Enter your Name' value={name}  onChange={(e)=>setName(e.target.value)}/>
    
  </div>
  <div class="mb-2">
    <label for="" >Email address</label>
    <input type="email" className="form-control" placeholder='Enter your Email' value={email}  onChange={(e)=>setEmail(e.target.value)}/>
  </div>

  <div class="mb-2">
    <label for="" class="form-label">Age</label>
    <input type="text" className="form-control" value={age}  onChange={(e)=>setAge(e.target.value)}/>
  </div>
  
  <button type="submit" class="btn btn-primary">Update</button>
</form></div>
    </div>
  )
}

export default UpdateUser
