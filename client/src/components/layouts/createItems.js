import React, { useState } from 'react';
import { Button, Col, Drawer, Form, Input, Row, Select, Space } from 'antd';
import { EditOutlined } from '@ant-design/icons'
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { updatePerson } from '../functions/person';


const { Option } = Select;
const CreateItems = (productID) => {
    const user = useSelector(state => state.user);
    const [open, setOpen] = useState(false);
    const [file, setFile] = useState(null);


    const showDrawer = () => {
        setOpen(true);
    };

    const onClose = () => {
        setOpen(false);
    };

    const [form] = Form.useForm();

    const onFinish = (values) => {
        const formDataToSend = new FormData();
        formDataToSend.append('formData', JSON.stringify(values));
        formDataToSend.append('file', file);

        console.log(formDataToSend.get('formData'));
        console.log(formDataToSend.get('file'));

        updatePerson(formDataToSend, productID.id._id, user.token).then(res => {
            setOpen(false);
            toast.success("อัพเดตข้อมูลเรียบร้อย", { autoClose: 2000 })

        }).catch((err) => {
            console.log(err);
            toast.error(err.message, { autoClose: 2000 })
        })
    };




    return (
        <>
            <span className='btn btn-sm' style={{ float: 'right' }} onClick={showDrawer}   >
                <EditOutlined className='text-warning' />
            </span>


            <Drawer
                title="เเก้ไขรายละเอียดสินค้า"
                width={720}
                onClose={onClose}
                open={open}
                styles={{
                    body: {
                        paddingBottom: 80,
                    },
                }}
                extra={
                    <Space>
                        <Button onClick={onClose}>ยกเลิก</Button>
                        <Button onClick={() => form.submit()} type="primary" htmlType="submit">บันทึก</Button>
                    </Space>
                }
            >
                <Form layout="vertical" requiredMark
                    form={form}
                    onFinish={onFinish}>
                    <Row gutter={16}>

                        <Col span={12}>
                            <Form.Item label="สินค้า" name="nameItems" initialValue={productID.id.nameItems}>
                                <Input  />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                name="urlDefault"
                                label="ลิงก์สินค้าปลายทาง"
                                rules={[
                                    {
                                        message: 'Please enter url',
                                    },
                                ]}
                            >
                                <Input
                                    style={{
                                        width: '100%',
                                    }}
                                    addonBefore="http://"
                                    addonAfter=".com"
                                    placeholder={productID.id.urlDefault}
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item label="รหัสสินค้า" name="idItems" initialValue={productID.id.idItems}>
                                <Input  />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                name="Group"
                                label="กลุ่มสินค้า"
                                rules={[
                                    {
                                        message: 'Please choose the type',
                                    },
                                ]}
                            >
                                <Select placeholder={productID.id.Group}>
                                    <Option value="Group1">Group1</Option>
                                    <Option value="Group2">Group2 </Option>
                                    <Option value="Group3">Group3 </Option>
                                    <Option value="Group4">Group4</Option>
                                    <Option value="Group5">Group5</Option>
                                    <Option value="Group6">Group6</Option>

                                </Select>

                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item
                                name="type"
                                label="หมวดหมู่"
                                rules={[
                                    {
                                        message: 'Please choose the approver',
                                    },
                                ]}
                            >
                                <Select placeholder={productID.id.type}>
                                    <Select.Option value="แก้วเซรามิคและสแตนเลส"> แก้วเซรามิคและสแตนเลส</Select.Option>
                                    <Select.Option value="กระบอกน้ำ"> กระบอกน้ำ</Select.Option>
                                    <Select.Option value="กิฟต์เซต"> กิฟต์เซต </Select.Option>
                                    <Select.Option value="ของที่ระลึก"> ของที่ระลึก</Select.Option>
                                    <Select.Option value="เครื่องประดับ"> เครื่องประดับ</Select.Option>
                                    <Select.Option value="เสื้อ"> เสื้อ</Select.Option>
                                    <Select.Option value="เสื้อยืด"> สื้อยืด</Select.Option>
                                    <Select.Option value="เสื้อโปโล"> เสื้อโปโล </Select.Option>
                                    <Select.Option value="แก้วน้ำ"> แก้วน้ำ</Select.Option>
                                    <Select.Option value="แก้วเก็บอุณหภูมิ"> แก้วเก็บอุณหภูมิ (แก้วเยติ)</Select.Option>
                                    <Select.Option value="ไอเทมตราสัญลักษณ์"> ไอเทมตราสัญลักษณ์</Select.Option>
                                    <Select.Option value="สินค้าขายดี"> สินค้าขายดี</Select.Option>
                                    <Select.Option value="สินค้าโปรโมชั่น"> สินค้าโปรโมชั่น</Select.Option>

                                </Select>

                            </Form.Item>
                        </Col>
                        <Col span={12}>
                        <Form.Item label="อัพโหลดรูปภาพ" name="dateTime">
                        <div class="input-group mb-3">
                                    <input type="file" class="form-control" id="inputGroupFile01" onChange={(e) => setFile(e.target.files[0])}/>
                                </div>
                        </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={24}>
                            <Form.Item
                                name="description"
                                label="รายละเอียด"
                                initialValue={productID.id.description}
                                
                            >
                                <Input.TextArea rows={8} />
                            </Form.Item>

                        </Col>
                    </Row>
                </Form>
            </Drawer>
        </>
    );
};
export default CreateItems;