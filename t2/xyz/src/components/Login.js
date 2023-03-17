import React, { useState } from "react"
import Header from './Header'
import { useNavigate } from "react-router-dom"

const Login = () => {
  const navigate = useNavigate()
  
  const [user, setUser] = useState({
    email: "",
    password: ""
  })
  const [msg, setmsg] = useState('')

  const handleChange = e => {
    const { name, value } = e.target
    setUser({
      ...user,
      [name]: value
    })

  }

  const handleSubmit = (event) => {
    event.preventDefault();
    fetch('http://localhost:8002/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email: user.email, password: user.password })
    })
      .then(response => response.json())
      .then(data => {
        if (data.message == "found") {
          localStorage.setItem('token',data.jwttoken)
          navigate('/')
        }
        setmsg(data.message)
        console.log(data.message);
      })
      .catch(error => console.error(error));
  };
  return (
    <div>
      <Header />
      <div>
        <br />
        <h3 style={{ textAlign: "center" }}>Retail Web Application</h3><br />
        <div className="login" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <div class="shadow p-3 mb-5 bg-body-tertiary rounded">
            <div classname='texts'  style={{ textAlign: "center" }}>
              <h1>Login</h1>
              <br></br>
              <div class="input-group flex-nowrap">
                <input type="text" class="form-control" name="email" value={user.email} onChange={handleChange} placeholder=" Enter your Email"></input>
              </div>
              <br></br>
              <input type="password" class="form-control" name="password" value={user.password} onChange={handleChange} placeholder=" Enter your Password" ></input>
              <br></br>
              <button className="btn btn-primary btn-sm" onClick={handleSubmit} >Log in</button>
              <br /><br/>{msg && (<p>{msg}<br /></p>)}
              <a href="/register">
                <button className="btn btn-link"  >New here? Register</button>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login;
