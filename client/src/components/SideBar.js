import React, { useState } from 'react'
import { IoChatbubbleEllipses } from "react-icons/io5";
import { TiUserAdd } from "react-icons/ti";
import { NavLink } from 'react-router-dom';
import { BiLogOut } from "react-icons/bi";
import  Avatar  from './Avatar'
import { useSelector } from 'react-redux';
import EditUserDetails from './EditUserDetails';
import { FiArrowUpLeft } from "react-icons/fi";
import SearchUser from './SearchUser';

const SideBar = () => {
    const user = useSelector(state => state?.user);
   
    const [editUserOpen, setEditUserOpen] = useState(false)
    const [allUser, setAllUser] = useState([])
    const [openSearchUser, setOpenSearchUser] = useState(false)
  return (
    <div className='h-full w-full grid grid-cols-[48px,1fr] bg-white'>
        <div className='bg-slate-100 w-12 h-full rounded-tr-lg rounded-br-lg py-5 flex flex-col justify-between'>
           <div>
            <NavLink className={(isActive)=>`w-12 h-12 flex justify-center items-center curser-pointer hover:bg-slate-200 rounded ${isActive && 'bg-slate-200'} `} title='chat'>
                    <IoChatbubbleEllipses 
                        size={25}
                    />
                </NavLink>
                <NavLink onClick={()=>setOpenSearchUser(true)} className='w-12 h-12 flex justify-center items-center curser-pointer hover:bg-slate-200 rounded' title='addFriend'>
                    <TiUserAdd 
                        size={25}
                    />
                </NavLink>
           </div>
           <div>
                <button onClick={() => setEditUserOpen(true)} title = {user?.name} className='w-12 h-12 flex justify-center items-center curser-pointer hover:bg-slate-200 rounded'>
               
                    <Avatar width={30} height={30}  name={user?.name}  imageUrl={user?.profile_pic}/>
               </button>
               <button title = 'logout' className='w-12 h-12 flex justify-center items-center curser-pointer hover:bg-slate-200 rounded -ml-1'>
                    <BiLogOut size={25}/>
               </button>
           </div>
        </div>
        <div className='w-full '>
            <div className='h-16 flex items-center'>
                <h2 className='text-xl font-bold p-4 text-slate-800 '>Message</h2>
            </div>
            <div className='bg-slate-200 p-[0.5px]'></div>
            <div className='h-[calc(100vh-65px)] overflow-x-hidden overflow-y-auto scrollbar'>
                {
                    allUser.length === 0 && (
                        <div className='mt-10'>
                            <div className='flex justify-center items-center my-4 text-slate-500'>
                                <FiArrowUpLeft
                                    size={50}
                                />
                            </div>
                            <p className='text-lg text-center text-slate-400'>Explore users to start a conversation.</p>
                        </div>
                    )
                }
            </div>
        </div>
        {/* edit user details */}
        {
            editUserOpen && (
                <EditUserDetails onClose={()=>setEditUserOpen(false)} user={user}/>
            )
        }
        {/* Search User */}
        {
            openSearchUser && (
                <SearchUser onClose={()=> setOpenSearchUser(false)}/>
            ) 
        }
    </div>
  )
}

export default SideBar