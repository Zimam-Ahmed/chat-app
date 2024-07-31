import React, { useState } from 'react';
import { IoClose, IoGitNetworkOutline } from "react-icons/io5";

const RegisterPage = () => {
  const [data, setData] = useState({
    name : "",
    email: "",
    password: "",
    profile_pic: "" 
  });

const [uploadPhoto, setUploadPhoto] = useState("")
const handleOnChange = (e) =>{
  const { name, value } = e.target
  setData((preve)=>{
    return {
      ...preve,
      [name] : value
    }
  })
}

const handleUploadPhoto = (e) =>{
  const file = e.target.files[0];
  setUploadPhoto(file)
}

const handlClearUploadPhoto = () =>{
  setUploadPhoto(null)
}

  return (
    <div className='mt-5'>
      <div className='bg-white w-full max-w-sm mx-2 rounded overflow-hidden p-4'>
        <h3>Welcome to Chat App</h3>
        <form className='grid gap-3 mt-5'>
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
          </div>
        </form>
      </div>
    </div>
  )
}

export default RegisterPage