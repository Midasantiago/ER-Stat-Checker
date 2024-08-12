import React from 'react';

const Header = () => {
    return (
        <div className="bg-gray-800 p-4 flex justify-between items-center rounded-lg">
            <h1 className="text-white text-2xl font-bold">Elden Ring Stat Checker</h1>
            <a href='/account' className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors">Account</a>
            <a href="/" className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors">Logout</a>
        </div>
    )
}

export default Header;