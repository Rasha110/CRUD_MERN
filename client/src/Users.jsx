import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function Users() {
  const [users, setUsers] = useState([
    {
      Name: "rasha",
      Email: "example@email.com",
      Age: 20
    }
  ]);

  useEffect(() => {
    axios.get('http://localhost:3001')
      .then(result => setUsers(result.data))
      .catch(err => console.log(err));
  }, []);

  const handleDelete = (id) => {
    axios.delete('http://localhost:3001/deleteUser/' + id)
      .then(res => {
        console.log(res);
        window.location.reload();
      })
      .catch(err => console.log(err));
  };

  return (
<div className='d-flex flex-column vh-100 bg-secondary justify-content-center align-items-center'>     <h1 className='text-white mb-4'>CRUD App</h1>
      <div className='w-75 bg-light text-dark rounded shadow p-4'>
        <div className='d-flex justify-content-between align-items-center mb-3'>
          <h4 className='mb-0'>User List</h4>
          <Link to="/create" className="btn btn-success">Add +</Link>
        </div>

        <table className="table table-striped table-hover">
          <thead className='table-dark'>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Age</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {
              users.map((user, index) => (
                <tr key={index}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.age}</td>
                  <td>
                    <div className="d-flex gap-2">
                      <Link to={`/update/${user._id}`} className="btn btn-primary">Update</Link>
                      <button className='btn btn-sm btn-danger' onClick={() => handleDelete(user._id)}>Delete</button>
                    </div>
                  </td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Users;
