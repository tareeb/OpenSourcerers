import { Button, Form, Input, Modal } from 'antd';
import React, { useEffect, useState } from 'react';
import { Base_Url } from '../API';
import ListFilter from "./ListFilter"
import toast, { Toaster,  } from 'react-hot-toast';


const UserDetailForm = ({ open, onCreate, onCancel , userData , setReloadUserData}) => { 

    const [form] = Form.useForm();
    
    const [SelectedTags, setSelectedTags] = useState(userData.tags);

    const updateBioUrl = async ({userData , values , SelectedTags}) => {
      try {
        const requestBody = {
          user_id: userData.id,
          bio: values.Bio,
          tags: SelectedTags.map(tag => tag.name),
        };
    
        const response = await fetch(Base_Url + "updatebio/", {
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
        console.log(data.message); // Assuming the response contains a 'message' field
        setReloadUserData((prev) => !prev);
        toast.success('Bio Updated Successfully');
      } catch (error) {
        toast.error('Error Updating Bio');
        console.error('Error:', error);
      }
    };

    return (
        <Modal
            open={open}
            title="Edit Your Profile"
            onCancel={onCancel}
            onCreate={onCreate}

      footer={[
        <Button key="ok" type="primary" block={true} size='large' shape='round'
             onClick={
                () => {
                    form
                    .validateFields()
                    .then((values) => {
                        console.log(values.Bio , SelectedTags , userData.id);
                        updateBioUrl({userData , values , SelectedTags});
                        form.resetFields();
                        onCreate();
                    })
                    .catch((info) => {
                        console.log('Validate Failed:', info);
                    });
                }
        }>
          Update Data
        </Button>,
      ]}

    >
      <Form form={form} layout="horizontal" name="userbio"
            initialValues={{
                Bio: {userData} ? userData.bio : "",
            }}
      >

        <Form.Item name="Tags" label="Select Tags" >
                <ListFilter 
                    setSelectedTags={setSelectedTags}
                    selectedTags={SelectedTags}
                ></ListFilter>
        </Form.Item>
      
        <Form.Item  name="Bio" label="Bio">
            <Input.TextArea  rows={4}
            placeholder='Write about your self , Experiecne and Expertise , Domain'/>
        </Form.Item>

      </Form>
      
      <Toaster position="top-right" />

    </Modal>
    )
}

export default UserDetailForm
