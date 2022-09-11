import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { MdError } from 'react-icons/md';
const Login = ({ setUser }) => {
	const [userName, setUserName] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState('');
	const [isCompleted, setIsCompleted] = useState(false);
	const URL = `https://ktrs-web-shop.herokuapp.com/auth/login`;
	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const response = await axios.post(URL, { userName, password });
			if (response.status === 200) {
				setUser(response.data);
				setIsCompleted(true);
				setError('');
			}
		} catch (error) {
			setError(error.response?.data?.message);
		}
	};

	return isCompleted ? (
		<div className="flex flex-col items-center justify-center w-full h-screen gap-4">
			<h1 className="text-xl text-green-600">Successfully logged in!</h1>
			<div>
				<Link to={'/'} className="mx-2 text-blue-500 underline">
					Home
				</Link>
			</div>
		</div>
	) : (
		<div className="flex items-center justify-center w-full h-screen min-w-screen">
			<form
				onSubmit={handleSubmit}
				className="w-[250px] sm:w-[320px] h-auto bg-white shadow-[#0303034f] shadow-md rounded-lg flex flex-col justify-between items-center"
			>
				{error ? (
					<div className="text-[.9rem] flex items-center justify-center px-2 py-[2px] mt-2 text-red-600 bg-red-100 felx-col rounded-xl">
						<MdError />
						{error}
					</div>
				) : (
					<></>
				)}
				<div className="w-[90%] mx-auto">
					<label htmlFor="userName" className="block my-2 font-bold">
						User Name
					</label>
					<input
						onChange={(e) => setUserName(e.target.value)}
						type="text"
						id="userName"
						value={userName}
						required
						placeholder="Enter user name ..."
						className="outline-none text-sm md:text-[1rem] w-[100%] placeholder:text-sm md:placeholder:text-[1rem] px-4 py-2 rounded-md bg-gray-100"
					/>
				</div>
				<div className="w-[90%] mx-auto">
					<label htmlFor="password" className="block my-2 font-bold">
						Password
					</label>
					<input
						onChange={(e) => setPassword(e.target.value.toString())}
						type="password"
						id="password"
						value={password}
						placeholder="Enter password ..."
						required
						className="outline-none w-[100%] text-sm md:text-[1rem] px-4 py-2 rounded-md bg-gray-100 placeholder:text-sm md:placeholder:text-[1rem]"
					/>
				</div>
				<button className="w-[30%] mx-auto my-4 px-auto py-2 bg-purple-500 rounded-md hover:shadow-md hover:shadow-slate-400 transition-all hover:text-white duration-300">
					Login
				</button>
				<div className="mb-4">
					No account?{' '}
					<Link to="/register" className="text-blue-500 underline">
						Register
					</Link>
				</div>
			</form>
		</div>
	);
};

export default Login;
