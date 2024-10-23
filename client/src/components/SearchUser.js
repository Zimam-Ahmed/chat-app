import React, { useEffect, useState } from 'react'
import { BsSearch } from "react-icons/bs";
import Loading from './Loading';
import UserCard from './UserCard';
import toast from 'react-hot-toast'
import axios from 'axios'
import { IoMdClose } from "react-icons/io";
const SearchUser = ({onClose}) => {
    const [searchUser, setSearchUser] = useState([]);
    const [loading, setLoading] = useState(false);
    const [search, setSearch] = useState("")
    const URL = `${process.env.REACT_APP_BACKEND_URL}/api/search-user`
    const handleSearchUser = async()=>{
        try {
            setLoading(true);
            const response = await axios.post(URL, {
                search: search
            })
            
            setLoading(false);
            setSearchUser(response.data.data);
        } catch (error) {
            toast.error(error?.response?.data?.message) 
        }
    }
    useEffect(()=>{
        handleSearchUser()
    },[search])
    console.log("search User", searchUser)
  return (
    <div className='fixed top-0 bottom-0 right-0 left-0 bg-slate-700 bg-opacity-40 p-3'>
        <div className='w-full max-w-lg mx-auto mt-10'>
            {/* input search user */}
            <div className='bg-white rounded h-14 overflow-hidden flex'>
               
                <input
                    type='text'
                    placeholder='Search User By Name, Email....'
                    className='w-full outline-none py-1 h-full px-2'
                    onChange={(e)=>setSearch(e.target.value)}
                    value={search}
                />
                <div className='h-14 w-14 flex justify-center items-center'>
                    <BsSearch
                        size={20}
                    />
                </div>
            </div>
            {/* Display Search User */}
            <div className='bg-white mt-2 w-full p-4 rounded'>
                {/* No user found */}
                {
                    searchUser.length === 0 && !loading && (
                        <p className='text-cent text-slate-500'>No User Found</p>
                    )
                }
               {
                loading && (
                    <p><Loading/></p>
                )
               }
               {
                searchUser.length != 0 && !loading && (
                    searchUser.map((user,index)=>{
                        return (
                            <UserCard key={user._id} user={user}  onClose={onClose}/>
                        )
                    })
                )
               }
            </div>
        </div>
        <div className='absolute top-0 right-0 text-2xl p-2 lg:text-4xl hover:text-white' onClick={onClose}>
            <button><IoMdClose size={25}/></button>
        </div>
    </div>
  )
}

export default SearchUser