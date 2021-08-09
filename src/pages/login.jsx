import React, { useState, useContext } from 'react'
import axios from "axios";
import {useHistory} from "react-router-dom";

import { AuthContext } from '../helpers/AuthContext';



export default function Login() {

  let history = useHistory();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [isPending, setIsPending] = useState(false);
    const {setAuthState} = useContext(AuthContext);

    const handleSubmit = (e) => {
        setIsPending(true);
        e.preventDefault();

        const loginData = [username, password];
        console.log(username);
        axios.post("http://localhost:5000/auth/login", loginData).then((response) => {
            if(response.data.error){
              alert(response.data.error);
            } else {
              localStorage.setItem("accessToken", response.data);
              history.push("/dashboard");
            }
        })
    }

    return (
        <div>
        <div className="container-fluid p-0">
          <div className="row g-0">
            <div className="col-xl-9">
              <div className="auth-full-bg pt-lg-5 p-4">
                <div className="w-100">
                  <div className="bg-overlay" />
                  <div className="d-flex h-100 flex-column">
                    <div className="p-4 mt-auto">
                      <div className="row justify-content-center">
                        <div className="col-lg-7">
                          <div className="text-center">
                            
                            
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* end col */}
            <div className="col-xl-3">
              <div className="auth-full-page-content p-md-5 p-4">
                <div className="w-100">
                  <div className="d-flex flex-column h-100">
                    <div className="mb-4 mb-md-5">
                      <a href="index.html" className="d-block auth-logo">
                        <img src="assets/images/logo-dark.png" alt="" height={40} className="auth-logo-dark" />
                        <img src="assets/images/logo-light.png" alt="" height={40} className="auth-logo-light" />
                      </a>
                    </div>
                    <div className="my-auto">
                      <div>
                        <h5 className="text-primary">Sign in to continue</h5>
                        
                      </div>
                      <div className="mt-4">
                        <form onSubmit={handleSubmit}>
                          <div className="mb-3">
                            <label htmlFor="username" className="form-label">Username</label>
                            <input type="text" className="form-control" id="username" placeholder="Enter username" onChange={(e) => setUsername(e.target.value)} />
                          </div>
                          <div className="mb-3">
                            
                            <label className="form-label">Password</label>
                            <div className="input-group auth-pass-inputgroup">
                              <input type="password" className="form-control" placeholder="Enter password" aria-label="Password" onChange={(e) => setPassword(e.target.value)} />
                              
                            </div>
                          </div>
                          
                          <div className="mt-3 d-grid">
                            <button className="btn btn-primary waves-effect waves-light" type="submit">Log In</button>
                          </div>
                          
                        </form>
                        
                      </div>
                    </div>
                    <div className="mt-4 mt-md-5 text-center">
                      <p className="mb-0">©  Socialrat</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* end col */}
          </div>
          {/* end row */}
        </div>
        {/* end container-fluid */}
      </div>
    )
}
