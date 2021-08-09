import React, {useEffect } from 'react'
import {useHistory}  from 'react-router-dom';

export default function NotFoundPage() {

    let history = useHistory();

    useEffect(() => {
        history.push("/dashboard");
    })


    return (
        <div>
            
        </div>
    )
}
