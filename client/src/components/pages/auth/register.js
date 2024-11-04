import React, { useState } from 'react'
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import { FormControl } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { registerHeadler } from '../../functions/auth'
import home from '../home';


function Register() {


    const [fromUser, setUser] = useState({
        username: '',
        password: '',
        confirmPassword: ''
    })

    const onChange = (e) => {
        setUser({ ...fromUser, [e.target.name]: e.target.value })

    }

    const onSubmit = async (e) => {
        e.preventDefault();

        if (fromUser.password !== fromUser.confirmPassword) {
            toast.error('รหัสผ่านไม่ตรงกัน!', { autoClose: 2000, });
            return;
        }

        const User = {
            name: fromUser.username,
            password: fromUser.password,
        };
        try {
            await registerHeadler(User).then(res=>{  if(res.data.token){
                toast.success('สมัครสมาชิกเรียบร้อย', { autoClose: 2000, })
             
            }})
           
        } catch (err) {
            toast.error(err.response?.data?.msg , { autoClose: 2000 });
        }
           
    }
    const idTokenResult = localStorage.token
    return idTokenResult
        ? (<div className="container p-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <h1>Register</h1>
                    <form className="w-100" onSubmit={onSubmit}>
                        <FloatingLabel label="User Name" className="mb-3">
                            <FormControl type="text" name='username' onChange={onChange} placeholder="User Name" />
                        </FloatingLabel>

                        <FloatingLabel label="Password" className="mb-3">
                            <FormControl type="password" name='password' onChange={onChange} placeholder="Password" />
                        </FloatingLabel>

                        <FloatingLabel label="Confirm Password" className="mb-3">
                            <FormControl type="password" name='confirmPassword' onChange={onChange} placeholder="Confirm Password" />
                        </FloatingLabel>

                        <button className="btn btn-primary w-100 mt-3" type="submit"style={{ backgroundColor: '#6a0dad', borderColor: '#6a0dad' }}>
                            Send
                        </button>

                    </form>
                </div>
            </div>
        </div>
        )
        : home()
}

export default Register
