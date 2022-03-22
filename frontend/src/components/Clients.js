import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { AddRounded } from '@mui/icons-material';
import { Autocomplete, Container, Grid, TextField } from "@mui/material";
import NewClientModal from "./NewClientModal";
import ClientCard from "./ClientCard";

export default function Clients() {
    const [newClientModal, setNewClientModal] = useState(false);
    const [totalClients, setTotalClients] = useState([]);
    const [filterClients, setFilterClients] = useState([]);
    const [isNewClient, setIsNewClient] = useState(false);
    const [search, setSearch] = useState();

    useEffect(() => {
        const fetchData = async () => {
            const res = await fetch( 'http://localhost:3001/api/v1/list-customer', { method: 'GET'} );
            const data = await res.json();
            setTotalClients(data.customer);
            setFilterClients(data.customer);
            console.log(data.customer);
        }
        fetchData();
    }, [isNewClient]);

    const handleChange = (e) => {
        setSearch(e.target.value);
        filterSearch(e.target.value);
    }

    const filterSearch = (termino) => {
        let resultSearch = totalClients.filter( (element) => {
            if (element.name.toString().toLowerCase().includes(termino.toLowerCase()) || 
                element.lastName.toString().toLowerCase().includes(termino.toLowerCase())){
                    return element;
                }
        } );
        setFilterClients(resultSearch);
    }

    return <>
        <ContainerClients>
            <Header>
                <SearchInput onChange={handleChange} value={search} placeholder='Busqueda por nombre o apellido' />
                <SearchButton onClick={() => setNewClientModal(true)}> <AddRounded /> </SearchButton>
            </Header>
            <ContentClients>
                <Grid container >
                    { filterClients.map( (data, idx) => {
                        return ( <Grid item xs={3} key={idx} >
                            <ClientCard id={data._id} 
                                        name={data.name} 
                                        lastName={data.lastName} 
                                        sex={data.sex} />
                        </Grid> );
                    } ) }
                    
                </Grid>
            </ContentClients>
        </ContainerClients>
        { newClientModal && <NewClientModal 
            setNewClientModal={setNewClientModal} 
            setIsNewClient={setIsNewClient} 
            isNewClient={isNewClient} /> }
    </>;
}

const ContainerClients = styled.div`
    width: 100%;
    height: 100%;
`;

const Header =styled.header`
    width: 100%;
    height: 10%;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const SearchInput = styled.input`
    height: 2.2em;
    width: 70%;
    padding-left: 1rem;
    font-size: 1.2rem;
    border: none;
    border-radius: 1rem 0rem 0rem 1rem;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    background-color: #EFEFEF;

    &:focus {
        outline: 2px solid #D1A991;
    }
`;

const SearchButton = styled.button`
    margin-left: .5rem;
    height: 3.5em;
    border: none;
    border-radius: 0rem 1rem 1rem 0rem;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    color: white;
    background-color: #D1A991;

    &:hover {
        transform: scale(110%);
    }

    &:active {
        transform: scale(95%);
    }
`;


const ContentClients = styled(Container)`
    margin-top: 1em;
`;

