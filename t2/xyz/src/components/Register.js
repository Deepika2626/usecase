import React from 'react'
import Header from './Header'
import { useState } from "react"
import { useNavigate } from 'react-router-dom'


const Register = () => {
  const navigate = useNavigate()
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    fetch('http://localhost:8000/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email: email, password: password })
    })
      .then(response => response.json())
      .then(data => {
        console.log(data.message);
        setEmail('');
        setPassword('');
        if(data.message=="created"){
          alert("User created! log in now.")
          navigate('/login')
        }
      })
      .catch(error => console.error(error));
  };


  return (
    <div>
      <Header />
      <br /><br/>
      <h3 style={{ textAlign: "center" }}>Register Yourself</h3><br/>
      <div className="regster" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>

        <div class="shadow p-3 mb-5 bg-body-tertiary rounded">
          <div class="vox" style={{ textAlign: "center" }}>
            <h1>Register</h1>
            <br></br>
            <input type="text" class="form-control" name="email" value={email} placeholder="Your Name" onChange={(event) => setEmail(event.target.value)}></input>
            <br></br>
            <input type="password" class="form-control" name="password" value={password} placeholder="Password" onChange={(event) => setPassword(event.target.value)} required></input>
            <br></br>
            <button className="btn btn-primary btn-sm" type="submit" onClick={handleSubmit}>Register</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Register
