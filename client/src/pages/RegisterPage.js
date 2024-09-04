import React, { useState } from 'react';
import { IoClose, IoGitNetworkOutline } from "react-icons/io5";
import { Link, useNavigate } from 'react-router-dom';
import uploadFiles from '../helpers/uploadFiles';
import axios from 'axios';
import toast from 'react-hot-toast';

const RegisterPage = () => {
  const [data, setData] = useState({
    name : "",
    email: "",
    password: "",
    profile_pic: "" 
  });

const [uploadPhoto, setUploadPhoto] = useState("")
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

const handleUploadPhoto = async(e) =>{
  const file = e.target.files[0];
  const uploadPhoto = await uploadFiles(file);
  setUploadPhoto(file)

  setData((preve)=>{
    return{
      ...preve,
      profile_pic : uploadPhoto.url
    }
  })
}

const handlClearUploadPhoto = (e) =>{
  e.stopPropagation()
  e.preventDefault()
  setUploadPhoto(null)
}

const handleSubmit = async(e) =>{
  e.preventDefault()
  e.stopPropagation()

  const URL = `${process.env.REACT_APP_BACKEND_URL}/api/register`
  
  try {
    const response = await axios.post(URL,data)
    toast.success(response.data.message);
    if(response.data.success){
        setData({
          name : "",
          email: "",
          password: "",
          profile_pic: "" 
        })
        navigate('/email');
      }
  } catch (error) {
    toast.error(error?.response?.data?.message)
  }
}

  return (
    <div className='mt-14'>
      <div className='bg-white w-full max-w-md rounded mx:2 overflow-hidden p-4 mx-auto md:mx-auto'>
        <h3>Welcome to Chat App</h3>
        <form className='grid gap-3 mt-5' onSubmit={handleSubmit}>
          <div className='flex flex-col gap-1'>
            <label htmlFor='name'>Name : </label>
            <input
              type = 'text'
              id = 'name'
              name='name'
              placeholder='Enter Your Name' 
              className='bg-slate-100 px-2 pt-1 focus:outline-primary'
              value = {data.name}
              onChange={handleOnChange}
              required
            />
          </div>
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
          <div className='flex flex-col gap-1'>
            <label htmlFor='password'>Password : </label>
            <input
              type = 'text'
              id = 'password'
              name='password'
              placeholder='Enter Your Password' 
              className='bg-slate-100 px-2 pt-1 focus:outline-primary'
              value = {data.password}
              onChange={handleOnChange}
              required
            />
          </div>
          <div className='flex flex-col gap-1'>
            <label htmlFor='profile_pic'>Photo : 
            <div className='h-14 bg-slate-200 flex justify-center items-center border rounded hover:border-primary cursor-pointer'> 
              <p className='text-sm max-w-[300px] text-ellipsis line-clamp-1'>
              {
                uploadPhoto?.name ? uploadPhoto?.name : "Upload Profile Image"
              }
              {
                uploadPhoto?.name && ( <button className='text-lg mt-1 ml-2 hover:text-red-600' onClick={handlClearUploadPhoto}> <IoClose/> </button>) 
              }
              </p>
             
            </div>
            </label>
            <input
              type = 'file'
              id = 'profile_pic'
              name='profile_pic'
              className='bg-slate-100 px-2 pt-1 focus:outline-primary hidden'
              onChange={handleUploadPhoto}
            />
            <button className='bg-primary text-lg px-4 py-1 hover:bg-secondary rounded mt-4 font-bold text-white leading-relaxed tracking-wide'>Register</button>
          </div>
        </form>
        <p className='my-3 text-center'> Already Have A Account ? <Link to={'/email'} className='hover:text-primary font-semibold'>Login</Link></p>
      </div>
    </div>
  )
}

export default RegisterPage