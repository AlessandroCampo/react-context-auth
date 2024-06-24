import { useEffect, useRef, useState, useContext } from "react";
import CreatePost from "../components/PostComponents/CreatePost.jsx"
import Post from "../components/PostComponents/Post";
import Navbar from "../components/Navbar/Navbar";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

import { Error } from "@mui/icons-material";
import { useAuth } from "../contexts/AuthContext.jsx";
import { useGlobal } from "../GlobalState.jsx";




const Home = () => {

    const apiUrl = import.meta.env.VITE_API_URL;
    const { user, setUser } = useAuth();
    const { fetchUserData } = useGlobal();

    const [postList, setPostList] = useState([]);
    const [lastPage, setLastPage] = useState(1);
    const [totalPages, setTotalPages] = useState(2);

    const postContainer = useRef(null);

    const retrieveAuthData = async () => {
        const username = localStorage.getItem('reactUsername');
        if (!username) {
            //handle later
            return
        }
        const userData = await fetchUserData(username);
        if (!userData) {
            //handle later
            return
        }

        setUser(userData);
    }


    const fetchPosts = async (page = 1) => {
        const token = localStorage.getItem('authTokenReact');
        if (!token || page > totalPages) return
        const headers = {
            Authorization: `Bearer ${token}`
        };

        axios.get(`${apiUrl}posts?page=${page}`, { headers })
            .then((res) => {
                if (res) {
                    console.log(res);
                    setTotalPages(res.data.totalPages);
                    setPostList(oldList => [...oldList, ...res.data.allPosts]);
                }
            })
            .catch(err => console.error(err));

    }


    useEffect(() => {
        retrieveAuthData();
        fetchPosts();
    }, [])



    useEffect(() => {
        const handleScroll = async () => {
            if (postContainer.current) {
                const scrollTop = document.documentElement.scrollTop;
                const windowHeight = window.innerHeight;
                const containerHeight = postContainer.current.offsetHeight;
                const containerTop = postContainer.current.offsetTop;
                const bottomOfViewport = scrollTop + windowHeight;
                const triggerPoint = containerTop + containerHeight * 0.9;

                if (bottomOfViewport >= triggerPoint) {
                    console.log('triggered')
                    const token = localStorage.getItem('authTokenReact');
                    setLastPage(prevPage => {
                        const nextPage = prevPage + 1;
                        fetchPosts(nextPage);
                        return nextPage;
                    })
                    return
                }
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [postList]);

    const notifyError = (errorText) => {
        toast.error(errorText)
    }

    const notifySuccess = (text) => {
        toast.success(text)
    }

    return (
        <>

            <ToastContainer
                theme="dark"
                hideProgressBar
            />

            <div className="home-container overflow-auto">
                <div className="home-middle w-full flex items-center flex-col py-12">
                    <CreatePost
                        user={user}
                        setPostList={setPostList}
                        notifyError={notifyError}
                        notifySuccess={notifySuccess}
                        onPostCreate={(token) => { fetchPosts() }}
                    />
                    <div className="posts-container" ref={postContainer}>
                        {
                            postList.map((p, i) => {
                                return <Post
                                    key={p.id || `post-${i}`}
                                    post={p}
                                    setPostList={setPostList}
                                    width={350}


                                />
                            })

                        }

                    </div>
                </div>




            </div>

        </>
    )
}

export default Home;