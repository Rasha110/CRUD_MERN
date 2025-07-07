import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

function UpdateUser() {
  const { id } = useParams();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [age, setAge] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:3001/getUser/' + id)
      .then(result => {
        console.log(result);
        setName(result.data.name);
        setEmail(result.data.email);
        setAge(result.data.age);
      })
      .catch(err => console.log(err));
  }, []);

  const Update = (e) => {
    e.preventDefault();
    axios.put('http://localhost:3001/updateUser/' + id, { name, email, age })
      .then(result => {
        console.log(result);
        navigate("/");
      })
      .catch(err => console.log(err));
  };

  return (
<div className="d-flex justify-content-center align-items-center bg-secondary py-5" style={{ minHeight: '100vh' }}>
<div className="bg-white text-dark rounded shadow p-4" style={{ width: "400px", minHeight: "auto" }}>


        <h2 className="text-center mb-4">Update User</h2>
        <form onSubmit={Update}>
          <div className="mb-3">
            <label className="form-label">Name</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter your Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Email address</label>
            <input
              type="email"
              className="form-control"
              placeholder="Enter your Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Age</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter your Age"
              value={age}
              onChange={(e) => setAge(e.target.value)}
            />
          </div>

          <button type="submit" className="btn btn-primary w-100">Update</button>
        </form>
      </div>
    </div>
  );
}

export default UpdateUser;
