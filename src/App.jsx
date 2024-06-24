
import { Outlet } from 'react-router-dom';
import Layout from './views/layouts/Layout';
import { useEffect } from 'react';


const App = () => {

    useEffect(() => {
        const existingToken = localStorage.getItem('authTokenReact');
        console.log(existingToken, 'should redirect');
        if (!existingToken) {
            return navigate('/login')
        }
    }, [])


    return (
        <Layout>
            <Outlet />
        </Layout>
    );
};

export default App;