import React from 'react'
import {Helmet} from "react-helmet";


export default function Dashboard() {
    return (
        <div>
            <Helmet>
                <title>Dashboard | Socialrat</title>
            </Helmet>
            <div className="main-content">
                <div className="page-content">
                    <div className="container-fluid">
                      
                        <div className="row">
                            <div className="col-12">
                                <div className="page-title-box d-sm-flex align-items-center justify-content-between">
                                    <h4 className="mb-sm-0 font-size-18">Dashboard</h4>
                                    
                                </div>
                            </div>
                        </div>{/* end of div row */}

                    </div>
                </div>
            </div>
        </div>
    )
}
