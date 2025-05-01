import React from 'react';
import auth from '../utils/auth';

const Header = (props) => {
    return (
        <div className="bg-gray-800 p-4 flex justify-between items-center rounded-lg">
            <h1 className="text-white text-2xl font-bold">Elden Ring Stat Checker</h1>
            {props.isLoggedIn ? (
                <>
                    <a href='/account' className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors">Account</a>
                    <a href="/" onClick={auth.logout} className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors">Logout</a>
                </>
            ) :
                <>
                    <a href="/signup" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Signup</a>
                    <a href="/login" className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">Login</a>
                </>
            }
        </div>
    )
}

export default Header;