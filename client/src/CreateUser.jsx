import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function CreateUser() {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [age, setAge] = useState();
  const navigate = useNavigate();

  const Submit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:3001/createUser', { name, email, age })
      .then(result => {
        console.log(result);
        navigate("/");
      })
      .catch((err) => {
        console.log(err.response);
        if (err.response && err.response.data.error === "Email must be unique!") {
          alert("❗ Email already exists. Please use a different one.");
        } else {
          alert("Something went wrong!");
        }
      });
  };

  return (
<div className="d-flex justify-content-center align-items-center min-vh-100 bg-secondary">
<div className='w-50 bg-white text-dark rounded shadow p-4'>
        <h2 className='text-center mb-4'>Add User</h2>
        <form onSubmit={Submit}>
          <div className="mb-3">
            <label className="form-label">Name</label>
            <input
              type="text"
              className="form-control"
              placeholder='Enter your Name'
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Email address</label>
            <input
              type="email"
              className="form-control"
              placeholder='Enter your Email'
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Age</label>
            <input
              type="text"
              className="form-control"
              placeholder='Enter your Age'
              onChange={(e) => setAge(e.target.value)}
            />
          </div>
          <button type="submit" className="btn btn-success w-100">Create</button>
        </form>
      </div>
    </div>
  );
}

export default CreateUser;
