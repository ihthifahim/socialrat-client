import React, { useEffect, useState} from 'react';
import {Link, useParams, useHistory} from 'react-router-dom';
import axios from "axios";
import {Helmet} from "react-helmet";


export default function CampaignsSingleView() {

    let {id} = useParams();
    const [campaignDetails, setCampaignDetails] = useState({});
    const [clientDetails, setClientDetails] = useState([]);
    const [brandName, setBrandName] = useState([]);
    const [selectedClient, setSelectedCLient] = useState([]);
    const [campaignActivities, setCampaignActivities] = useState([]);

    const [isPending, setIsPending] = useState(false);

    //form values
    const [client, setClient] = useState("");
    const [brand, setBrand] = useState("");
    const [campaignName, setCampaignName] = useState("");
    const [clientApproval, setClientApproval] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [notes, setNotes] = useState("");
   
    

    useEffect(() => {
        axios.get(`https://socialrat.herokuapp.com/campaign-tracker/campaign-view/${id}`).then((response) => {
            setCampaignDetails(response.data);
            setClient(response.data.client);
            setCampaignName(response.data.campaign_name);
            setBrand(response.data.brandName);
            setClientApproval(response.data.clientApproval);
            setStartDate(response.data.startDate);
            setEndDate(response.data.endDate);
            setNotes(response.data.notes);
            
        });

        axios.get("https://socialrat.herokuapp.com/campaign-tracker/client-details").then((response) => {
            setClientDetails(response.data);
        });

        axios.get(`https://socialrat.herokuapp.com/campaign-tracker/campaign-activity/${id}`).then((response) => {
            setCampaignActivities(response.data);
        });
        
        

    }, []);


    let history = useHistory();

    useEffect(() => {
        axios.get(`https://socialrat.herokuapp.com/campaign-tracker/brand-name/${campaignDetails.client}`).then((response) => {
            setSelectedCLient(response.data);
        });


    }, [campaignDetails]);


   const selectedClientOptions = (e) => {
        const clientName = e.target.value;
        
        if(clientName == "none"){
            setSelectedCLient([]);
        } else {
            axios.get(`https://socialrat.herokuapp.com/campaign-tracker/brand-name/${clientName}`).then((response) => {
                setSelectedCLient(response.data);
                setClient(clientName);
            });
        }

   }



   const handleSubmit = (e) => {
       setIsPending(true);
        e.preventDefault();
        axios.put(`https://socialrat.herokuapp.com/campaign-tracker/campaign-details/edit/${id}`, { campaignName: campaignName, client: client, brandName: brand, clientApproval: clientApproval, startDate: startDate, endDate: endDate, notes: notes}).then((response) => {
            
            window.location.reload();
            setIsPending(false);
           
        });
       
   }

 



    return (
        <div>

            <Helmet>
                <title>{campaignName} | Socialrat</title>
            </Helmet>


             <div className="main-content">
                <div className="page-content">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-12">
                                <div className="page-title-box d-sm-flex align-items-center justify-content-between">
                                    <h4 className="mb-sm-0 font-size-18">{campaignName}</h4>
                                    
                                </div>
                            </div>
                        </div>{/* end of div row */}


                        <div className="row">
                            <div className="col-12">
                                <div className="card">
                                    <div className="card-body">


                                        <form onSubmit={handleSubmit}>
                                            <div className="row">
                                                <div className="col-md-6">
                                                <div className="mb-3">
                                                    <label className="form-label">Client</label>
                                                    <select id="formrow-inputState" onChange={selectedClientOptions}  className="form-select">
                                                    <option value="none">Choose...</option>
                                                    {clientDetails.map((value, key) => <option key={key} selected={campaignDetails.client == value.client_name} value={value.client_name}>{value.client_name}</option>)}
                                                    </select>
                                                </div>
                                                </div>
                                                <div className="col-md-6">
                                                <div className="mb-3">
                                                    <label className="form-label">Brand</label>
                                                    <select id="formrow-inputState" className="form-select" onChange={(e) => { setBrand(e.target.value)}}>
                                                    <option >Choose...</option>
                                                    {selectedClient.map((value, key) => <option key={key} selected={campaignDetails.brandName == value} value={value}>{value}</option>)}
                                                    </select>
                                                </div>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-md-8">
                                                <div className="mb-3">
                                                    <label className="form-label">Campaign Name</label>
                                                    <input type="text" className="form-control" id="formrow-email-input" defaultValue={campaignDetails.campaign_name} onChange={(e) => setCampaignName(e.target.value)} />
                                                </div>
                                                </div>
                                                <div className="col-md-4">
                                                <div className="mb-3">
                                                    <label className="form-label">Client Approval</label>
                                                    <select id="formrow-inputState" className="form-select" onChange={(e) => setClientApproval(e.target.value)}>
                                                    <option value="none">Choose...</option>
                                                    <option value="Approved" selected={campaignDetails.clientApproval == "Approved"} >Approved</option>
                                                    <option value="Pending" selected={campaignDetails.clientApproval == "Pending"}>Pending</option>
                                                    </select>
                                                </div>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-md-6">
                                                <div className="mb-3">
                                                    <label htmlFor="formrow-email-input" className="form-label">Campaign Start Date</label>
                                                    <input class="form-control" type="date" id="example-date-input" defaultValue={campaignDetails.startDate} onChange={(e) => setStartDate(e.target.value)}/>
                                                </div>
                                                </div>
                                                <div className="col-md-6">
                                                <div className="mb-3">
                                                    <label htmlFor="formrow-password-input" className="form-label">Campaign End Date</label>
                                                    <input class="form-control" type="date" id="example-date-input" defaultValue={campaignDetails.endDate} onChange={(e) => setEndDate(e.target.value)}/>
                                                </div>
                                                </div>
                                            </div>

                                            <div className="mb-3">
                                                    <label htmlFor="formrow-email-input" className="form-label">Campaign Notes</label>
                                                    <textarea id="basicpill-address-input" class="form-control" rows="2" defaultValue={campaignDetails.notes} onChange={(e) => setNotes(e.target.value)}></textarea>
                                            </div>

                                            
                                            <div>
                                                {!isPending && <button type="submit" className="btn btn-primary w-md">Update Campaign Details</button>}
                                                {isPending && <button type="submit" className="btn btn-primary w-md" disabled>Please wait campaign updating...</button>}
                                                
                                            </div>
                                        </form>





                                    </div>
                                </div>
                            </div>
                        </div>{/** end of div row card */}


                   



                        <div className="row">
                            <div className="col-12">
                                <div className="page-title-box d-sm-flex align-items-center justify-content-between">
                                    <h4 className="mb-sm-0 font-size-18"><br/><br/>Campaign Activities</h4>
                                    <Link to={`/new-activity/${id}`}><button type="button" className="btn btn-success w-md">New Activity</button></Link>
                                </div>
                            </div>
                            <div className="col-lg-12">
                                <div className="card">
                                    <div className="card-body">
                                        <div className="table-responsive">
                                            <table className="table align-middle table-nowrap mb-0">

                                            <thead className="table-light">
                                                <tr>
                                                    
                                                    <th className="align-middle">RO #</th>
                                                    <th className="align-middle">Activity Name</th>
                                                    <th className="align-middle">Platform</th>
                                                    <th className="align-middle">Budget USD</th>
                                                    <th className="align-middle">Start Date</th>
                                                    <th className="align-middle">End Date</th>
                                                    <th className="align-middle">Status</th>
                                                    <th className="align-middle">Actions</th>
                                                </tr>
                                                </thead>
                                                <tbody>
                                                    {campaignActivities.map((value, key) => {
                                                        return (
                                                            <tr>
                                                                <td>{value.ro_number}</td>
                                                                <td>{value.activityName}</td>
                                                                <td>{value.platform}</td>
                                                                <td>{value.budgetUSD}</td>
                                                                <td>{value.startDate}</td>
                                                                <td>{value.endDate}</td>
                                                                
                                                                <td><span className="badge badge-pill" style={{fontSize: 10}} className={value.status === "Completed" ? "badge-soft-success" : value.status === "Pending" ? "badge-soft-danger" : "badge-soft-warning"}>{value.status}</span></td>
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




                    </div>{/** end of container fluid */}
                </div>
            </div>

        </div>
    )
}
