import React, { useRef, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import uuid from 'react-uuid';

const Register = () => {
	let nameRef = useRef('');
	let emailRef = useRef('');
	let pwRef = useRef('');
	let cpwRef = useRef('');
	const [created, setCreated] = useState(false);
	const [error, setError] = useState('');
	const [passwordMatch, setPasswordMatch] = useState(true);
	const URL = 'http://localhost:8000/auth/register';
	function handleSubmit() {
		if (
			pwRef.current.value !== '' &&
			pwRef.current.value !== cpwRef.current.value
		) {
			setPasswordMatch(false);
			return;
		}
		axios
			.post(URL, {
				userId: uuid(),
				userName: nameRef.current.value,
				email: emailRef.current.value,
				password: pwRef.current.value,
			})

			.then((res) => {
				console.log(res);
				setCreated(true);
			})
			.catch((err) => setError(err.error));
	}
	return (
		<div className="w-full min-w-screen h-screen pt-[80px] flex items-center justify-center">
			{created ? (
				<div>
					<h1 className=" text-[1.5rem] font-bold text-green-700">
						User is created successfully!
					</h1>
					<Link
						to="/login"
						className="text-center text-blue-500 underline flex items-center justify-center text-[1.2rem] font-extrabold"
					>
						Login
					</Link>
				</div>
			) : (
				<div className="w-[320px] h-auto bg-white shadow-[#0303034f] shadow-md rounded-lg flex flex-col justify-between items-center">
					{error ? (
						<div className="px-2 py-1 mt-4 font-bold text-red-600 rounded-lg bg-slate-100">
							{error}
						</div>
					) : (
						<></>
					)}
					{passwordMatch ? (
						<></>
					) : (
						<div className="px-2 py-1 mt-4 font-bold text-red-600 rounded-lg bg-slate-100">
							Passwords do not match!
						</div>
					)}
					<form onSubmit={handleSubmit} className="w-[90%] mx-auto my-2 mb-10">
						<label htmlFor="name" className="block my-2 font-bold">
							Username
						</label>
						<input
							ref={nameRef}
							type="text"
							id="name"
							required
							placeholder="Enter username ..."
							className="outline-none w-[100%] px-4 py-2 rounded-md bg-gray-100"
						></input>
						<label htmlFor="email" className="block my-2 font-bold">
							Email
						</label>
						<input
							ref={emailRef}
							type="text"
							id="email"
							required
							placeholder="Enter email ..."
							className="outline-none w-[100%] px-4 py-2 rounded-md bg-gray-100"
						></input>
						{/* <div className="w-[90%] mx-auto font-bold"> */}
						<label htmlFor="pw" className="block my-2 font-bold">
							Password
						</label>
						<input
							ref={pwRef}
							type="text"
							id="pw"
							required
							placeholder="Enter password ..."
							className="outline-none w-[100%] px-4 py-2 rounded-md bg-gray-100"
						></input>
						<label htmlFor="re-pw" className="block my-2 font-bold">
							Comfirm Password
						</label>

						<input
							ref={cpwRef}
							type="text"
							id="re-pw"
							placeholder="Confirm password ..."
							required
							className="outline-none w-[100%] px-4 py-2 rounded-md bg-gray-100"
						></input>
						<button className="w-full py-2 mx-auto mt-6 transition-shadow bg-yellow-300 rounded-md px-auto hover:shadow-md duration-400 hover:shadow-slate-400">
							Register
						</button>
					</form>

					<p className="mb-4">
						Already has an account?
						<Link to="/login" className="text-blue-500 underline ">
							Login
						</Link>
					</p>
				</div>
			)}
		</div>
	);
};

export default Register;
