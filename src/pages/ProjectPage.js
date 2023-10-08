import { useState } from 'react';
import { Base_Url } from "../API"
import { useEffect  } from "react"

import toast, { Toaster,  } from 'react-hot-toast';
import HashLoader from "react-spinners/HashLoader";

import ListFilter from '../components/ListFilter'
import ProjectLists from '../components/ProjectsList';

function ProjectPage() {

    const [selectedTags, setSelectedTags] = useState([]);
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        if(selectedTags.length === 0){
            try{
                fetch(Base_Url + 'allprojects/')
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json();
                })
                .then(data => {
                    console.log(data.projects);
                    setProjects(data.projects);
                    setLoading(false);
                })
                .catch(error => {  
                    toast.error('Error Connecting to Server');
                    console.error(error);
                    setLoading(false);
                });
                return;
            }
            catch(error){
                console.log(error);
            }
        }else{
            try {
                const tag_ids = selectedTags.map(tag => tag.id);
                fetch(Base_Url + 'projectsbytag/', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ tag_ids: tag_ids })
                })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json();
                })
                .then(data => {
                    setLoading(false);
                    console.log(data.projects);
                    setProjects(data.projects);
                })
                .catch(error => {  
                    toast.error('Error Connecting to Server');
                    console.error(error);
                    setLoading(false);
                });
            } catch (error) {
                console.log(error);
            }
        }
    }, [selectedTags]);
    

  return (
    <>
        <section className='Hero-section' >
            <h1>OpenSource Projects</h1>
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

            <ProjectLists projects={projects}></ProjectLists>   

            <Toaster position="top-right" />

        </div>

   

    </>
  );
}

export default ProjectPage;