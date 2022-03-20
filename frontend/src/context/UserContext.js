import React, { useState, createContext, useEffect } from 'react';

export const UserContext = createContext();

const initialUser = null;

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(initialUser);

    useEffect(() => {
        if (sessionStorage.getItem('id')) { 
            setUser({ id: sessionStorage.getItem('id'), 
                name: sessionStorage.getItem('name'), 
                email: sessionStorage.getItem('email') }); 
        }
    }, []);

    return (
        <UserContext.Provider value={{ user, setUser }}>
            { children }
        </UserContext.Provider>
    );
}

export const addSessionStorage = (name, email, id) => {
    sessionStorage.setItem('user', email);
    sessionStorage.setItem('name', name);
    sessionStorage.setItem('id', id);
}
