import React, { useState } from 'react'
import { IoChatbubbleEllipses } from "react-icons/io5";
import { TiUserAdd } from "react-icons/ti";
import { NavLink } from 'react-router-dom';
import { BiLogOut } from "react-icons/bi";
import  Avatar  from './Avatar'
import { useSelector } from 'react-redux';

const SideBar = () => {
    const user = useSelector(state => state?.user);
    const [editUserOpen, setEditUserOpen] = useState(false)
  return (
    <div className='h-full w-full'>
        <div className='bg-slate-100 w-12 h-full rounded-tr-lg rounded-br-lg py-5 flex flex-col justify-between'>
           <div>
            <NavLink className={(isActive)=>`w-12 h-12 flex justify-center items-center curser-pointer hover:bg-slate-200 rounded ${isActive && 'bg-slate-200'} `} title='chat'>
                    <IoChatbubbleEllipses 
                        size={25}
                    />
                </NavLink>
                <NavLink className='w-12 h-12 flex justify-center items-center curser-pointer hover:bg-slate-200 rounded' title='addFriend'>
                    <TiUserAdd 
                        size={25}
                    />
                </NavLink>
           </div>
           <div>
                <button title = {user?.name} className='w-12 h-12 flex justify-center items-center curser-pointer hover:bg-slate-200 rounded'>
                    <Avatar width={30} height={30}  name={user?.name} />
               </button>
               <button title = 'logout' className='w-12 h-12 flex justify-center items-center curser-pointer hover:bg-slate-200 rounded -ml-1'>
                    <BiLogOut size={25}/>
               </button>
           </div>
        </div>
    </div>
  )
}

export default SideBar