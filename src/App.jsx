
import { Outlet } from 'react-router-dom';
import Layout from './views/layouts/Layout';


const App = () => {




    return (
        <Layout>
            <Outlet />
        </Layout>
    );
};

export default App;