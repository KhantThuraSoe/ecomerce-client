import React from 'react';
import Loading from './Loading';
import useOrdersFetch from '../useOrdersFetch';
import image from '../assets/blank.png';
const Profile = ({ user, setUser }) => {
	const { userName, userId } = user;
	const URL = `https://ktrs-web-shop.herokuapp.com/orders/${userId}`;
	const { orderHistory, isPending } = useOrdersFetch(URL);
	const handleLogout = () => {
		localStorage.clear();
		setUser(null);
	};
	function formatDate(str) {
		return str.slice(0, 10);
	}
	return isPending ? (
		<Loading />
	) : (
		<div className="w-full h-screen pt-[90px]">
			<button
				className="flex justify-end px-4 py-2 text-[.85rem] hover:shadow-lg duration-300 hover:shadow-purple-300 mt-4 ml-auto mr-4 text-white bg-purple-500 rounded-md"
				onClick={handleLogout}
			>
				Logout
			</button>
			<div className="flex flex-col items-center justify-center w-full gap-2">
				<img
					src={image}
					alt="blank_profile"
					className="w-[80px] h-[80px] sm:w-[90px] sm:h-[90px] lg:w-[100px] lg:h-[100px] rounded-full"
				/>
				<h1 className="text-xl font-bold tracking-wide">{userName}</h1>
			</div>
			<div className=" w-full mx-auto my-4 max-w-[700px] overflow-hidden rounded-md">
				<h1 className="w-full px-4 py-1 mx-4 font-extrabold text-purple-500 border-b-2 border-b-black">
					Orders history
				</h1>

				<div className="w-full mb-8">
					{orderHistory.length === 0 && (
						<h2 className="w-auto text-center text-slate-400 mt-4 text-[.8rem]">
							No order history!
						</h2>
					)}
					{orderHistory.map((oh) => (
						<div key={oh.orderId} className="w-full px-4 py-4">
							<ul className="w-full">
								{oh.itemList.map((history, index) => (
									<li
										key={index}
										className="flex flex-col items-start justify-center w-auto h-auto py-2 sm:ml-0 sm:w-full sm:flex-row sm:items-center sm:justify-between"
									>
										<h3 className="mx-2 text-[.75rem] font-semibold sm:w-[40%]">
											{history.name}
										</h3>
										<h4 className="mx-2 text-[.75rem] font-semibold sm:w-[10%]">
											{history.quantity}
										</h4>
										<h4 className="mx-2 text-[.75rem] w-[20%] sm:text-center sm:w-[20%]">
											{history.price * history.quantity}MMK
										</h4>
										{/* <p className="mx-2 text-[.75rem] w-[20%] sm:text-center">{`${day}/${month}/${year}`}</p> */}
									</li>
								))}
							</ul>
							<div className="flex flex-wrap items-center justify-around border-b-2 border-purple-500 border-dotted md:mx-2 sm:justify-between">
								<p className="text-[.75rem] text-red-400">
									{formatDate(oh.updatedAt)}
								</p>
								<h1 className="text-[.8rem] font-semibold">
									Total:{oh.totalPrice}MMK
								</h1>
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

export default Profile;
