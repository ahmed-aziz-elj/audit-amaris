import React from 'react';
import imageAmaris from '../assets/image-amaris.png';
import imageBouyeges from '../assets/image-bouygues.png';

const TopBar = ({ userInfo }) => (
  <div className="bg-gray-200 relative px-3 py-1 border-b border-gray-300 h-10 flex items-center">
    {/* Centered Name and Icon */}
    <div className="absolute left-1/2 transform -translate-x-1/2 text-blue-700 font-bold flex items-center gap-2">
      {userInfo ? `${userInfo.firstName} ${userInfo.lastName}` : 'Utilisateur'} <span role="img" aria-label="user">👤</span>
    </div>
    {/* Right Logo */}
  </div>
);

export default TopBar;
