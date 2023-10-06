import { useState } from 'react';
import { useEffect} from 'react';
import { useParams } from 'react-router-dom';
import { Base_Url } from "../API"

import toast, { Toaster,  } from 'react-hot-toast';
import HashLoader from "react-spinners/HashLoader";

import './UserDetailPage.css'

function UserDetailPage(){
    
    const { userId , username } = useParams();
    const [userData, setUserData] = useState();
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        setLoading(true);
        try{
            fetch( Base_Url + `/user/${userId}/`)
            .then(res => res.json())
            .then(data => {
                console.log(data);
                setUserData(data);
                setLoading(false);
            }).catch(error => {  
                toast.error('Error Connecting to Server');
                console.error(error);
                setLoading(false);
            });
        } catch (err) {
            console.log(err);
        }
    }, [userId]);
    
    return(
        <>
            <section className='Hero-section' >
                <h1>{username}</h1>
            </section>

            <div style={{width:"100%" , display:"flex" , justifyContent : "center" , marginTop:"50px"}}>
                        <HashLoader
                            color="#36d7b7" 
                            loading={loading}
                            size={60}
                            aria-label="Loading Spinner"
                            data-testid="loader"
                        ></HashLoader>
            </div>

            {userData &&
                <div className='userdetails'>
                    
                    <div className='userbio'>
                        <p>{userData.bio}</p>
                    </div>

                    
                    <div className='usertags'>
                        <h1>User Tags</h1>
                        <ul className='tagslist'>
                            {userData.tags.length === 0 ? <p> No tags found </p> : null}
                            {userData.tags.map
                                (item => (
                                    <li 
                                    key={item.id}
                                    className='tag'
                                    style={{cursor: "default"}}
                                    ><p>{item.name}</p></li>
                                    ))}
                        </ul>
                    </div>
            </div>}

            <Toaster position="top-right" />

        </>
    );
}

export default UserDetailPage;