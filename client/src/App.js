import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import CustomNavbar from './components/layouts/Navbar';
import RegistrationForm from './components/pages/auth/register';
import Login from './components/pages/auth/login';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch } from 'react-redux';
import { currentUser } from './components/functions/auth';
import UserRoute from './components/routes/userRoute';
import AdminRoute from './components/routes/AdminRoute';
import AdminDashboard from './components/pages/1admin/adminDashboard';
import AdminCreatePerson from './components/pages/1admin/adminCreatePerson';
import AllProduct from './components/pages/1admin/all_Product';
import UserDashboard from './components/pages/2user/userDashboard';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const idTokenResult = localStorage.token;
    if (idTokenResult) {
      currentUser(idTokenResult)
        .then(res => {
          dispatch({
            type: 'LOGGED_IN_USER',
            payload: {
              name: res.data.name,
              token: idTokenResult,
              role: res.data.role,
              id: res.data._id,
            },
          });
        })
        .catch(err => {
          dispatch({
            type: 'LOGOUT',
            payload: null,
          });
          console.log(err);
        });
    }
  }, [dispatch]);

  return (
    <div className="App">
      <ToastContainer />
      <CustomNavbar />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register"  element={ <AdminRoute><RegistrationForm /></AdminRoute>} />
        <Route path="/admin/dashboard" element={ <AdminRoute><AdminDashboard /></AdminRoute>} />
        <Route path="/admin/create-person" element={ <AdminRoute><AdminCreatePerson /></AdminRoute>} />
        <Route path="/admin/allProduct-person" element={ <AdminRoute><AllProduct /></AdminRoute>} />
        <Route path="/user/dashboard" element={ <UserRoute><UserDashboard /></UserRoute>} />
      </Routes>
    </div>
  );
}

export default App;
