import React, { useEffect, useState } from 'react'
import {Link, useHistory} from 'react-router-dom';
import axios from "axios";
import moment from "moment";
import {Helmet} from "react-helmet";




function AllCampaigns() {

    let m = moment();
    const [allCampaigns, setAllCampaigns] = useState([]);
    const [isPending, setIsPending] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    let history = useHistory();
    

    useEffect(() => {
        
        axios.get("https://socialrat.herokuapp.com/campaign-tracker/all-campaigns").then((response) => {
            setAllCampaigns(response.data);
            setIsPending(false);
        })

    }, []);

    return (
        <div>
            <Helmet>
                <title>All Campaigns | Socialrat</title>
            </Helmet>


            <div className="main-content">
                <div className="page-content">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-12">
                                <div className="page-title-box d-sm-flex align-items-center justify-content-between">
                                    <h4 className="mb-sm-0 font-size-18">All campaigns</h4>
                                    <Link to="/new-campaign"><button type="button" className="btn btn-success w-md">New Campaign</button></Link>
                                </div>
                            </div>
                        </div>{/* end of div row */}


                        <div className="row">
                        
                            
                        <div className="col-lg-12">
                                        <div className="card">
                                        <div className="card-body">

                                            <div className="row">
                                                <div className="col-md-4">
                                                    <input class="form-control" type="text" onChange={e => { setSearchTerm(e.target.value)} } placeholder="Search for your client or brand name.."/><br/>
                                                </div>
                                            </div>
                                            
                                            <div className="table-responsive">
                                            <table className="table align-middle table-nowrap mb-0">
                                                <thead className="table-light">
                                                <tr>
                                                    
                                                    <th className="align-middle">Campaign Name</th>
                                                    <th className="align-middle">Brand</th>
                                                    <th className="align-middle">Start Date</th>
                                                    <th className="align-middle">Planner</th>
                                                    <th className="align-middle">Created Date</th>
                                                    <th className="align-middle">Campaign Status</th>
                                                    <th className="align-middle">Actions</th>
                                                </tr>
                                                </thead>
                                                <tbody>
                                                    {isPending && <tr><td colspan="7"><h3>Loading your shit...</h3></td></tr>}
                                                    {allCampaigns.filter((value) => { 
                                                        if(searchTerm == "") {
                                                            return value;
                                                        } else if(value.brandName.toLowerCase().includes(searchTerm.toLowerCase()) || value.client.toLowerCase().includes(searchTerm.toLowerCase())) {
                                                            return value
                                                        }
                                                     }).map((value, key) => {                                                        
                                                        return (
                                                            <tr key={key}>
                                                            <td>{value.campaign_name}</td>
                                                            <td>{value.brandName}</td>
                                                            <td>{value.startDate}</td>
                                                            <td>{value.userCreated}</td>
                                                            <td>{moment(value.createdAt).format('MMMM Do YYYY, h:mm:ss a')}</td>
                                                            <td><span className="badge badge-pill  font-size-11" className={value.clientApproval === "Approved" ? "badge-soft-success" : value.clientApproval === "Pending" ? "badge-soft-danger" : "badge-soft-warning"}>{value.clientApproval}</span></td>                                                            
                                                            <td><span className="bx bx-pencil" onClick={() => { history.push(`/campaign-view/${value.id}`)}}></span></td>

                                                        </tr>
                                                        )
                                                    })}                                                                                      
                                                </tbody>
                                            </table>
                                            </div>
                                            {/* end table-responsive */}
                                        </div>
                                        </div>
                            </div>




                        </div>{/** end of div row */}



                        </div>{/* end of container fluid */}
                </div>
            </div>
        </div>
    )
}

export default AllCampaigns;
