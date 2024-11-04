import React, { useState, useEffect } from 'react';
import AdminNav from '../../layouts/AdminNav';
import { Badge, Descriptions } from 'antd';
import { useSelector } from 'react-redux';
import { listAll_Product } from '../../functions/person';

const AdminDashboard = () => {
  const user = useSelector(state => state.user);
  const [volume, setVolume] = useState(null);
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      listAll_Product(user.token)
        .then(res => {
          setVolume(res);
        })
        .catch(err => {
          console.log(err);
        });
    };
    fetchData();
  }, [user.token]);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 768); // ตรวจสอบว่าหน้าจอมีขนาดเล็กกว่า 768px หรือไม่
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const items = [
  {
    key: '1',
    label: 'Name',
    children: user.name,
    span: 1, // Each span value should be adjusted according to the column setting
  },
  {
    key: '2',
    label: 'Role',
    children: user.role,
    span: 1,
  },
  {
    key: '3',
    label: 'Status',
    children: <Badge status="processing" text="Online" />,
    span: 1,
  },
  {
    key: '4',
    label: 'URL availability',
    children: 'YES',
    span: 2, // This item spans across 2 columns
  },
  {
    key: '5',
    label: 'Web shopping',
    children: '🛒 https://shoppingcmu.com',
    span: 1,
  },
  {
    key: '6',
    label: 'Product storage group',
    children: volume ? volume.Group : null,
    span: 3, // This item spans across all 3 columns
  },
  {
    key: '7',
    label: 'All products',
    children: volume ? volume.Items : null,
    span: 3, // This item spans across all 3 columns
  },
  {
    key: '8',
    label: 'Usage record',
    children: volume ? volume.Count : null,
    span: 3, // This item spans across all 3 columns
  },
  {
    key: '9',
    label: 'Config Info',
    children: (
      <>
        - เพิ่มสินค้า
        <br />
        - สร้าง URL ใหม่
        <br />
        - แก้ไขข้อมูลสินค้า
        <br />
        - ลบสินค้า
        <br />
        - ดูบันทึกการเข้าใช้งาน
        <br />
        CMU COOP - ร้านสหกรณ์มหาวิทยาลัยเชียงใหม่ จำกัด
        <br />
      </>
    ),
    span: 3, // This item spans across all 3 columns
  },
];

  

  return (
    <>
      <div className="container-fluid">
        <div className="row">
          {!isSmallScreen && (
            <div className="col-md-2">
              <AdminNav />
            </div>
          )}
          <div className={isSmallScreen ? 'col-md-12' : 'col-md-10'}>
            <Descriptions title="User Info" bordered items={items} />
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;
