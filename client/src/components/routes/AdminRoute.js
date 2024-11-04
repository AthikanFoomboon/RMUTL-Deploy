import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import LoadingToRedirect from './LoadingToRedirect';
import { currentAdmin } from '../functions/auth';

const AdminRoute = ({ children }) => {
    const user = useSelector(state => state.user);
    const [ok, setOk] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const verifyAdmin = async () => {
            if (user && user.token) {
                try {
                    await currentAdmin(user.token);
                    setOk(true);
                } catch (error) {
                    console.error('Admin route error:', error);
                    setOk(false);
                }
            } else {
                setOk(false);
            }
            setLoading(false);
        };
        verifyAdmin();
    }, [user]);

    // ระหว่างการโหลด ให้แสดง LoadingToRedirect หรือสปินเนอร์
    if (loading) {
        return <LoadingToRedirect />;
    }

    // ถ้า ok เป็น true (ผ่านการตรวจสอบสิทธิ์) แสดง children
    // ถ้าไม่ผ่าน ให้เปลี่ยนเส้นทางไปยังหน้า login
    return ok ? children : <Navigate to="/login" replace />;
}

export default AdminRoute;
