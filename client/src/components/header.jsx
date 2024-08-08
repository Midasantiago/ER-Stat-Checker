import React from 'react';

const Header = () => {
    return (
        <div className="bg-gray-800 p-4 flex justify-between items-center">
            <h1 className="text-white text-2xl font-bold">Elden Ring Stat Checker</h1>
            <a href="/" className="text-gray-300 hover:text-white">Logout</a>
        </div>
    )
}

export default Header;