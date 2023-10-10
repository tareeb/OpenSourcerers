import { Base_Url } from '../API';
import { useState } from 'react';

import ProjectLists from "../components/ProjectsList"
import UserLists from "../components/UsersLists"

import toast, { Toaster,  } from 'react-hot-toast';
import { HashLoader } from 'react-spinners';

const SemanticSearch = ({values}) => {

    const [list , setlist ] = useState([]);
    const [loading, setLoading] = useState(false);

    const search = async (values) => {
        setLoading(true);
        try {
          const requestBody = {
            query: values.query, 
            search: values.search, 
          };
          
          console.log(requestBody);

          const response = await fetch(Base_Url + 'semanticsearch/', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestBody),
          });
      
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
      
          const data = await response.json();
          console.log("semacnticcc" , data); 
          setlist(data.ids);
          
          setLoading(false);
      
        } catch (error) {
            setLoading(false);
            toast.error('Error: ', error);
          console.error('Error:', error);
        }
    };

    return (
        <>
            <button onClick={() => {search(values)}}
                style={{
                    marginBottom: "10px",
                    backgroundColor: "#1c4e71ba",
                    color: "white",
                    borderRadius: "5px",
                    padding: "10px",
                    border: "2px solid #0a3654",
                    cursor:"pointer"
                }}
            >Get Recommendations</button>

            {loading && <div style={{width:"100%" , display:"flex" , justifyContent : "center" , marginTop:"50px" ,
                        marginBottom:"50px"}}>
                        <HashLoader
                            color="#36d7b7" 
                            loading={loading}
                            size={60}
                            aria-label="Loading Spinner"
                            data-testid="loader"
                        ></HashLoader>
            </div>}

            {list.length>0 && values.search === "project" ? 
                <ProjectLists projects={list}></ProjectLists> : 
                <UserLists users={list}></UserLists>}

            <Toaster position="top-right" />

        </>

    );
};

export default SemanticSearch;