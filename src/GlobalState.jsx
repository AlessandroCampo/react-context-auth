
import { createContext, useContext, useState } from "react";
import { toast } from 'react-toastify';
import axios from 'axios';
const apiUrl = import.meta.env.VITE_API_URL;

const GlobalContext = createContext();

const GlobalProvider = ({ children }) => {
    const fetchUserData = async (username) => {
        const token = localStorage.getItem('authTokenReact');

        if (!token || !username) return
        const headers = {
            Authorization: `Bearer ${token}`
        };


        try {
            const { data } = await axios.get(`${apiUrl}users/${username}`, { headers })
            if (data) {
                console.log(data.user);
                return (data.user)
            }
        } catch (err) {
            console.error(err);
        }
    }

    const notifyError = (errorText) => {
        toast.error(errorText)
    }

    const notifySuccess = (text) => {
        toast.success(text)
    }






    const value = {
        fetchUserData,
        notifySuccess,
        notifyError
    }

    return (
        <GlobalContext.Provider value={value}>
            {children}
        </GlobalContext.Provider>
    )

}

const useGlobal = function () {

    return useContext(GlobalContext);
}

export { GlobalProvider, useGlobal }