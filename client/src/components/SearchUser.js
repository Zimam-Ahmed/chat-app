import React, { useState } from 'react'
import { BsSearch } from "react-icons/bs";
import Loading from './Loading';
import UserCard from './UserCard';
const SearchUser = () => {
    const [searchUser, setSearchUser] = useState([]);
    const [loading, setLoading] = useState(true);

  return (
    <div className='fixed top-0 bottom-0 right-0 left-0 bg-slate-700 bg-opacity-40 p-3'>
        <div className='w-full max-w-lg mx-auto mt-10'>
            {/* input search user */}
            <div className='bg-white rounded h-14 overflow-hidden flex'>
               
                <input
                    type='text'
                    placeholder='Search User By Name, Email....'
                    className='w-full outline-none py-1 h-full px-2'
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
                            <UserCard key={user._id} user={user}/>
                        )
                    })
                )
               }
            </div>
        </div>
    </div>
  )
}

export default SearchUser