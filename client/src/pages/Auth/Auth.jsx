import React, { useState } from 'react'
import './Auth.css'
// import Logo from '../../img/SchoolLogo.png'
import Logo from '../../img/cit log_1.gif'
import {useDispatch, useSelector} from 'react-redux'
import { logIn, signUp } from '../../actions/AuthAction'

const Auth = () =>{
  const dispatch = useDispatch()
  const loading = useSelector((state)=>state.authReducer.loading)
  const [isSignUp, setIsSignUp] = useState(true)
  console.log(loading)
  const [data, setData] = useState({username: "", firstname: "", lastname: "", password: "", confirmpass: ""})

  const [confirmPass, setConfirmPass] = useState(true)
  const handleChange = (e)=>{
    setData({...data, [e.target.name]: e.target.value})
  }

  //Check both password
  const handleSubmit = (e)=>{
    e.preventDefault();

    if(isSignUp){
      data.password === data.confirmpass ? dispatch(signUp(data)) : setConfirmPass(false)
    }
    else{
      dispatch(logIn(data))
    }
  }

  //Clears form
  const resetForm = ()=>{
    setConfirmPass(true)
    setData({username: "", firstname: "", lastname: "", password: "", confirmpass: ""})
  }
    return(
        <div className="Auth">
          {/* Left Side */}
            <div className="a-left">
                <img src={Logo} alt="" />
                <div className="Webname">
                    <h1>TeknoKonek</h1>
                    <h6>Connecting peeps, one click, one wink.</h6>
                </div>
            </div>
          {/* Right Side  */}
          <div className="a-right">
            <form className="infoForm authForm" onSubmit={handleSubmit}>
              <h3>{isSignUp ? "Sign Up" : "Login"}</h3>

              {isSignUp && (
                <div>
                    <input
                      type="text"
                      placeholder="First Name"
                      className="infoInput"
                      name="firstname"
                      onChange={handleChange}
                      value={data.firstname}
                    />  
                    <input
                      type="text"
                      placeholder="Last Name"
                      className="infoInput"
                      name="lastname"
                      onChange={handleChange}
                      value={data.lastname}
                    />
                </div>
              )}
  
              <div>
                <input
                  type="text"
                  className="infoInput"
                  name="username"
                  placeholder="Username"
                  onChange={handleChange}
                  value={data.username}
                />
              </div>
      
              <div>
                <input
                  type="password"
                  className="infoInput"
                  name="password"
                  placeholder="Password"
                  onChange={handleChange}
                  value={data.password}
                />
                {isSignUp && (
                  <input
                    type="password"
                    className="infoInput"
                    name="confirmpass"
                    placeholder="Confirm Password"
                    onChange={handleChange}
                    value={data.confirmpass}
                  />
                )}
              </div>
              <span style={{display: confirmPass? "none": "block", color: 'red', fontSize: '12px', alignSelf: 'flex-end', marginRight: '5px'}}>
                  * Both password are not identical. Please try again 
              </span>
            <div>
              <span style={{fontSize: '12px', cursor: 'pointer'}} onClick={()=>{setIsSignUp((prev)=>!prev); resetForm()}}> 
                {isSignUp ?  "Already have an account? Log In!" : "Don't have an account? Sign Up!"}
              </span>
            </div>
            <button className="button infoButton" type="submit" disabled={loading}>
              {loading? "Loading..." : isSignUp ? "Sign Up" : "Log In"}
            </button>
          </form> 
        </div>
      </div>
      )
}

export default Auth