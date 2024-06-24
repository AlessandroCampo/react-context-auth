import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(undefined);
    const [token, setToken] = useState('');

    const login = async (paylod = {
        username: 'Aleks7',
        password: 'Pass123!'
    }) => {

        try {
            const { data } = await axios.post(`${apiUrl}users/login`, paylod);
            if (data) {
                localStorage.setItem('authTokenReact', data.token)
                setUser(data.user);
                setToken(data.token);

            }
        } catch (err) {
            console.error(err);
        }
    }

    useEffect(() => {

    }, [])


    return (
        <AuthContext.Provider
            value={
                {
                    user,
                    token,
                    login
                }
            }
        >

        </AuthContext.Provider>
    )

}