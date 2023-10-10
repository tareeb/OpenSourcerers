import { Select } from 'antd';
import { Button, Form, Input } from 'antd';
import { Base_Url } from '../API';
import { useState } from 'react';

import ProjectLists from "../components/ProjectsList"
import UserLists from "../components/UsersLists"

import toast, { Toaster,  } from 'react-hot-toast';
import { HashLoader } from 'react-spinners';

const SemanticSearchPage = () => {

   

    const [form] = Form.useForm();
    const [listType , setlisttype ] = useState("none");
    const [list , setlist ] = useState([]);

    const [loading, setLoading] = useState(false);

    const { TextArea } = Input;

    const search = async (values) => {
        setLoading(true);
        try {
          const requestBody = {
            query: values.query, 
            search: values.search, 
          };
      
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
          console.log(data); 
          setlist(data.ids);
          
          setLoading(false);
      
        } catch (error) {
            setLoading(false);
            toast.error('Error: ', error);
          console.error('Error:', error);
        }
      };

    const handlesearch = () => {
        form
        .validateFields()
        .then((values) => {
            console.log(values);
            setlisttype(values.search);
            search(values);
            form.resetFields(['query']);

        })
        .catch((info) => {
            console.log('Validate Failed:', info);
        });
    }

    return (
        <>  
            <section className='Hero-section' >
                    <h1>Semantic Search</h1>
            </section>

            <div className='searchpage-container' style={{padding:"5% 8%"}}>

                <Form form={form} layout="vertical" name="search-form"
                    style={{
                        padding: "0% 10%",
                    }}
                    initialValues={{
                        search : "project",
                        query : "",
                    }}
                >
                
                    <Form.Item  name="search" label="Search For ">
                        <Select
                            style={{ width: 120 }}
                            options={[
                                { value: 'project', label: 'Projects' },
                                { value: 'user', label: 'Users' },
                                
                            ]}
                        />
                        
                    </Form.Item>

                    <Form.Item  name="query" label="Search Query"
                         help="Please provide a clear description of what/Whom you're looking for."
                         rules={[
                            {
                            required: true,
                            message: 'Please Enter your search query',
                            },
                        ]}>
                        <TextArea rows={4}  placeholder='You are free to write in any style 
                        But for better results consider including:
                        Domain , Key Terms , Experience etc'/>
                    </Form.Item>


                    <Form.Item >
                        <Button type="primary" onClick={handlesearch} style={{
                            width:"50%",
                            margin:"2% 25%"
                            }}>
                            Search
                        </Button>
                    </Form.Item>

                </Form>

                <div style={{width:"100%" , display:"flex" , justifyContent : "center" , marginTop:"50px"}}>
                        <HashLoader
                            color="#36d7b7" 
                            loading={loading}
                            size={60}
                            aria-label="Loading Spinner"
                            data-testid="loader"
                        ></HashLoader>
                </div>
                
                {listType === "project" ? 
                <ProjectLists projects={list}></ProjectLists> : 
                <UserLists users={list}></UserLists>}
                
            </div>

            <Toaster position="top-right" />


        </>
    );
};
    
export default SemanticSearchPage;