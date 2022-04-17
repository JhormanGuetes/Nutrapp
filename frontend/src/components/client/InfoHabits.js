import React, { useState, useEffect } from 'react';
import { Container, Grid } from "@mui/material";
import FormInfoGeneral from './FormInfoGeneral';
import FormBackground from './FormBackground';
import FormEatingHabits from './FormEatingHabits'
import FormPsychobiologicalHabits from './FormPsychobiologicalHabits';


export default function InfoHabits() {
    const [dataJson, setDataJson] = useState();
    useEffect(() => {
        const fetchClient = async () => {
            const res = await fetch(`http://localhost:3001/api/v1/id-customer/${sessionStorage.getItem('idClient')}`, 
                    { method: 'GET'} );
            const data = await res.json();
            setDataJson(data.customer);
        }
        fetchClient();
    }, []);

    

    return <>
        <Container>
            <Grid container >
                <Grid item xs={6} >
                    <FormInfoGeneral dataJson={dataJson} />
                    <FormBackground dataJson={dataJson} />
                </Grid>
                <Grid item xs={6} >
                    <FormPsychobiologicalHabits dataJson={dataJson} />
                </Grid>
                <Grid item xs={12} >
                    <FormEatingHabits dataJson={dataJson} />
                </Grid>
            </Grid>
        </Container>
    </>;
}
