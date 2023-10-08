import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useState } from 'react';
import { Base_Url } from "../API"

import { Link } from 'react-router-dom';

import toast, { Toaster,  } from 'react-hot-toast';
import HashLoader from "react-spinners/HashLoader";

import UserDetailForm from "../components/UserDetailForm"
import ProjectDetailForm from "../components/ProjectDetailForm"

import './UserDetailPage.css';

function UserProfilePage() {

    const username = localStorage.getItem('username');
    const userId = localStorage.getItem('id');
    const userUuid = localStorage.getItem('uuid');
    const navigate = useNavigate();

    const [userData, setUserData] = useState();
    const [loading, setLoading] = useState(true);
    const [reloadUserData, setReloadUserData] = useState(false);

    
    const [open, setOpen] = useState(false);
    const [projectOpen, setProjectOpen] = useState(false);

    useEffect(() => {
        if (!userId) {
        console.log("No user found");
         navigate('/loginrequest')
        }
    }, [userId, navigate]);

    useEffect(() => {
    if(userId){
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
    }
    }, [userId , reloadUserData]);


  return (
    <>
      <section className='Hero-section'>
        {userId ? (
          <h1>Welcome, {username}</h1>
        ) : null }
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

        <div className='editprofile-button-container'>

            <button onClick={() => {  setProjectOpen(true); }} >Create a Porject</button>
            <ProjectDetailForm
                    open={projectOpen}
                    onCreate={() => {  setProjectOpen(false); }}
                    onCancel={() => {  setProjectOpen(false); }}
                    update={false}
            ></ProjectDetailForm>

            <button onClick={() => {  setOpen(true); }} >Edit Your Profile</button>
            <UserDetailForm
                 open={open}
                 onCreate={() => {  setOpen(false); }}
                 onCancel={() => {  setOpen(false); }}
                 userData={userData}
                 setReloadUserData={setReloadUserData}
            ></UserDetailForm>

            
        </div>
                
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

            <div className='userprojects' style={{}}>
                <h1>User Projects</h1>
                <div className='projectslist' style={{display:"flex", flexDirection:"column" , gap:"10px"}}>
                    {userData.projects.length === 0 ? <p> No projects found </p> : null}
                    {userData.projects.map
                        (project => (
                            <Link to={`/projectadmin/${project.title}/${project.id}`}
                                  style={{color:"black" , width:"fit-content"}}
                                  key={project.id}
                            >
                                <p>{project.title}</p>
                            </Link>
                            ))}
                </div>
            </div>

        </div>
        }

        <Toaster position="top-right" />


    </>
  );
}

export default UserProfilePage;
