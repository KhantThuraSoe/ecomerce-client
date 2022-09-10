import React from 'react';
import image from '../assets/blank.png';
const Profile = (props) => {
	const { userName } = props.user;
	return (
		<div className="w-full h-screen pt-[90px]">
			<div className="flex flex-col items-center justify-center w-full gap-2">
				<img
					src={image}
					alt="blank_profile"
					className="w-[120px] h-[120px] rounded-full"
				/>
				<h1 className="text-xl font-bold tracking-wide ">{userName}</h1>
			</div>
			<div className=" w-full mx-auto max-w-[500px] bg-green-100 overflow-hidden rounded-md">
				<h1 className="w-full px-3 py-1 bg-[#ffb2227d]">Orders history</h1>
				<ul>
					<li>order</li>
					<li>order</li>
					<li>order</li>
					<li>order</li>
					<li>order</li>
				</ul>
			</div>
		</div>
	);
};

export default Profile;
