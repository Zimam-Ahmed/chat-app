import React from 'react';
import { FaRegCircleUser } from "react-icons/fa6";

const Avatar = ({userId,name, imageUrl, width, height}) => {
  let avatarName = ''
  if(name){
    const splitName = name?.split(" ")
    if(splitName.length > 1){
        avatarName = splitName[0][0]+splitName[1][0]
    }else{
        avatarName = splitName[0][0]
    }
  }

  const bgColor = [
    'bg-slate-200',
    'bg-teal-200',
    'bg-red-200',
    'bg-green-200',
    'bg-yellow-200',
  ]
  const randomNumber = Math.floor(Math.random() * 5)
    return (
    <div className={`text-slate-800 overflow-hiden rounded-full shadow font-bold `} style={{width: width+"px", height: height+"px" }}>
        {
            imageUrl ? (
                <img 
                    src={imageUrl}
                    width={width}
                    height={height}
                    alt={name}
                    className='rounded-full w-13 h-13'
                />
            ) : (
                name ? (
                    <div style={{width: width+"px", height: height+"px" }} className={`overflow-hidden rounded-full flex justify-center items-center text-lg ${bgColor[randomNumber]}`}>
                        {avatarName}
                    </div>
                ) : (
                    <FaRegCircleUser size={width} color='#00acb4'/>
                )
            )
        }
    </div>
  )
}

export default Avatar