import React, { useState } from 'react';
import { motion } from "framer-motion";
import { FaEnvelope, FaLock, FaSun, FaGoogle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { app } from '../firebase';

const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const signinUser = async () => {
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            console.log("Signin successful", user);
            navigate('/');
        } catch (error) {
            console.error("Signin error:", error.message);
            setError(error.message);
        }
    };

    const signinWithGoogle = async () => {
        try {
            // Ensure the user is always prompted to select an account
            googleProvider.setCustomParameters({
                prompt: 'select_account'
            });
            const result = await signInWithPopup(auth, googleProvider);
            const user = result.user;
            console.log("Google signin successful", user);
            navigate('/');
        } catch (error) {
            console.error("Google signin error:", error);
            setError(error.message);
        }
    };

    return (
        <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-300 via-purple-300 to-pink-300"
        >
            <div className="max-w-md w-full space-y-8 p-10 bg-white bg-opacity-20 backdrop-blur-lg rounded-xl shadow-lg">
                <div className="text-center">
                    <motion.div
                        initial={{ y: -50 }}
                        animate={{ y: 0 }}
                        transition={{ type: "spring", stiffness: 300 }}
                    >
                        <FaSun className="mx-auto h-12 w-auto text-yellow-400" />
                    </motion.div>
                    <h2 className="mt-6 text-3xl font-extrabold text-white">
                        Heavenly Sign In
                    </h2>
                </div>
                {error && (
                    <div className="text-red-500 text-center mb-4">
                        {error}
                    </div>
                )}
                <form className="mt-8 space-y-6">
                    <div className="rounded-md shadow-sm -space-y-px">
                        <div>
                            <label htmlFor="email" className="sr-only">Email address</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <FaEnvelope className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    required
                                    className="appearance-none rounded-none relative block w-full px-3 py-2 pl-10 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                    placeholder="Email address"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                        </div>
                        <div>
                            <label htmlFor="password" className="sr-only">Password</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <FaLock className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    autoComplete="current-password"
                                    required
                                    className="appearance-none rounded-none relative block w-full px-3 py-2 pl-10 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                    placeholder="Password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                        </div>
                    </div>

                    <div>
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            type="button"
                            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            onClick={signinUser}
                        >
                            Sign In
                        </motion.button>
                    </div>
                    <div>
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            type="button"
                            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                            onClick={signinWithGoogle}
                        >
                            <FaGoogle className="mr-2 h-5 w-5" />
                            Sign In with Google
                        </motion.button>
                    </div>
                </form>
            </div>
        </motion.div>
    );
}

export default Login;