import { Button, Form, Input, Modal } from 'antd';
import React, { useEffect, useState } from 'react';
import { Base_Url } from '../API';

import toast, { Toaster,  } from 'react-hot-toast';


const CommunicationRequest = ({id_from , id_to , text}) => {

    const [form] = Form.useForm();
    const [open, setOpen] = useState(false);

    const submitRequest = async (values) => {
        try{
            const response = await fetch(Base_Url + "requestcommunication/", {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    has_access_to_id: id_from,
                    to_this_person_id: id_to,
                    message : values.message,
                    request_status : "requested"
                }),
              });
            
              if (response.status === 200) {
                const data = await response.json(); // Parse the response body as JSON
                const message = data.message;
                toast.success(message);
                console.log('Success:', response);
            } else {
                console.error('Error sending access request');
            }
        } catch (error) {
            toast.error('Error Sending Request try again later');
            console.error('Error:', error);
        }
            
    }


    return (
        <>
            <Button onClick={()=>setOpen(true)}  type="primary" size='large' shape='round'>
                {text}
            </Button>

            <Modal
            open={open}
            title="Write a Request Message"
            onCreate={() => {  setOpen(false); }}
            onCancel={() => {  setOpen(false); }}

            footer={[
            <Button key="ok" type="primary" block={true} size='large' shape='round'
                onClick={
                    () => {
                        form
                        .validateFields()
                        .then((values) => {
                            console.log(values);
                            submitRequest(values);
                            form.resetFields();
                            setOpen(false);
                        })
                        .catch((info) => {
                            console.log('Validate Failed:', info);
                        });
                    }
            }>
            Send Request
            </Button>,
        ]}

            >
            <Form form={form} layout="horizontal" name="request">

                <Form.Item  name="message" label="message">
                    <Input.TextArea  rows={4}
                    placeholder='Write a message to introduce Yourself'/>
                </Form.Item>

            </Form>
            
            </Modal>

            <Toaster position="top-right" />
        </>
        
    );
}

export default CommunicationRequest;