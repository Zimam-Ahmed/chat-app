import axios from 'axios'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { logout, setUser } from '../redux/userSlice';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import SideBar from '../components/SideBar';
import logo from '../assets/logo.png';

const Home = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()
  const fetchUserDetails = async() =>{
    try {
      const URL = `${process.env.REACT_APP_BACKEND_URL}/api/user-details`
      const response = await axios({
        url: URL,
        withCredentials: true
      })
      dispatch(setUser(response.data.data));
      if(response.data.data.logout){
        dispatch(logout());
        navigate('/email')
      }
    } catch (error) {
        console.log('error', error);
    }
  }

  useEffect(()=>{
    fetchUserDetails();
  })
  const basePath = location.pathname ==='/'
  return (
    <div className='grid lg:grid-cols-[300px,1fr] h-screen'>
      <section className={`bg-white ${!basePath && "hidden"} lg:block`}>
        <SideBar/>
      </section>

      <section className={`${basePath && "hidden"}`}>
        <Outlet/> 
      </section>
      <div className={`justify-center items-center flex-col gap-2 hidden ${!basePath ? "hidden" : "lg:flex" }`}>
        <div>
          <img
            src={logo}
            width={250}
            alt='logo'
          />
        </div>
        <p className='text-lg mt-2 text-slate-500'>Select User to send message</p>
      </div>
    </div>
  )
}

export default Home