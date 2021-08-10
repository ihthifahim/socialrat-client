import React, {useState} from 'react';
import axios from "axios";
import {useParams, useHistory } from "react-router-dom";
import {Helmet} from "react-helmet";

export default function CampaignActivityNew() {

    const history = useHistory();

    let CampaignId = useParams();
    const [activityName, setActivityName] = useState("");
    const [roNumber, setRoNumber] = useState("");
    const [platform, setPlatform] = useState("");
    const [budgetLKR, setBudgetLKR] = useState("");
    const [budgetUSD, setBudgetUSD] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [primaryKPI, setPrimaryKPI] = useState("");
    const [secondaryKPI, setSecondaryKPI] = useState("");
    const [creativeLink, setCreativeLink] = useState("");
    const [status, setStatus] = useState("Pending");
    const [activityNotes, setActivityNotes] = useState("");

    const [isPending, setIsPending] = useState(false);

    const handleLKR = (e) => {
        // const newBudgetLKR = parseFloat(budgetLKR.replace(/[^\d\.\-]/g, ""));
        // const newBudgetUSD = parseFloat(budgetUSD.replace(/[^\d\.\-]/g, ""));
        setBudgetLKR(parseFloat(e.target.value.replace(/[^\d\.\-]/g, "")))
    }

    const handleUSD = (e) => {
        // const newBudgetLKR = parseFloat(budgetLKR.replace(/[^\d\.\-]/g, ""));
        // const newBudgetUSD = parseFloat(budgetUSD.replace(/[^\d\.\-]/g, ""));
        setBudgetUSD(parseFloat(e.target.value.replace(/[^\d\.\-]/g, "")))
    }

    const handleSubmit = (e) => {
        setIsPending(true);
        e.preventDefault();
        const newActivity = [activityName, roNumber, platform, budgetLKR, budgetUSD, startDate, endDate, primaryKPI, secondaryKPI, creativeLink, status, activityNotes, CampaignId.data];
        axios.post("https://socialrat.herokuapp.com/campaign-tracker/campaign-activitynew", {
            budgetLKR: budgetLKR,
            budgetUSD: budgetUSD,
            startDate: startDate,
            endDate: endDate,
            primaryKPI: primaryKPI,
            secondaryKPI: secondaryKPI,
            comments: activityNotes,
            creativeLink: creativeLink,
            status: status,
            ro_number: roNumber,
            activityName: activityName,
            platform: platform, 
            CampaignId: CampaignId.id
        }).then((response) => {
            setIsPending(false);
            history.goBack();

        })
        
    }

    return (
        <div>
            <Helmet>
                <title>Create New Campaign Activity | Socialrat</title>
            </Helmet>

                       <div className="main-content">
                <div className="page-content">
                    <div className="container-fluid">
                        <div className="row">
                                <div className="col-12">
                                    <div className="page-title-box d-sm-flex align-items-center justify-content-between">
                                        <h4 className="mb-sm-0 font-size-18">New Activity for Campaign Name</h4>
                                    </div>
                                </div>
                        </div>{/* end of div row */}





                        <div className="row">
                            <div className="col-12">
                                <div className="card">
                                    <div className="card-body">


                                        <form onSubmit={handleSubmit}>
                                            <div className="mb-3">
                                                    <label htmlFor="formrow-email-input" className="form-label">Activity Name</label>
                                                    <input type="text" className="form-control" id="formrow-email-input" onChange={(e) => { setActivityName(e.target.value)}} />
                                            </div>


                                            <div className="row">
                                                <div className="col-md-6">
                                                <div className="mb-3">
                                                    <label className="form-label">RO Number</label>
                                                    <input type="text" className="form-control" id="formrow-email-input" onChange={(e) => { setRoNumber(e.target.value)}}/>
                                                </div>
                                                </div>
                                                <div className="col-md-6">
                                                <div className="mb-3">
                                                    <label className="form-label">Platform</label>
                                                    <select id="formrow-inputState" className="form-select" onChange={(e) => { setPlatform(e.target.value)}}>
                                                    <option value="none">Choose...</option>
                                                    <option value="Facebook">Facebook</option>
                                                    <option value="Instagram">Instagram</option>
                                                    <option value="Youtube">Youtube</option>
                                                    <option value="Google">Google</option>
                                                    <option value="Twitter">Twitter</option>
                                                    </select>
                                                </div>
                                                </div>
                                            </div>

                                            <div className="row">
                                                <div className="col-md-6">
                                                <div className="mb-3">
                                                    <label className="form-label">Budget LKR (with Commission)</label>
                                                    <input type="text" className="form-control" required id="formrow-email-input" onChange={handleLKR} />
                                                </div>
                                                </div>
                                                <div className="col-md-6">
                                                <div className="mb-3">
                                                    <label className="form-label">Budget USD (without Commission)</label>
                                                    <input type="text" className="form-control" required id="formrow-email-input" onChange={handleUSD}/>
                                                </div>
                                                </div>
                                            </div>


                                            
                                            <div className="row">
                                                <div className="col-md-6">
                                                <div className="mb-3">
                                                    <label htmlFor="formrow-email-input" className="form-label">Start Date</label>
                                                    <input class="form-control" type="date" required  id="example-date-input" onChange={(e) => { setStartDate(e.target.value)}} />
                                                </div>
                                                </div>
                                                <div className="col-md-6">
                                                <div className="mb-3">
                                                    <label htmlFor="formrow-password-input" className="form-label">End Date</label>
                                                    <input class="form-control" type="date" required id="example-date-input" onChange={(e) => { setEndDate(e.target.value)}} />
                                                </div>
                                                </div>
                                            </div>

                                            <div className="row">
                                                <div className="col-md-6">
                                                <div className="mb-3">
                                                    <label className="form-label">Primary KPI</label>
                                                    <input type="text" className="form-control" id="formrow-email-input" onChange={(e) => { setPrimaryKPI(e.target.value)}} />
                                                </div>
                                                </div>
                                                <div className="col-md-6">
                                                <div className="mb-3">
                                                    <label className="form-label">Secondary KPI</label>
                                                    <input type="text" className="form-control" id="formrow-email-input" onChange={(e) => { setSecondaryKPI(e.target.value)}} />
                                                </div>
                                                </div>
                                            </div>

                                            <div className="row">
                                                <div className="col-md-6">
                                                <div className="mb-3">
                                                    <label className="form-label">Creative Link</label>
                                                    <input type="text" className="form-control" id="formrow-email-input"  onChange={(e) => { setCreativeLink(e.target.value)}}/>
                                                </div>
                                                </div>
                                                <div className="col-md-6">
                                                <div className="mb-3">
                                                    <label className="form-label">Status</label>
                                                    <select id="formrow-inputState" className="form-select" disabled >                                                    
                                                    <option value="Pending">Pending</option>

                                                    
                                                    </select>
                                                </div>
                                                </div>
                                            </div>



                                            <div className="mb-3">
                                                    <label htmlFor="formrow-email-input" className="form-label">Activity Notes</label>
                                                    <textarea id="basicpill-address-input" class="form-control" rows="2" onChange={(e) => { setActivityNotes(e.target.value)}}></textarea>
                                            </div>

                                            
                                            <div>
                                                <button type="submit" className="btn btn-success w-md">Create new Activity</button>
                                            </div>
                                        </form>





                                    </div>
                                </div>
                            </div>
                        </div>{/** end of div row card */}



                    </div>{/** container fluid */}
                </div>{/** page content div */}
            </div>{/** main content div */}
        </div>
    )
}
