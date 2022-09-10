import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { CgLogIn, CgProfile } from 'react-icons/cg';
import { BsCart4 } from 'react-icons/bs';
import { countContext } from '../context';

const NavBar = (props) => {
	const user = props.user;
	const { count, setCount } = useContext(countContext);
	return (
		<div className="fixed z-20 w-full h-[80px] px-[2rem] bg-white flex items-center justify-between">
			<h1 className="font-bold text-[30px]">
				Comerce.<span className="text-yellow-300 ">MM</span>
			</h1>
			<div>
				<NavLink
					style={({ isActive }) =>
						isActive
							? { borderBottom: '3px solid black' }
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
							? { borderBottom: '3px solid black' }
							: { borderBottom: 'none' }
					}
					className="mx-2"
					to="/products"
				>
					Products
				</NavLink>
			</div>
			<div className="flex flex-row">
				<NavLink className="mx-2" to="/cart">
					<div className="flex items-center justify-center">
						<BsCart4 className="scale-150" onClick={() => setCount(0)} />
						<h3
							className={
								count === 0
									? 'hidden'
									: 'w-[15px] h-[15px] transform -translate-y-2 bg-red-500 rounded-full text-white text-xs flex items-center justify-center'
							}
						>
							{count}
						</h3>
					</div>
				</NavLink>
				<NavLink className="ml-4" to="/profile">
					<CgProfile className="scale-150" />
				</NavLink>
			</div>
			{user ? null : (
				<div>
					<NavLink to="/login">
						<h2 className="flex items-center justify-center py-2 pl-2 pr-4 bg-yellow-300 rounded-lg bg">
							<CgLogIn className="mr-1" />
							Login
						</h2>
					</NavLink>
				</div>
			)}
		</div>
	);
};

export default NavBar;
