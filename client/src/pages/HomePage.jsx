import React from 'react';

const HomePage = () => {
    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-900 text-white">
            <div className="text-center space-y-6">
                <div>
                    <h1 className="text-5xl font-bold mb-4">Elden Ring Stat Checker</h1>
                    <p className="text-lg mb-2">Compare your Elden Ring stats to any equipment you want.</p>
                    <p className="text-lg">Allowing to test out stat allocations and get the perfect build</p>
                </div>

                <div className="mt-8">
                    <p className="text-xl mb-4">Just Sign Up or Login to begin testing</p>
                    <div className="flex justify-center space-x-4">
                        <a href="/signup" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Signup</a>
                        <a href="/login" className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">Login</a>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HomePage;