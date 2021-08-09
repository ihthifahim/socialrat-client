import React, {useEffect, useState} from 'react';
import axios from "axios";
import { useHistory } from 'react-router-dom';

export default function Topbar({user}) {

    const [authState, setAuthState] = useState(false);
    const [userInfo, setUserInfo] = useState("");

    let history = useHistory();

    useEffect(() => {
        axios.get("https://socialrat.herokuapp.com/auth/auth", {headers: { accessToken: localStorage.getItem("accessToken")}}).then((response) => {
          if(response.data.error){
            setAuthState(false)
            
          } else {
            setAuthState(true);
            setUserInfo(response.data.firstname);
            
          }
        })
      }, [])

      const logout = () => {
          localStorage.removeItem("accessToken");
          history.push("/login");

      }


    return (
        <div>
            <header id="page-topbar">
                <div className="navbar-header">
                    <div className="d-flex">
                    {/* LOGO */}
                    <div className="navbar-brand-box">
                    <a href="index.html" className="logo logo-dark">
                        <span className="logo-sm">
                        <img src="/assets/images/logo.svg" alt height={22} />
                        </span>
                        <span className="logo-lg">
                        <img src="/assets/images/logo-dark.png" alt height={40} />
                        </span>
                    </a>
                    <a href="index.html" className="logo logo-light">
                        <span className="logo-sm">
                        <img src="/assets/images/logo-light.svg" alt height={22} />
                        </span>
                        <span className="logo-lg">
                        <img src="/assets/images/logo-light.png" alt height={40} />
                        </span>
                    </a>
                    </div>
                    
                
                    
                    </div>
                    <div className="d-flex">
                        
                        <div className="dropdown d-inline-block">
                        <button type="button" className="btn header-item waves-effect" id="page-header-user-dropdown" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                           
                            <span className="d-none d-xl-inline-block ms-1" key="t-henry">{userInfo}</span>
                            <i className="mdi mdi-chevron-down d-none d-xl-inline-block" />
                        </button>
                        <div className="dropdown-menu dropdown-menu-end">
                            {/* item*/}
                            <div className="dropdown-divider" />
                            <a className="dropdown-item text-danger" href="#" onClick={logout}><i className="bx bx-power-off font-size-16 align-middle me-1 text-danger" /> <span key="t-logout">Logout</span></a>
                        </div>
                        </div>
                    
                    </div>
                </div>
            </header>
        </div>
    )
}
