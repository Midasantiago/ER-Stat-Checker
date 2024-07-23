import { React, useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_USER } from '../utils/mutations';
import Auth from '../utils/auth';

const Signup = () => {

    const [formState, setFormState] = useState({
        username: '',
        email: '',
        password: '',
    });

    const [addUser, { error, data }] = useMutation(ADD_USER);

    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormState({
            ...formState,
            [name]: value,
        });
    };

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        console.log(formState);

        try {
            const { data } = await addUser({
                variables: { ...formState },
            });

            Auth.login(data.addUser.token);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-900 text-white">
            <div className="w-full max-w-md p-8 space-y-6 bg-gray-800 rounded-lg shadow-lg">
                <div className="text-center">
                    <h2 className="text-xl mb-4">Already Have An Account? <a href="/login" className="text-blue-400 hover:text-blue-600">Login!</a></h2>
                    <h1 className="text-3xl font-bold mb-6">Sign Up!</h1>
                </div>
                <form onSubmit={handleFormSubmit} className="space-y-4">
                    <input
                        className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter your username"
                        name="username"
                        type="text"
                        value={formState.username}
                        onChange={handleChange}
                    />
                    <input
                        className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter your email"
                        name="email"
                        type="email"
                        value={formState.email}
                        onChange={handleChange}
                    />
                    <input
                        className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Choose your password"
                        name="password"
                        type="password"
                        value={formState.password}
                        onChange={handleChange}
                    />
                    <button
                        type="submit"
                        className="w-full py-2 bg-blue-500 hover:bg-blue-700 text-white font-bold rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        Submit
                    </button>
                </form>
            </div>
        </div>

    )
}

export default Signup;