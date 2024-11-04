import React, { useState, useEffect } from 'react';
import { Button, Segmented, Space, Switch, Table, Dropdown } from 'antd';
import AdminNav from '../../layouts/AdminNav';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { DeleteOutlined } from '@ant-design/icons';
import CreateItems from '../../layouts/createItems';
import { Link } from 'react-router-dom'
import { message, Tooltip, Image } from 'antd';
import { CopyOutlined } from '@ant-design/icons';
import { listPerson, removePerson } from '../../functions/person';

const AllProduct = () => {
    const [fixed, setFixed] = React.useState(true);
    const [bordered, setBordered] = React.useState(false);
    const [count, setCount] = React.useState('Date');
    const [group, setGroup] = React.useState('all');
    const [Refresh, setRefresh] = React.useState();
    const tblRef = React.useRef(null);
    const user = useSelector(state => state.user);
    const [person, setPerson] = useState([]);
    const [isSmallScreen, setIsSmallScreen] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            setIsSmallScreen(window.innerWidth < 768); // ตรวจสอบว่าหน้าจอมีขนาดเล็กกว่า 768px หรือไม่
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const columns = [
        {
            title: 'รหัสสินค้า',
            dataIndex: 'idItems',
            width: 100,
            fixed: 'left',
            render: (text) => <div style={{ textAlign: 'center' }}>{text}</div>,
        },
        {
            title: 'สินค้า',
            dataIndex: 'nameItems',
            width: 120,
            render: (text) => <div style={{ textAlign: 'center' }}>{text}</div>,
        },
        {
            title: 'กลุ่ม',
            dataIndex: 'Group',
            width: 200,
            render: (text) => <div style={{ textAlign: 'center' }}>{text}</div>,
        },
        {
            title: 'บันทึกการเข้าใช้',
            dataIndex: 'count',
            width: 120,
            render: (text) => <div style={{ textAlign: 'center' }}>{text}</div>,
        },
        {
            title: 'New URL',
            dataIndex: 'UpdateURL',
            render: (record) => (
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <div style={{ width: '100%', height: '50px', border: '1px solid #ccc', overflowY: 'auto', padding: '10px', textAlign: 'center' }}>
                        {record}
                    </div>
                    <Tooltip title="Copy">
                        <Button type="primary" shape="circle" icon={<CopyOutlined />} style={{ marginLeft: '8px' }} size="small" onClick={() => handleCopy(record)} />
                    </Tooltip>
                </div>
            )
        }, {
            title: 'ไฟล์',
            width: 100,
            
            fixed: 'right',
            render: (record) => (
                <>
                    <Image style={{maxHeight:100}}
                        width={50}
                        src={`${process.env.REACT_APP_IMG}/${record.picture}`}
                    />
                </>
            ),
        }
    ];
    const fixedColumns = [
        {
            title: 'เวลา',
            dataIndex: 'date',
            width: 120,
            render: (text) => <div style={{ textAlign: 'center' }}>{formatDateTime(text)}</div>,
        },
        {
            title: 'รหัสสินค้า',
            dataIndex: 'idItems',
            width: 120,
            fixed: 'left',
            render: (text) => <div style={{ textAlign: 'center' }}>{text}</div>,
        },
        {
            title: 'สินค้า',
            dataIndex: 'nameItems',
            width: 200,
            render: (text) => <div style={{ textAlign: 'center' }}>{text}</div>,
        },
        {
            title: 'หมวดหมู่',
            dataIndex: 'type',
            width: 120,
            render: (text) => <div style={{ textAlign: 'center' }}>{text}</div>,
        },
        {
            title: 'กลุ่ม',
            dataIndex: 'Group',
            width: 200,
            render: (text) => <div style={{ textAlign: 'center' }}>{text}</div>,
        },
        {
            title: 'บันทึกการเข้าใช้',
            dataIndex: 'count',
            width: 127,
            render: (text) => <div style={{ textAlign: 'center' }}>{text}</div>,
        },
        {
            title: 'New URL',
            dataIndex: 'UpdateURL',
            render: (record) => (
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <div style={{ width: '100%', height: '50px', border: '1px solid #ccc', overflowY: 'auto', padding: '10px', textAlign: 'center' }}>
                        {record}
                    </div>
                    <Tooltip title="Copy">
                        <Button type="primary" shape="circle" icon={<CopyOutlined />} style={{ marginLeft: '8px' }} size="small" onClick={() => handleCopy(record)} />
                    </Tooltip>
                </div>
            )
        },
        {
            title: 'Default URL',
            dataIndex: 'urlDefault',
            render: (record) => (
                <div style={{ textAlign: 'center', width: '100%', height: '50px', border: '1px solid #ccc', overflowY: 'auto', padding: '10px' }}>
                    {record}
                </div>
            )
        },
        {
            title: 'รายละเอียด',
            dataIndex: 'description',
            style: { whiteSpace: 'pre-wrap' },
            render: (text) => <div style={{ textAlign: 'center' }}>{text}</div>,
        },
        {
            title: 'แก้ไข',
            width: 100,
            fixed: 'right',
            render: (record) => (
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <CreateItems id={record} />
                    <Tooltip title="Delete">
                        <Button type="danger" shape="circle" icon={<DeleteOutlined style={{color:'red'}} />} size="small" style={{ marginLeft: '8px' }} onClick={() => Remove(record._id)} />
                    </Tooltip>
                </div>
            ),
        },
        {
            title: 'ไฟล์',
            width: 100,
            
            fixed: 'right',
            render: (record) => (
                <>
                    <Image style={{maxHeight:100}}
                        width={50}
                        src={`${process.env.REACT_APP_IMG}/${record.picture}`}
                    />
                </>
            ),
        }
    ];



    useEffect(() => {
        loadPerson(user.token);

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [Refresh, count, group]);

    const mergedColumns = React.useMemo(() => {
        if (!fixed) {
            return columns;
        }
        if (fixed) {
            return fixedColumns;
        }
        return fixedColumns.map((col) => ({
            ...col,
            onCell: undefined,
        }));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [fixed]);

    const formatDateTime = (dateStr) => {
        const dateObj = new Date(dateStr);

        const day = String(dateObj.getDate()).padStart(2, '0');
        const month = String(dateObj.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
        const year = dateObj.getFullYear();

        const hours = String(dateObj.getHours()).padStart(2, '0');
        const minutes = String(dateObj.getMinutes()).padStart(2, '0');
        const seconds = String(dateObj.getSeconds()).padStart(2, '0');

        return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
    };

    function loadPerson(authToken) {
        listPerson(authToken, group)
            .then((res) => {
                if (res && res.items) {
                    if (count === 'Low') {
                        const sortedItems = res.items.sort((a, b) => a.count - b.count);
                        setPerson(sortedItems);
                    }
                    else if (count === 'High') {
                        const sortedItems = res.items.sort((a, b) => b.count - a.count);
                        setPerson(sortedItems);
                    }
                    else if (count === 'Date') {
                        setPerson(res.items);
                    }
                }
            })
            .catch((err) => {
                console.log("Error loading data:", err);
            });
    }


    const handleCopy = (text) => {
        navigator.clipboard.writeText(text);
        message.success('คัดลอกข้อความเรียบร้อยแล้ว');
    }


    const Remove = (id) => {
        if (window.confirm('ยืนยันลบ')) {
            removePerson(id, user.token)
                .then((res) => {
                    loadPerson(user.token); // Refresh the table
                    message.error('ลบข้อมูลเรียบร้อย')
                })
                .catch((err) => {
                    toast.error(err.message, { autoClose: 2000 });
                });
        }
    };

    const items = [
        { key: 'all', label: (<> ทั้งหมด</>) },
        { key: 'หอ 1ชาย (มช.)', label: (<> หอ 1ชาย (มช.) </>) },
        { key: 'หอ 7 หญิง (มช.)', label: (<> หอ 7 หญิง (มช.)</>) },
        { key: 'หอ 12 หญิง (มช.)', label: (<> หอ 12 หญิง (มช.) </>) },
        { key: 'หอสีชมพู', label: (<> หอสีชมพู</>) },
        { key: 'หอ 40 ปี', label: (<> หอ 40 ปี</>) },
        { key: 'UNISERV CMU', label: (<> UNISERV CMU</>) },
        { key: 'หอพักในกำกับสวนดอก A', label: (<> หอพักในกำกับสวนดอก A</>) },
        { key: 'หอพักในกำกับสวนดอก B', label: (<> หอพักในกำกับสวนดอก B</>) },
        { key: 'หอพักในกำกับคณะพยาบาลศาสตร์', label: (<> หอพักในกำกับคณะพยาบาลศาสตร์</>) },
        { key: 'หอพยาบาล 1', label: (<> หอพยาบาล 1</>) },
        { key: 'UNILOFT', label: (<> UNILOFT</>) },
        { key: 'UMONG Place', label: (<> UMONG Place</>) },
        { key: 'OJAI Resident', label: (<> OJAI Resident</>) },
        { key: 'Bene Deva Apartment', label: (<> Bene Deva Apartment</>) },
        { key: 'AIRADA Apartment', label: (<> AIRADA Apartment</>) },
        { key: 'หอพักบิ๊กแอด', label: (<> หอพักบิ๊กแอด</>) },
    ];

    return (
        <div className="container-fluid">
            <div className="row">
                {!isSmallScreen && (
                    <div className="col-md-2">
                        <AdminNav />
                    </div>
                )}
                <div className={isSmallScreen ? 'col-md-12' : 'col-md-10'}>
                    <div style={{ padding: '1%' }}>
                        <Space direction="vertical" style={{ width: '100%', }}>
                            <div >

                                <Switch
                                    checked={fixed}
                                    onChange={() => setFixed(!fixed)}
                                    checkedChildren="All"
                                    unCheckedChildren="Off"
                                    style={{ backgroundColor: '#6a0dad', borderColor: '#6a0dad' }}
                                />
                                <Switch
                                    checked={bordered}
                                    onChange={() => setBordered(!bordered)}
                                    checkedChildren="Bordered"
                                    unCheckedChildren="Bordered"
                                    style={{ backgroundColor: '#6a0dad', borderColor: '#6a0dad' }}
                                />
                                <Segmented
                                    value={count}
                                    onChange={(value) => setCount(value)}
                                    options={[
                                        { label: 'Low', value: 'Low' },
                                        { label: 'High', value: 'High' },
                                        { label: 'Date', value: 'Date' }
                                    ]}
                                />


                                <Dropdown menu={{ items, onClick: (e) => setGroup(e.key),}} placement="bottom">
                                    <Button>Group</Button>
                                </Dropdown>

                                <Button>
                                    <Link to='/admin/create-person' className='nav-link'>
                                        Add product
                                    </Link>
                                </Button>

                                <Button type="primary" onClick={setRefresh} style={{ marginLeft: '5px', backgroundColor: '#6a0dad', borderColor: '#6a0dad' }}>
                                    Refresh
                                </Button>

                            </div>
                            <Table
                                bordered={bordered}
                                virtual={false}
                                columns={mergedColumns}
                                scroll={{ x: "2000px", y: "70vh" }}
                                rowKey="_id"
                                dataSource={person}
                                pagination={false}
                                ref={tblRef}
                                className="responsive-table"
                                style={{boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.3)'}}
                            />
                        </Space>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default AllProduct;