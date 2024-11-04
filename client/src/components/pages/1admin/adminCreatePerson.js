import React, { useState, useEffect } from 'react';
import AdminNav from '../../layouts/AdminNav';
import { Form, Input, Select, Button, Row, Col } from 'antd';
import { createPerson } from '../../functions/person';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';


const { TextArea } = Input;

const AdminCreatePerson = ({ history }) => {
    const user = useSelector((state) => state.user);
    const [form] = Form.useForm();
    const [isSmallScreen, setIsSmallScreen] = useState(false);
    const [file, setFile] = useState(null);

    useEffect(() => {
        const handleResize = () => {
            setIsSmallScreen(window.innerWidth < 768); // ตรวจสอบว่าหน้าจอมีขนาดเล็กกว่า 768px หรือไม่
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);


    const onFinish = (values) => {

        const formDataToSend = new FormData();
        formDataToSend.append('formData', JSON.stringify(values));
        formDataToSend.append('file', file);

        console.log(formDataToSend.get('formData'));
        console.log(formDataToSend.get('file'));

        createPerson(formDataToSend, user.token)
            .then((res) => {
                toast.success('บันทึกเรียบร้อย', { autoClose: 2000 });
                history.push('/admin/allProduct-person');
            })
            .catch((err) => {
                toast.error('[API Error] รูปแบบข้อมูลไม่ถูกต้อง หรือข้อมูลมีอยู่ในระบบแล้ว', { autoClose: 2000 });
                console.log(err);
            });
    };

    const validateInput = (rule, value) => {
        return new Promise((resolve, reject) => {
            const regex = /^(?:[a-zA-Z0-9ก-๙-_]+(?:\s[a-zA-Z0-9ก-๙-_]+){0,5})?$/;
            if (!regex.test(value)) {
                reject('ใส่ข้อมูลที่ไม่มีอักขระพิเศษ และอนุญาตให้เว้นวรรค หรือใช้เครื่องหมาย \'_\'');
            } else {
                resolve();
            }
        });
    };

    return (
        <div className="container-fluid">
            <div className="row" >
                {!isSmallScreen && (
                    <div className="col-md-2">
                        <AdminNav />
                    </div>
                )}
                <div className={isSmallScreen ? 'col-md-12' : 'col-md-10'} >
                    <h1 style={{ padding: '2%', textAlign: 'center' }}>เพิ่มสินค้า</h1>
                    <Form
                        form={form}
                        onFinish={onFinish}
                        labelCol={{ span: 5 }}
                        wrapperCol={{ span: '100%' }}
                        layout="horizontal"
                        style={{ maxWidth: '80%', margin: 'auto' }}
                    >
                        <Row gutter={24}>
                            <Col span={12}>
                                <Form.Item
                                    label="สินค้า"
                                    name="nameItems"
                                    rules={[
                                        { required: true, message: 'โปรดป้อนข้อมูลสินค้า' },
                                        { validator: validateInput }
                                    ]}
                                >
                                    <Input />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item
                                    label="รหัสสินค้า"
                                    name="idItems"
                                    rules={[
                                        { required: true, message: 'โปรดป้อนข้อมูลรหัสสินค้า' },
                                        { validator: validateInput }
                                    ]}
                                >
                                    <Input />
                                </Form.Item>
                            </Col>
                        </Row>

                        <Row gutter={24}>
                            <Col span={12}>
                                <Form.Item label="หมวดหมู่" name="type">
                                    <Select>
                                        <Select.Option value="แก้วเซรามิคและสแตนเลส">แก้วเซรามิคและสแตนเลส</Select.Option>
                                        <Select.Option value="กระบอกน้ำ">กระบอกน้ำ</Select.Option>
                                        <Select.Option value="กิฟต์เซต">กิฟต์เซต</Select.Option>
                                        <Select.Option value="ของที่ระลึก">ของที่ระลึก</Select.Option>
                                        <Select.Option value="เครื่องประดับ">เครื่องประดับ</Select.Option>
                                        <Select.Option value="เสื้อ">เสื้อ</Select.Option>
                                        <Select.Option value="เสื้อยืด">เสื้อยืด</Select.Option>
                                        <Select.Option value="เสื้อโปโล">เสื้อโปโล</Select.Option>
                                        <Select.Option value="กระเป๋าผ้า">กระเป๋าผ้า</Select.Option>
                                        <Select.Option value="หมวก">หมวก</Select.Option>
                                        <Select.Option value="แก้วน้ำ">แก้วน้ำ</Select.Option>
                                        <Select.Option value="แก้วเก็บอุณหภูมิ">แก้วเก็บอุณหภูมิ (แก้วเยติ)</Select.Option>
                                        <Select.Option value="ไอเทมตราสัญลักษณ์">ไอเทมตราสัญลักษณ์</Select.Option>
                                        <Select.Option value="สินค้าขายดี">สินค้าขายดี</Select.Option>
                                        <Select.Option value="สินค้าโปรโมชั่น">สินค้าโปรโมชั่น</Select.Option>
                                    </Select>
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item label="จุดติดตั้ง" name="Group">
                                    <Select>
                                        <Select.Option value="หอ 1ชาย (มช.)">หอ 1ชาย (มช.)</Select.Option>
                                        <Select.Option value="หอ 7 หญิง (มช.)">หอ 7 หญิง (มช.)</Select.Option>
                                        <Select.Option value="หอ 12 หญิง (มช.)">หอ 12 หญิง (มช.)</Select.Option>
                                        <Select.Option value="หอสีชมพู">หอสีชมพู</Select.Option>
                                        <Select.Option value="หอ 40 ปี">หอ 40 ปี</Select.Option>
                                        <Select.Option value="UNISERV CMU">UNISERV CMU</Select.Option>
                                        <Select.Option value="หอพักในกำกับสวนดอก A">หอพักในกำกับสวนดอก A</Select.Option>
                                        <Select.Option value="หอพักในกำกับสวนดอก B">หอพักในกำกับสวนดอก B</Select.Option>
                                        <Select.Option value="หอพักในกำกับคณะพยาบาลศาสตร์">หอพักในกำกับคณะพยาบาลศาสตร์ (มช.)</Select.Option>
                                        <Select.Option value="หอพยาบาล 1">หอพยาบาล 1 (มช.)</Select.Option>
                                        <Select.Option value="UNILOFT">UNILOFT</Select.Option>
                                        <Select.Option value="UMONG Place">UMONG Place</Select.Option>
                                        <Select.Option value="OJAI Resident">OJAI Resident</Select.Option>
                                        <Select.Option value="Bene Deva Apartment">Bene Deva Apartment</Select.Option>
                                        <Select.Option value="AIRADA Apartment">AIRADA Apartment</Select.Option>
                                        <Select.Option value="หอพักบิ๊กแอด">หอพักบิ๊กแอด</Select.Option>
                                    </Select>
                                </Form.Item>
                            </Col>
                        </Row>

                        <Row gutter={24}></Row>

                        <Row gutter={24}>
                            <Col span={12}>
                               
                                <div class="input-group mb-3">
                                    <input type="file" class="form-control" id="inputGroupFile01" onChange={(e) => setFile(e.target.files[0])}/>
                                </div>
                            </Col>
                            <Col span={12}>
                                <Form.Item label="รายละเอียด" name="description">
                                    <TextArea rows={7} />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Form.Item wrapperCol={{ offset: 8, span: 8, style: { textAlign: 'center' } }}>
                            <Button  type="primary" htmlType="submit" style={{ backgroundColor: '#6a0dad', borderColor: '#6a0dad',padding:"2f0px" }}>
                                สร้าง
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        </div>
    );
};

export default AdminCreatePerson;
