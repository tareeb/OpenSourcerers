import { useState } from 'react';
import { useEffect} from 'react';
import { useParams } from 'react-router-dom';
import { Base_Url } from "../API"
import React from "react";
import { Link } from "react-router-dom";

import toast, { Toaster,  } from 'react-hot-toast';
import HashLoader from "react-spinners/HashLoader";

import SemanticSearch from "../components/SemanticSearch"

import './ProjectDetailPage.css'

import ProjectDetailForm from "../components/ProjectDetailForm"


function ProjectDetailPage(){
    
    const { projectId , projectTitle }  = useParams();
    const [projectData, setProjectData] = useState();
    const [loading, setLoading] = useState(true);

    const userid = localStorage.getItem('id');
    const [creator , setCreator] = useState(false);
    const [projectOpen, setProjectOpen] = useState(false);

    useEffect(() => {
        if(projectData){
            if(projectData.created_by_id === parseInt(userid)){
                setCreator(true);
            }else{
                setCreator(false);
            }
        }
    }, [projectData]);

    
    useEffect(() => {
        setLoading(true);
        try{
            fetch( Base_Url + `/project/${projectId}/`)
            .then(res => res.json())
            .then(data => {
                console.log(data);
                setProjectData(data);
                setLoading(false);
            })
            .catch(error => {  
                toast.error('Error Connecting to Server');
                console.error(error);
                setLoading(false);
            });
        } catch (err) {
            console.log(err);
        }
    }, [projectId]);
    
    return(
        <>
            <section className='Hero-section' >
                <h1>{projectTitle}</h1>
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

            { projectData &&
            <div className='projectdetails'>

                {creator && <div className='editprofile-button-container'>

                <button onClick={() => {  setProjectOpen(true); }} >Edit Project Details</button>
                <ProjectDetailForm
                        open={projectOpen}
                        onCreate={() => {  setProjectOpen(false); }}
                        onCancel={() => {  setProjectOpen(false); }}
                        update={true}
                        projectData={projectData}
                ></ProjectDetailForm>

                </div>}
                
                <div className='projectdescription'>
                    <p>{projectData.description}</p>
                </div>
                
                {
                    creator && <div className='recomendation-container'>
                    <SemanticSearch
                        values={
                            {
                                search : "user",
                                query : projectData.description
                            }
                        }
                    ></SemanticSearch>
            </div>
                }

                <div className='projectcreation'>
                    
                    <Link to={`/userdetails/${projectData.created_by}/${projectData.created_by_id}`}
                        style={{ textDecoration: "none", color:"black"}}>
                        <p>Created by: <span> {projectData.created_by} </span> </p>
                    </Link>
                    <p>Created on: <span> {projectData.start_date} </span> </p>
                    
                </div>
                
                <div className='projecttags'>
                    <h1>Project Tags</h1>
                    <ul className='tagslist'>
                        {projectData.tags.length === 0 ? <p> No tags found </p> : null }
                        {projectData.tags.map
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

export default ProjectDetailPage;