import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import { FaRegCircleUser } from "react-icons/fa6";

const CheckEmailPage = () => {
  const [data, setData] = useState({
    email: "",
  });

const navigate = useNavigate();
const handleOnChange = (e) =>{
  const { name, value } = e.target
  setData((preve)=>{
    return {
      ...preve,
      [name] : value
    }
  })
}

const handleSubmit = async(e) =>{
  e.preventDefault()
  e.stopPropagation()

  const URL = `${process.env.REACT_APP_BACKEND_URL}/api/email`
  
  try {
    const response = await axios.post(URL,data)
    toast.success(response.data.message);
    if(response.data.success){
        setData({
          email: "",
        })
        navigate('/password', {
          state: response?.data?.data
        });
      }
  } catch (error) {
    toast.error(error?.response?.data?.message)
  }
}


  return (
    <div className='mt-14'>
    <div className='bg-white w-full max-w-md rounded mx:2 overflow-hidden p-4 mx-auto md:mx-auto'>
    <div className='w-fit mx-auto mb-2'><FaRegCircleUser size={70} color='#00acb4'/></div>
      <h3>Welcome to Chat App</h3>
      <form className='grid gap-3 mt-5' onSubmit={handleSubmit}>
        
        <div className='flex flex-col gap-1'>
          <label htmlFor='email'>Email : </label>
          <input
            type = 'text'
            id = 'email'
            name='email'
            placeholder='Enter Your Email' 
            className='bg-slate-100 px-2 pt-1 focus:outline-primary'
            value = {data.email}
            onChange={handleOnChange}
            required
          />
        </div>
          <button className='bg-primary text-lg px-4 py-1 hover:bg-secondary rounded mt-4 font-bold text-white leading-relaxed tracking-wide'>Lets Go</button>
      </form>
      <p className='my-3 text-center'> New User ? <Link to={'/register'} className='hover:text-primary font-semibold'>Register</Link></p>
    </div>
  </div>
  )
}

export default CheckEmailPage