import React, {useEffect } from 'react'
import {useHistory}  from 'react-router-dom';

export default function 404() {

    let history = useHistory();

    useEffect(() => {
        history.push("/dashboard");
    })


    return (
        <div>
            
        </div>
    )
}
