import React, { useState, useEffect } from 'react';
import { Container, Grid } from "@mui/material";
import FormLaboratory from './FormLaboratory';

export default function Laboratory() {
    const [labsArray, setLabsArray] = useState();
    const [client, setClient] = useState();
    useEffect(() => {
        const fetchClient = async () => {
            const res = await fetch(`http://localhost:3001/api/v1/list-labs`, 
                    { method: 'GET'} );
            const data = await res.json();
            setLabsArray(data.labs);
        }
        fetchClient();
    }, []);

    useEffect(() => {
        const fetchClient = async () => {
            const res = await fetch(`http://localhost:3001/api/v1/id-customer/${sessionStorage.getItem('idClient')}`, 
                    { method: 'GET'} );
            const data = await res.json();
            setClient(data.customer);
        }
        fetchClient();
    }, []);

    return <>
        <Container>
            <Grid container >
                <Grid item xs={12} >
                    <FormLaboratory labsArray={labsArray} client={client} />
                </Grid>
            </Grid>
        </Container>
    </>;
}
