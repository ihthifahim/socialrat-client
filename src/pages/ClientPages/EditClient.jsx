import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {useParams, useHistory} from 'react-router-dom';

export default function EditClient() {

    const {id} = useParams();
    const history = useHistory();
    const [clientDetails, setClientDetails] = useState([]);

    const [clientName, setClientName] = useState("");
    const [brands, setBrands] = useState("");
    const [isPending, setIsPending] = useState(false);

    useEffect(() => {
        axios.get(`http://localhost:5000/campaign-tracker/client-details/edit/${id}`).then((response) => {
            setClientDetails(response.data); 
            setClientName(response.data.client_name);
            setBrands(response.data.brands);   
        })
    },[]);

    const handleSubmit = (e) => {
        setIsPending(true);
        e.preventDefault();
        axios.put(`http://localhost:5000/campaign-tracker/client-details/edit/${id}`, { client_name: clientName, brands: brands }).then((response) => {
            if(response.data == "Updated"){
                setIsPending(false);
                history.goBack();
            }
        });
        

    }

    return (
        <div>
            <div className="main-content">
                <div className="page-content">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-12">
                                <div className="page-title-box d-sm-flex align-items-center justify-content-between">
                                    <h4 className="mb-sm-0 font-size-18">{clientName}</h4>
                                    
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
                                                    <input type="text" className="form-control" id="formrow-email-input" defaultValue={clientDetails.client_name} onChange={(e) => setClientName(e.target.value)} />
                                            </div>

                                            <div className="mb-3">
                                                    <label htmlFor="formrow-email-input" className="form-label">Brands Notes</label>
                                                    <textarea id="basicpill-address-input" class="form-control" rows="2" defaultValue={clientDetails.brands} onChange={(e) => setBrands(e.target.value)}></textarea>
                                            </div>

                                            
                                            <div>
                                            {!isPending && <button type="submit" className="btn btn-success w-md">Edit Client</button>}
                                            {isPending && <button type="submit" className="btn btn-success w-md" disabled>Editing Client</button>}
                                            
                                                
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
