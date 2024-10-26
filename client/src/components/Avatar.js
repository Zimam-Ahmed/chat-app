import React, { useMemo } from 'react';
import { FaRegCircleUser } from 'react-icons/fa6';
import { useSelector } from 'react-redux';

const Avatar = ({ userId, name, imageUrl, width = 50, height = 50 }) => {
  const onlineUser = useSelector((state) => state?.user?.onlineUser);
    console.log("userId in avatar", userId)
  // Generate avatar initials
  let avatarName = '';
  if (name) {
    const splitName = name.split(' ');
    avatarName = splitName.length > 1 
      ? splitName[0][0] + splitName[1][0] 
      : splitName[0][0];
  }

  // Define background color options and memoize a random selection
  const bgColor = ['bg-slate-200', 'bg-teal-200', 'bg-red-200', 'bg-green-200', 'bg-yellow-200'];
  const randomBgColor = useMemo(() => bgColor[Math.floor(Math.random() * bgColor.length)], []);

  // Check if the user is online
  const isOnline = onlineUser.includes(userId);

  return (
    <div
      className={`relative flex items-center justify-center ${randomBgColor} rounded-full shadow`}
      style={{ width: `${width}px`, height: `${height}px` }}
    >
      {imageUrl ? (
        <img
          src={imageUrl}
          alt={name}
          className="rounded-full object-cover"
          style={{ width: '100%', height: '100%' }}
        />
      ) : name ? (
        <div
          className={`flex justify-center items-center text-lg text-slate-800 font-bold`}
          style={{ width: '100%', height: '100%' }}
        >
          {avatarName}
        </div>
      ) : (
        <FaRegCircleUser size={width} color="#00acb4" />
      )}

      {/* Online Status Indicator */}
      {isOnline && (
        <div
          className="bg-green-500 w-3 h-3 absolute bottom-1 right-1 z-10 rounded-full border-2 border-white"
        ></div>
      )}
    </div>
  );
};

export default Avatar;
