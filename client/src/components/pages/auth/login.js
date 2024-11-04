// Login.js
import React, { useState, useEffect } from 'react';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import FormControl from 'react-bootstrap/FormControl';
import { toast } from 'react-toastify';
import { LoginHeadler } from '../../functions/auth';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [buttonDisabled, setButtonDisabled] = useState(false);

  const [formUser, setUser] = useState({
    username: '',
    password: '',
  });

  const user = useSelector((state) => state.user); // ดึงข้อมูลผู้ใช้จาก Redux store

  const onChange = (e) => {
    setUser({ ...formUser, [e.target.name]: e.target.value });
  };

  const roleBasedRedirect = (role) => {
    if (role === 'admin') {
      navigate('/admin/dashboard');
    } else {
      navigate('/user/dashboard');
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setButtonDisabled(true);
    const userCredentials = {
      name: formUser.username,
      password: formUser.password,
    };
    try {
      const res = await LoginHeadler(userCredentials); // ตรวจสอบให้แน่ใจว่าชื่อฟังก์ชันถูกต้อง
      toast.success('เข้าสู่ระบบสำเร็จ!', { autoClose: 2000 }); // แสดงข้อความ 'success'

      dispatch({
        type: 'LOGGED_IN_USER',
        payload: {
          token: res.data.token,
          name: res.data.payload.name,
          role: res.data.payload.role,
          id: res.data.payload._id, // เพิ่ม id หากจำเป็น
        },
      });

      localStorage.setItem('token', res.data.token);
      roleBasedRedirect(res.data.payload.role);
    } catch (err) {
      console.error(err);
      toast.error('เกิดข้อผิดพลาดในการเข้าสู่ระบบ', { autoClose: 2000 });
      setButtonDisabled(false);
    }
  };

  // ตรวจสอบว่าผู้ใช้ล็อกอินอยู่แล้วหรือไม่ และเปลี่ยนเส้นทางถ้าใช่
  useEffect(() => {
    if (user && user.token) {
      roleBasedRedirect(user.role);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return (
    <div className="container p-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <h1>Login</h1>
          <form className="w-100" onSubmit={onSubmit}>
            <FloatingLabel label="User Name" className="mb-3">
              <FormControl
                type="text"
                name="username"
                value={formUser.username}
                onChange={onChange}
                placeholder="User Name"
                required
              />
            </FloatingLabel>

            <FloatingLabel label="Password" className="mb-3">
              <FormControl
                type="password"
                name="password"
                value={formUser.password}
                onChange={onChange}
                placeholder="Password"
                required
              />
            </FloatingLabel>

            <button
              className="btn btn-primary w-100 mt-3"
              type="submit"
              disabled={buttonDisabled}
              style={{ backgroundColor: '#6a0dad', borderColor: '#6a0dad' }}
            >
              Send
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
