import React, { useEffect, useState } from 'react'
import {Link, useHistory} from 'react-router-dom'
import axios from "axios";

export default function AllClients() {

    const history = useHistory();
    const [clientDetails, setClientDetails] = useState([]);

    useEffect(() => {

        axios.get("http://localhost:5000/campaign-tracker/client-details").then((response) => {
            setClientDetails(response.data);    
        })

    }, []);



    


    return (
        <div>
            <div className="main-content">
                <div className="page-content">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-12">
                                <div className="page-title-box d-sm-flex align-items-center justify-content-between">
                                    <h4 className="mb-sm-0 font-size-18">All Clients</h4>
                                    <Link to="/new-client"><button type="button" className="btn btn-success w-md">New Client</button></Link>
                                </div>
                            </div>
                        </div>{/* end of div row */}

                        <div className="row">
                            <div className="col-lg-12">
                                <div className="card">
                                    <div className="card-body">
                                        <div className="table-responsive">
                                            <table className="table align-middle table-nowrap mb-0">
                                                <thead className="table-light">
                                                    <tr> 
                                                        <th className="align-middle">Client Name</th>
                                                        <th className="align-middle">Brand</th>
                                                        <th className="align-middle">Actions</th>
                                                    </tr>
                                                </thead>

                                                <tbody>
                                                    
                                                    {clientDetails.map((value, key) => {
                                                        return (
                                                            <tr>

                                                            <td>{value.client_name}</td>
                                                            <td>{value.brands}</td>
                                                            
                                                            <td><span className="bx bx-pencil" onClick={() => { history.push(`/edit-client/${value.id}`)}}></span></td>

                                                        </tr>
                                                        )
                                                    })}                                                                                      
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>{/** end of column card */}
                            </div>{/** end of column  */}
                        </div>{/** end of table row */}
                    </div>
                </div>
            </div>
        </div>
    )
}
