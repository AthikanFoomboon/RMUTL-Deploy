import React from 'react'
import { Link } from 'react-router-dom'


const AdminNav = () => {


    return (
        <nav >
            <ul className='nav flex-column'>
                <li className='nav-item'>
                    <Link to='/admin/dashboard' className='nav-link'>หน้าหลัก</Link>
                </li>
                <li className='nav-item'>
                    <Link to='/admin/create-person' className='nav-link'>เพิ่มสินค้า</Link>
                </li>
                <li className='nav-item'>
                    <Link to='/admin/allProduct-person' className='nav-link'>สินค้าทั้งหมด</Link>
                </li>
            </ul>
        </nav>

    )
}

export default AdminNav
