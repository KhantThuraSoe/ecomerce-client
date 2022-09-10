import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Login = ({ setUser }) => {
	const [userName, setUserName] = useState('');
	const [password, setPassword] = useState('');
	const [isCompleted, setIsCompleted] = useState(false);
	const URL = `http://localhost:8000/auth/login`;
	const handleSubmit = async (e) => {
		e.preventDefault();
		await axios
			.post(URL, { userName, password })
			.then((response) => {
				if (response.status === 200) {
					setUser(response.data);
					setIsCompleted(true);
				}
			})
			.catch((err) => console.log(err));
	};
	return isCompleted ? (
		<div className="flex flex-col items-center justify-center w-full h-screen gap-4">
			<h1 className="text-xl text-green-600">Successfully logged in!</h1>
			<div>
				<Link to={'/profile'} className="mx-2 text-blue-500 underline">
					profile
				</Link>
				<Link to={'/products'} className="mx-2 text-blue-500 underline">
					product
				</Link>
			</div>
		</div>
	) : (
		<div className="w-full min-w-screen h-screen pt-[80px] flex items-center justify-center">
			<form
				onSubmit={handleSubmit}
				className="w-[320px] h-auto bg-white shadow-[#0303034f] shadow-md rounded-lg flex flex-col justify-between items-center"
			>
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
						className="outline-none w-[100%] px-4 py-2 rounded-md bg-gray-100"
					/>
				</div>
				<div className="w-[90%] mx-auto">
					<label htmlFor="password" className="block my-2 font-bold">
						Password
					</label>
					<input
						onChange={(e) => setPassword(e.target.value)}
						type="text"
						id="password"
						value={password}
						placeholder="Enter password ..."
						required
						className="outline-none w-[100%] px-4 py-2 rounded-md bg-gray-100"
					/>
				</div>
				<button className="w-[30%] mx-auto my-4 px-auto py-2 bg-yellow-300 rounded-md hover:shadow-md transition-shadow duration-400 hover:shadow-slate-400">
					Login
				</button>
				<p className="mb-4">
					No account?{' '}
					<Link to="/register" className="text-blue-500 underline">
						Register
					</Link>
				</p>
			</form>
		</div>
	);
};

export default Login;
