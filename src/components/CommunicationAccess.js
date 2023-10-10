import React, { useState, useEffect } from "react";
import {Button,} from "antd"
import { Base_Url } from '../API';

import toast, { Toaster,  } from 'react-hot-toast';


const CommunicationAccess = ({userid}) => {

    const [requestList, setRequestList] = useState([]);
    const [givenaccess , setGivenAccess] = useState([]);

    useEffect(() => {
    
        async function fetchData() {
          try {
            const response = await fetch(Base_Url + `/ihavesent/${userid}/`);
            
            if (!response.ok) {
              throw new Error(`Request failed with status: ${response.status}`);
            }
            
            const data = await response.json();
            setRequestList(data.access_list);
            console.log(data.access_list);
          } catch (error) {
            console.log(error);
          }
        }

        async function fetchData2() {
            try {
                const response = await fetch(Base_Url + `/ihaverecieved/${userid}/`);
                
                if (!response.ok) {
                  throw new Error(`Request failed with status: ${response.status}`);
                }
                
                const data = await response.json();
                setGivenAccess(data.access_list);
                console.log(data.access_list);
              } catch (error) {
                console.log(error);
              }
            }
    
        fetchData();
        fetchData2();
      }, []);

    const handleAcceptRequest = async (id) => {
        console.log(id);
        try {
          const response = await fetch(Base_Url + `requestaccept/${id}`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          });
    
          if (response.ok) {
            const data = await response.json();
            toast.success("Request Accepted");
          } else {
            toast.error('Error accepting access request');
          }
        } catch (error) {
          console.error('Error:', error);
        } 
      };
    


    return (
        <div className="communicationlinks">
           <div>
                <h1>Communication Links Sent</h1>
                <ul style={{listStyle:"none"}}>
                    {requestList.map((access) => (
                    <li key={access.id} className="card">
                        <div>To : {access.to_this_person}</div>
                        <div>Status: {access.request_status}</div>
                        <div>Email: {access.email}</div>
                        <div>Message : {access.message}</div>
                    </li>
                    ))}
                </ul>
            </div>

            <div>
                <h1>Communication Links Recieved</h1>
                <ul style={{listStyle:"none"}}>

                    {givenaccess.map((access) => (
                    <li key={access.id} className="card">
                        <div>From : {access.has_access_to}</div>
                        <div>Status: {access.request_status}</div>
                        <div>Message : {access.message}</div>
                        <div>id : {access.id}</div>

                        {access.request_status === "requested" ? 
                            <Button type="primary" block={true} size='small' shape='round'
                                style={{width:"100px" , margin:"5px"}}
                                onClick={()=>{handleAcceptRequest(access.id)}}
                            >Approve</Button>
                        : null}
                    </li>
                    ))}
                </ul>
            </div>
            
            <Toaster position="top-right" />

        </div>
    );
}

export default CommunicationAccess;
