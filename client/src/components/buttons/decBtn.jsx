import React from 'react';

const DecBtn = ({ handleDecrement }) => {
    return (
        <div className='flex items-center'>
            <button
                onClick={handleDecrement}
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-1 px-2 rounded-l text-xs"
            >
                -
            </button>
        </div>
    )
}

export default DecBtn;