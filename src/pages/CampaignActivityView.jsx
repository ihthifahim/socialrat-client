import React, {useEffect, useState} from 'react';
import { Link, useParams, useHistory } from 'react-router-dom';
import axios from 'axios';

export default function CampaignActivityView() {

    const history = useHistory();
    let {id} = useParams();

    const [activityDetails, setActivityDetails] = useState([]);

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
    const [status, setStatus] = useState("");
    const [activityNotes, setActivityNotes] = useState("");
    


    useEffect(() => {
        axios.get(`http://localhost:5000/campaign-tracker/campaign-activity/edit/${id}`).then((response) => {
            setActivityDetails(response.data);
            setActivityName(response.data.activityName);
            setRoNumber(response.data.ro_number);
            setPlatform(response.data.platform);
            setBudgetLKR(response.data.budgetLKR);
            setBudgetUSD(response.data.budgetUSD);
            setStartDate(response.data.startDate);
            setEndDate(response.data.endDate);
            setPrimaryKPI(response.data.primaryKPI);
            setSecondaryKPI(response.data.secondaryKPI);
            setCreativeLink(response.data.creativeLink);
            setStatus(response.data.status);
            setActivityNotes(response.data.activityNotes);
            
        });
    
    }, []);


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
        e.preventDefault();
        
        
        
        axios.put(`http://localhost:5000/campaign-tracker/campaign-activity/edit/${id}`, { roNumber: roNumber, activityName: activityName, platform: platform, budgetLKR: budgetLKR, budgetUSD: budgetUSD, primaryKPI: primaryKPI, secondaryKPI: secondaryKPI, creativeLink: creativeLink, startDate: startDate, endDate: endDate, status: status, comments: activityNotes })
        .then((response) => {
            history.goBack();
            
        })
    }

    


    return (
        <div>
            <div className="main-content">
                <div className="page-content">
                    <div className="container-fluid">
                        <div className="row">
                                <div className="col-12">
                                    <div className="page-title-box d-sm-flex align-items-center justify-content-between">
                                        <h4 className="mb-sm-0 font-size-18">{activityName}</h4>
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
                                                    <input type="text" className="form-control" id="formrow-email-input" defaultValue={activityDetails.activityName} onChange={(e) => { setActivityName(e.target.value) }} />
                                            </div>


                                            <div className="row">
                                                <div className="col-md-6">
                                                <div className="mb-3">
                                                    <label className="form-label">RO Number</label>
                                                    <input type="text" className="form-control" id="formrow-email-input" defaultValue={activityDetails.ro_number} onChange={(e) => { setRoNumber(e.target.value) }}/>
                                                </div>
                                                </div>
                                                <div className="col-md-6">
                                                <div className="mb-3">
                                                    <label className="form-label" >Platform</label>
                                                    <select id="formrow-inputState" className="form-select" onChange={(e) => { setPlatform(e.target.value) }}>
                                                    <option value="none">Choose...</option>
                                                    
                                                    <option selected={activityDetails.platform == "Facebook"} value="Facebook">Facebook</option>
                                                    <option selected={activityDetails.platform == "Instagram"} value="Instagram">Instagram</option>
                                                    <option selected={activityDetails.platform == "Youtube"} value="Youtube">Youtube</option>
                                                    <option selected={activityDetails.platform == "Google"} value="Google">Google</option>
                                                    <option selected={activityDetails.platform == "Twitter"} value="Twitter">Twitter</option>
                                                    
                                                    </select>
                                                </div>
                                                </div>
                                            </div>

                                            <div className="row">
                                                <div className="col-md-6">
                                                <div className="mb-3">
                                                    <label className="form-label">Budget LKR (with Commission)</label>
                                                    <input type="text" className="form-control" id="formrow-email-input" defaultValue={activityDetails.budgetLKR} onChange={handleLKR} />
                                                </div>
                                                </div>
                                                <div className="col-md-6">
                                                <div className="mb-3">
                                                    <label className="form-label">Budget USD (without Commission)</label>
                                                    <input type="text" className="form-control" id="formrow-email-input" defaultValue={activityDetails.budgetUSD} onChange={handleUSD} />
                                                </div>
                                                </div>
                                            </div>


                                            
                                            <div className="row">
                                                <div className="col-md-6">
                                                <div className="mb-3">
                                                    <label htmlFor="formrow-email-input" className="form-label">Start Date</label>
                                                    <input class="form-control" type="date" defaultValue={activityDetails.startDate} id="example-date-input" onChange={(e) => { setStartDate(e.target.value) }} />
                                                </div>
                                                </div>
                                                <div className="col-md-6">
                                                <div className="mb-3">
                                                    <label htmlFor="formrow-password-input" className="form-label">End Date</label>
                                                    <input class="form-control" type="date" defaultValue={activityDetails.endDate} id="example-date-input" onChange={(e) => { setEndDate(e.target.value) }}/>
                                                </div>
                                                </div>
                                            </div>

                                            <div className="row">
                                                <div className="col-md-6">
                                                <div className="mb-3">
                                                    <label className="form-label">Primary KPI</label>
                                                    <input type="text" className="form-control" id="formrow-email-input" defaultValue={activityDetails.primaryKPI} onChange={(e) => { setPrimaryKPI(e.target.value) }}/>
                                                </div>
                                                </div>
                                                <div className="col-md-6">
                                                <div className="mb-3">
                                                    <label className="form-label">Secondary KPI</label>
                                                    <input type="text" className="form-control" id="formrow-email-input" defaultValue={activityDetails.secondaryKPI} onChange={(e) => { setSecondaryKPI(e.target.value) }}/>
                                                </div>
                                                </div>
                                            </div>

                                            <div className="row">
                                                <div className="col-md-6">
                                                <div className="mb-3">
                                                    <label className="form-label">Creative Link</label>
                                                    <input type="text" className="form-control" id="formrow-email-input" defaultValue={activityDetails.creativeLink} onChange={(e) => { setCreativeLink(e.target.value) }} />
                                                </div>
                                                </div>
                                                <div className="col-md-6">
                                                <div className="mb-3">
                                                    <label className="form-label">Status</label>
                                                    <select id="formrow-inputState" className="form-select" onChange={(e) => { setStatus(e.target.value) }}>
                                                    
                                                    <option selected={activityDetails.status == "In-review"} value="In-review">In-Review</option>
                                                    <option selected={activityDetails.status == "Pending"} value="Pending">Pending</option>
                                                    <option selected={activityDetails.status == "Completed"} value="Completed">Completed</option>
                                                    
                                                    </select>
                                                </div>
                                                </div>
                                            </div>



                                            <div className="mb-3">
                                                    <label htmlFor="formrow-email-input" className="form-label">Activity Notes</label>
                                                    <textarea id="basicpill-address-input" class="form-control" rows="2" defaultValue={activityDetails.comments} onChange={(e) => { setActivityNotes(e.target.value) }}></textarea>
                                            </div>

                                            
                                            <div>
                                                <button type="submit" className="btn btn-success w-md">Update Activity</button>
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
