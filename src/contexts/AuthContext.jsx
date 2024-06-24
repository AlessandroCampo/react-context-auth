import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(undefined);
    const [token, setToken] = useState('');
    const navigate = useNavigate();

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

    const logout = async () => {
        setToken('');
        localStorage.removeItem('authTokenReact');
        return navigate('/login')
    }

    useEffect(() => {
        const existingToken = localStorage.getItem('authTokenReact');
        console.log(existingToken, 'should redirect');
        if (!existingToken) {
            return navigate('/login')
        }
    }, [])

    const value = {
        user,
        token,
        login,
        logout
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )

}

const useAuth = function () {
    return useContext(AuthContext);
}

export { AuthProvider, useAuth }