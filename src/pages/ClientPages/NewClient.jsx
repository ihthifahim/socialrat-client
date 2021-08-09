import React, { useState, useEffect } from 'react';
import axios from "axios";
import { useHistory } from "react-router-dom";

export default function NewClient() {


    const [clientName, setClientName] = useState("");
    const [brands, setBrands] = useState("");
    const [ isPending, setPending ] = useState(false);

    let history = useHistory();

    const handleSubmit = (e) => {
        e.preventDefault();
        const newClient = [brands, clientName]
        axios.post("https://socialrat.herokuapp.com/campaign-tracker/new-client", newClient).then((response) => {
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
                                    <h4 className="mb-sm-0 font-size-18">Create new Client</h4>
                                </div>
                            </div>
                        </div>{/* end of div row */}


                        <div className="row">
                            <div className="col-12">
                                <div className="card">
                                    <div className="card-body">

                                        <form onSubmit={handleSubmit}>
                                            <div className="mb-3">
                                                    <label htmlFor="formrow-email-input" className="form-label">Client Name</label>
                                                    <input type="text" className="form-control" id="formrow-email-input"  onChange={(e) => setClientName(e.target.value)} />
                                            </div>

                                            <div className="mb-3">
                                                    <label htmlFor="formrow-email-input" className="form-label">Brands Notes</label>
                                                    <textarea id="basicpill-address-input" class="form-control" rows="2" onChange={(e) => setBrands(e.target.value)}></textarea>
                                            </div>

                                            
                                            <div>
                                            {!isPending && <button type="submit" className="btn btn-success w-md">Create Client</button>}
                                            {isPending && <button type="submit" className="btn btn-success w-md" disabled>Creating Client</button>}
                                            
                                                
                                            </div>
                                        </form>





                                    </div>
                                </div>
                            </div>
                        </div>{/** end of div row */}

                    </div>
                </div>
            </div>
        </div>
    )
}
