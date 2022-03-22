import React, { useState, createContext, useEffect } from 'react';

export const UserContext = createContext();

const initialValue = null;

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(initialValue);
    const [client, setClient] = useState(initialValue);

    useEffect(() => {
        if (sessionStorage.getItem('id')) { 
            setUser({ id: sessionStorage.getItem('id'), 
                name: sessionStorage.getItem('name'), 
                email: sessionStorage.getItem('email') }); 
        }
        if (sessionStorage.getItem('idClient')) {
            setClient({id: sessionStorage.getItem('idClient'), 
                sex: sessionStorage.getItem('sexClient') });
        }
    }, []);

    return (
        <UserContext.Provider value={{ user, setUser, client, setClient }}>
            { children }
        </UserContext.Provider>
    );
}

export const addUserSessionStorage = (name, email, id) => {
    sessionStorage.setItem('user', email);
    sessionStorage.setItem('name', name);
    sessionStorage.setItem('id', id);
}

export const addClientSessionStorage = (id, sex) => {
    sessionStorage.setItem('idClient', id);
    sessionStorage.setItem('sexClient', sex);
}