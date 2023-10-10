import { Button, Form, Input, Modal } from 'antd';
import React, { useEffect, useState } from 'react';
import { Base_Url } from '../API';
import ListFilter from "./ListFilter"
import toast, { Toaster,  } from 'react-hot-toast';

const ProjectDetailForm = ({ open, onCreate, onCancel , update , projectData}) => { 

    const user_id = localStorage.getItem('id');

    const [form] = Form.useForm();
    
    const [SelectedTags, setSelectedTags] = useState(update ? projectData.tags : []);

    const submitForm = async ({values , SelectedTags , update , projectData}) => {
        try {
            const requestBody = {
                title: values.Title,
                description: values.Description,
                tags: SelectedTags.map(tag => tag.name),
                id: update ?  projectData.id : null,
                user_id: user_id,
            };
            console.log(requestBody);
            const response = await fetch(Base_Url + `/updateproject/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestBody),
            });
            const data = await response.json();
            console.log(data);
            if (response.ok) {
                toast.success(update ? 'Project Updated' : 'Project Created');
            } else {
                toast.error(update ? 'Error Updating Project' : 'Error Creating Project');
            }
        }
        catch (err) {
            console.log(err);
        }
    }

    return (
        <Modal
            open={open}
            title={update ? "Update Project" : "Create a New Project"}
            onCancel={onCancel}
            onCreate={onCreate}

      footer={[
        <Button key="ok" type="primary" block={true} size='large' shape='round'
             onClick={
                () => {
                    form
                    .validateFields()
                    .then((values) => {
                        console.log(values , SelectedTags);
                        submitForm({values , SelectedTags , update , projectData});
                        form.resetFields();
                        onCreate();
                    })
                    .catch((info) => {
                        console.log('Validate Failed:', info);
                    });
                }
        }>
          {update ? "Update" : "Create"}
        </Button>,
      ]}

    >
      <Form form={form} layout="horizontal" name="projectDescription"
            initialValues={{
               Title : update ? projectData.title : "",
                Description : update ? projectData.description : "",
            }}
      >

        <Form.Item  name="Title" label="Title"
        rules={[
            {
            required: true,
            message: 'Please Enter Title of the Project',
            },
        ]}>
            <Input placeholder='Enter Title of the Project'/>
        </Form.Item>

        <Form.Item  name="Description" label="Description"
        rules={[
            {
            required: true,
            message: 'Please Enter Desctiption of the Project',
            },
        ]}>
            <Input.TextArea  rows={4} 
            placeholder='Write about problem statement, project Domain and Expertise Required.'/>
        </Form.Item>

        <Form.Item  name="tags" label="Select Tags">
            <ListFilter 
                setSelectedTags={setSelectedTags}           
                selectedTags={SelectedTags}
            ></ListFilter>
        </Form.Item>

      </Form>

      <Toaster position="top-right" />


    </Modal>
    )
}

export default ProjectDetailForm
