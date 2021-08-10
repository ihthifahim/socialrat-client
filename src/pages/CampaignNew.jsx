import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router';
import {Helmet} from "react-helmet";

export default function CampaignNew() {

    let history = useHistory();

    const [selectedClient, setSelectedClient] = useState([]);
    const [clientDetails, setClientDetails] = useState([]);
    const [isPending, setIsPending] = useState(false);

    const [client, setClient] = useState("");
    const [brand, setBrand] = useState("");
    const [campaignName, setCampaignName] = useState("");
    const [clientApproval, setClientApproval] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [notes, setNotes] = useState("");

    useEffect(() => {
        axios.get("https://socialrat.herokuapp.com/campaign-tracker/client-details").then((response) => {
            setClientDetails(response.data);
        })
    }, []);


    const selectedClientOptions = (e) => {
        const clientName = e.target.value;
        if(clientName == "none"){
            setSelectedClient([]);
        } else {
            axios.get(`https://socialrat.herokuapp.com/campaign-tracker/brand-name/${clientName}`).then((response) => {
                setSelectedClient(response.data);  
                setClient(clientName);   
            });
        }

    }

    const handleSubmit = (e) => {
        setIsPending(true);
        e.preventDefault();
        const newCampaign = [client, brand, campaignName, clientApproval, startDate, endDate, notes];

        axios.post("https://socialrat.herokuapp.com/campaign-tracker/campaign-details", newCampaign, {
            headers: {
                accessToken: localStorage.getItem("accessToken"),
            }
        }).then((response) => {
          
            if(response.data.error) {
                history.push("/login");
            } else {
                if(response.data == "successfull"){
                    history.push("/all-campaigns");
                }
            }
            
        })
    }


    return (
        <div>
            <Helmet>
                <title>Create new Campaign | Socialrat</title>
            </Helmet>


            <div className="main-content">
                <div className="page-content">
                    <div className="container-fluid">
                        
                        <div className="row">
                            <div className="col-12">
                                <div className="page-title-box d-sm-flex align-items-center justify-content-between">
                                    <h4 className="mb-sm-0 font-size-18">Create new Campaign</h4>
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
                                                    <select id="formrow-inputState" onChange={selectedClientOptions} className="form-select">
                                                    <option value="none">Choose...</option>
                                                    {clientDetails.map((value, key) => <option key={key} value={value.client_name}>{value.client_name}</option>)}
                                                    </select>
                                                </div>
                                                </div>
                                                <div className="col-md-6">
                                                <div className="mb-3">
                                                    <label className="form-label">Brand</label>
                                                    <select id="formrow-inputState" className="form-select" onChange={(e) => setBrand(e.target.value)}>
                                                    <option>Choose...</option>
                                                    {selectedClient.map((value, key) => <option key={key} value={value}>{value}</option>)}
                                                    </select>
                                                </div>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-md-8">
                                                <div className="mb-3">
                                                    <label className="form-label">Campaign Name</label>
                                                    <input type="text" className="form-control" id="formrow-email-input" onChange={(e) => setCampaignName(e.target.value)} />
                                                </div>
                                                </div>
                                                <div className="col-md-4">
                                                <div className="mb-3">
                                                    <label className="form-label">Client Approval</label>
                                                    <select id="formrow-inputState" className="form-select" onChange={(e) => setClientApproval(e.target.value)}>
                                                    <option value="none">Choose...</option>
                                                    <option value="Approved">Approved</option>
                                                    <option value="Pending">Pending</option>
                                                    </select>
                                                </div>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-md-6">
                                                <div className="mb-3">
                                                    <label htmlFor="formrow-email-input" className="form-label">Campaign Start Date</label>
                                                    <input class="form-control" type="date"  onChange={(e) => setStartDate(e.target.value)} id="example-date-input" />
                                                </div>
                                                </div>
                                                <div className="col-md-6">
                                                <div className="mb-3">
                                                    <label htmlFor="formrow-password-input" className="form-label">Campaign End Date</label>
                                                    <input class="form-control" type="date"  onChange={(e) => setEndDate(e.target.value)} id="example-date-input" />
                                                </div>
                                                </div>
                                            </div>

                                            <div className="mb-3">
                                                    <label htmlFor="formrow-email-input" className="form-label">Campaign Notes</label>
                                                    <textarea id="basicpill-address-input" class="form-control" rows="2" onChange={(e) => setNotes(e.target.value)}></textarea>
                                            </div>

                                            
                                            <div>
                                            {!isPending && <button type="submit" className="btn btn-success w-md">Create Campaign</button>}
                                            {isPending && <button type="submit" className="btn btn-primary w-md" disabled>Creating new campaign. Please wait....</button>}
                                            
                                                
                                            </div>
                                        </form>





                                    </div>
                                </div>
                            </div>
                        </div>{/** end of div row card */}




                    </div>
                </div>
            </div>



        </div>
    )
}
