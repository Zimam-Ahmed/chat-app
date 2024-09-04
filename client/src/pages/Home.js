import axios from 'axios'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { logout, setUser } from '../redux/userSlice';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const user = useSelector(state => state.user);
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const fetchUserDetails = async() =>{
    try {
      const URL = `${process.env.REACT_APP_BACKEND_URL}/api/user-details`
      const response = await axios({
        url: URL,
        withCredentials: true
      })
      dispatch(setUser(response.data.data));
      if(response.data.logout){
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
  return (
    <div>Home</div>
  )
}

export default Home