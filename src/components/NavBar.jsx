import React, { useContext, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { CgLogIn, CgProfile } from 'react-icons/cg';
import { FiBarChart2 } from 'react-icons/fi';
import { IoClose } from 'react-icons/io5';
import { BsCart4 } from 'react-icons/bs';
import { countContext } from '../context';

const NavBar = (props) => {
	const user = props.user;
	const { count, setCount } = useContext(countContext);
	const [showNav, setShowNav] = useState(false);

	return (
		<>
			<div className="fixed z-20 min-w-[275px] max-w-[1600px] w-screen h-[80px] bg-white flex items-center justify-between">
				<Link
					to="/"
					className="ml-[.5rem] w-auto sm:ml-[2rem] sm:font-bold sm:text-[25px] md:text-[30px] font-semibold text-[20px] text-purple-500"
				>
					Comerce.
				</Link>
				<div className="md:w-[30%] md:flex md:justify-around hidden">
					<NavLink
						style={({ isActive }) =>
							isActive
								? {
										borderBottom: '3px solid black',
										color: 'rgb(168 85 247 )',
								  }
								: { borderBottom: 'none' }
						}
						className="mx-2"
						to="/"
					>
						Home
					</NavLink>
					<NavLink
						style={({ isActive }) =>
							isActive
								? { borderBottom: '3px solid black', color: 'rgb(168 85 247)' }
								: { borderBottom: 'none' }
						}
						className="mx-2"
						to="/products"
					>
						Products
					</NavLink>
				</div>
				<div className="flex md:w-[20%] justify-center w-full md:justify-around">
					<NavLink className="" to="/cart">
						<div className="" onClick={() => setCount(0)}>
							<div className="relative">
								<BsCart4 className="w-full flex items-center justify-center text-[.75rem] sm:text-[1rem] text-gray-500 duration-200 scale-150 group-hover:-translate-y-3" />
							</div>
							<h3
								className={
									count === 0
										? 'hidden'
										: 'absolute w-[13px] h-[13px] translate-x-2 sm:translate-x-4 -translate-y-5 sm:-translate-y-6  bg-red-500 rounded-full text-white text-xs flex items-center justify-center'
								}
							>
								{count}
							</h3>
						</div>
					</NavLink>
					<NavLink className="hidden ml-4 md:inline" to="/profile">
						<div className="relative flex items-center justify-center group">
							<CgProfile className="w-full flex items-center justify-center text-[.75rem] sm:text-[1rem] text-gray-500 duration-200 scale-150 " />
						</div>
					</NavLink>
				</div>
				<div className="absolute mr-2 -mt-1 cursor-pointer top-[35px] right-4 sm:mr-4 md:hidden">
					<FiBarChart2
						onClick={() => setShowNav(!showNav)}
						className={showNav ? 'hidden' : 'text-[1.5rem] -rotate-90'}
					/>
					<IoClose
						onClick={() => setShowNav(!showNav)}
						className={showNav ? 'text-[1.5rem]' : 'hidden'}
					/>
				</div>
				{user ? null : (
					<div className="mr-4">
						<NavLink to="/login">
							<h2 className="hidden text-white md:text-[15px] md:flex items-center justify-center py-2 pl-2 pr-4 bg-purple-500 hover:text-gray-700 hover:bg-purple-300 duration-300 rounded-lg bg">
								<CgLogIn className="mr-1" />
								Login
							</h2>
						</NavLink>
					</div>
				)}
			</div>
			<nav
				className={
					showNav
						? 'fixed top-[80px] right-0 z-10 w-full h-screen bg-[#fbfbfb] text-black flex flex-col items-center justify-around'
						: 'hidden'
				}
			>
				<ul className="flex flex-col gap-4">
					<NavLink
						style={({ isActive }) =>
							isActive ? { color: 'rgb(168 85 247)' } : { color: 'black' }
						}
						onClick={() => setShowNav(!showNav)}
						className="text-[1rem]"
						to="/"
					>
						<li>Home</li>
					</NavLink>

					<NavLink
						style={({ isActive }) =>
							isActive ? { color: 'rgb(168 85 247)' } : { color: 'black' }
						}
						onClick={() => setShowNav(!showNav)}
						to="/products"
					>
						<li>Products</li>
					</NavLink>
				</ul>
				<div>
					<NavLink
						onClick={() => setShowNav(!showNav)}
						className={
							user
								? 'flex items-center justify-center hover:text-gray-400 duration-300'
								: 'hidden'
						}
						to="/profile"
					>
						<div className="flex flex-col items-center justify-center text-3xl">
							<CgProfile />
						</div>
					</NavLink>
					<NavLink
						onClick={() => setShowNav(!showNav)}
						className={user ? 'hidden' : 'w-auto'}
						to="/login"
					>
						<h2 className="flex flex-row py-1 pl-2 pr-3 text-white duration-300 bg-purple-500 border-none rounded-md hover:bg-purple-300 hover:text-gray-700">
							<CgLogIn className="my-auto mr-1" />
							Login
						</h2>
					</NavLink>
				</div>
			</nav>
		</>
	);
};

export default NavBar;
