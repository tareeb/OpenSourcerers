import { useState } from 'react';
import { Base_Url } from "../API"
import { useEffect  } from "react"

import toast, { Toaster,  } from 'react-hot-toast';
import HashLoader from "react-spinners/HashLoader";

import ListFilter from '../components/ListFilter'
import UserLists from '../components/UsersLists';

function ContributorsPage() {

    const [selectedTags, setSelectedTags] = useState([]);
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        setLoading(true);
        try{
            const tag_ids = selectedTags.map(tag => tag.id);
            fetch(Base_Url + 'usersbytag/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({tag_ids: tag_ids})
            }).then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                console.log(data.users);
                setUsers(data.users);
                setLoading(false);
            })
            .catch(error => {  
                toast.error('Error Connecting to Server');
                console.error(error);
                setLoading(false);
            });
        } catch (error) {
            console.log(error);
        }
    }, [selectedTags]);

  return (
    <>
        <section className='Hero-section' >
            <h1>OpenSource Contributors</h1>
        </section>

        <div style={{minHeight:"100vh"}}>

            <ListFilter 
                selectedTags={selectedTags} 
                setSelectedTags={setSelectedTags} >
            </ListFilter>

            <div style={{width:"100%" , display:"flex" , justifyContent : "center"}}>
                <HashLoader
                    color="#36d7b7" 
                    loading={loading}
                    size={60}
                    aria-label="Loading Spinner"
                    data-testid="loader"
                ></HashLoader>
            </div>

            <UserLists users={users} ></UserLists>

            <Toaster position="top-right" />

        </div>
       

    </>
  );
}

export default ContributorsPage;