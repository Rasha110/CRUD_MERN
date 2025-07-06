import React, {  useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
function CreateUser() {
    const [name,setName]=useState();
     const [email,setEmail]=useState();
      const [age,setAge]=useState();
      const navigate=useNavigate();



const Submit=(e)=>{
    e.preventDefault(); //this prevents form to reload when submitted
    axios.post('http://localhost:3001/createUser',{name,email,age}) //it means to send data to backend/server
    .then(result=> {console.log(result)
    navigate("/")}  //after submit move back to the / route
).catch((err) => {
  console.log(err.response);  // <== Check the actual response in dev console
  if (err.response && err.response.data.error === "Email must be unique!") {
    alert("❗ Email already exists. Please use a different one.");
  } else {
    alert("Something went wrong!");
  }
});
}

  return (
    <div className='d-flex vh-100 bg-primary justify-content-center align-items-center'>
         <div className='w-80 bg-white rounded p-3'>
      <form onSubmit={Submit}>
        <h2>Add User</h2>
        <div class="mb-2">
    <label for="" >Name</label>
    <input type="text" class="form-control" placeholder='Enter your Name' 
    onChange={(e)=>setName(e.target.value)}
    />
    
  </div>
  <div class="mb-2">
    <label for="" >Email address</label>
    <input type="email" className="form-control" placeholder='Enter your Email'
        onChange={(e)=>setEmail(e.target.value)}
    />
  </div>

  <div class="mb-2">
    <label for="" class="form-label">Age</label>
    <input type="text" className="form-control" id="exampleInputPassword1"
        onChange={(e)=>setAge(e.target.value)}
    />
  </div>
  
  <button type="submit" class="btn btn-primary">Create</button>
</form></div>
    </div>
  )
}

export default CreateUser
