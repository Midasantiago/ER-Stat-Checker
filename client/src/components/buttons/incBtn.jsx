import React from "react";

const IncBtn = ({ handleIncrement }) => {
    return (
        <div className='flex items-center'>
            <button
                onClick={handleIncrement}
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-1 px-2 rounded-r text-xs"
            >
                +
            </button>
        </div>
    )
}

export default IncBtn;