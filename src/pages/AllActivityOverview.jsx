import React, { useEffect, useState } from 'react';
import {Link, useHistory} from 'react-router-dom';
import axios from "axios";
import moment from "moment";




export default function AllActivityOverview() {

    const [allActivities, setAllActivities] = useState([]);
    const [isPending, setIsPending] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    let m = moment();
    let history = useHistory();


    useEffect(() => {
        axios.get("http://localhost:5000/campaign-tracker/all-activities").then((response) => {
            setAllActivities(response.data);
            setIsPending(false);
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
                                    <h4 className="mb-sm-0 font-size-18">Activity Overview</h4>
                                </div>
                            </div>
                        </div>{/* end of div row */}



                        <div className="row">
                            <div className="col-lg-12">
                                <div className="card">
                                    <div className="card-body">
                                            <div className="row">
                                                <div className="col-md-4">
                                                    <input class="form-control" type="text" onChange={e => { setSearchTerm(e.target.value)} } placeholder="Search activities..."/><br/>
                                                </div>
                                            </div>



                                        <div className="table-responsive">
                                            <table className="table align-middle table-nowrap mb-0" style={{fontSize: 10}}>

                                            <thead className="table-light" >
                                                <tr>
                                                    
                                                    <th className="align-middle">Brand</th>
                                                    <th className="align-middle">Campaign Name</th>
                                                    <th className="align-middle">Activity Name</th>
                                                    <th className="align-middle">Platform</th>
                                                    <th className="align-middle">Start Date</th>
                                                    <th className="align-middle">End Date</th>
                                                    <th className="align-middle">Created Date</th>
                                                    <th className="align-middle">Status</th>
                                                    <th className="align-middle"></th>
                                                </tr>
                                                </thead>
                                                <tbody>
                                                    {isPending && <tr><td colspan="7"><h3>Loading your shit...</h3></td></tr>}
                                                    {allActivities.filter((value) => { 
                                                        if(searchTerm == "") {
                                                            return value;
                                                        } else if(value.Campaign.brandName.toLowerCase().includes(searchTerm.toLowerCase()) || value.Campaign.client.toLowerCase().includes(searchTerm.toLowerCase()) || value.status.toLowerCase().includes(searchTerm.toLowerCase()) || value.platform.toLowerCase().includes(searchTerm.toLowerCase())) {
                                                            return value
                                                        }
                                                     }).map((value, key) => {                                                        
                                                        return (
                                                            <tr key={key}>
                                                            <td>{value.Campaign.brandName}</td>
                                                            <td>{value.Campaign.campaign_name}</td>
                                                            <td>{value.activityName}</td>
                                                            <td>{value.platform}</td>
                                                            <td>{value.startDate}</td>
                                                            <td>{value.endDate}</td>
                                                            <td>{moment(value.createdAt).format('MMMM Do YYYY, h:mm:ss a')}</td>
                                                            <td><span className="badge badge-pill  font-size-11" className={value.status === "Completed" ? "badge-soft-success" : value.status === "Pending" ? "badge-soft-danger" : "badge-soft-warning"}>{value.status}</span></td>                                                            
                                                            <td><span className="bx bx-pencil" onClick={() => { history.push(`/activity-view/${value.id}`)}}></span></td>
                                                            
                                                        </tr>
                                                        )
                                                    })}
                                              
                                                
                                                
                                                
                                            </tbody>


                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>{/** end of div column */}
                        </div>{/** end of div row */}



                    </div>
                </div>
            </div>
        </div>
    )
}
