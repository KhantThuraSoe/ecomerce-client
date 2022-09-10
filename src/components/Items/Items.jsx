import { memo, useContext } from 'react';
import uuid from 'react-uuid';
import axios from 'axios';
import Item from './Item';
import { historyContext } from '../../context';
const Items = ({ setIsCheckedOut, user, array, setArray, onRemove }) => {
	const { setOrderHistory } = useContext(historyContext);
	const $_IN_KYAT = 2000;
	let tp = 0;
	function formatTitle(str) {
		return str.split(' ').slice(0, 4).join(' ');
	}
	const handleEmpty = () => {
		setArray([]);
	};
	const handleCheckOut = async () => {
		const URL = 'https://ktrs-web-shop.herokuapp.com/orders';
		//get current user info

		// const { userId, userName, email } = user;
		//get array of items and store in itemList array
		const itemList = array.map((item) => {
			return {
				name: formatTitle(item.title),
				quantity: item.qty,
				price: item.price * $_IN_KYAT * item.qty,
			};
		});
		// console.log(itemList);
		//get totalPrice of ordered items list
		const totalPrice = tp;
		//post orderInfo to backend

		await axios
			.post(URL, {
				orderId: uuid(),
				userId: user.userId,
				itemList: itemList,
				totalPrice: totalPrice,
			})
			.then(() => {
				setOrderHistory([...array]);
				setArray([]);
				setIsCheckedOut(true);
			})
			.catch((error) => error.message);
	};

	return (
		<div className="w-full h-auto pt-[100px] flex flex-col gap-1">
			{/* add item price to totalPrice in every item iteration */}
			{array.map((item, index) => {
				tp += item.price * item.qty * $_IN_KYAT;
				return <Item key={index} i={index} item={item} onRemove={onRemove} />;
			})}
			<h2 className="w-[90%] mx-auto my-2 sm:w-[80%] lg:w-[70%] flex justify-end text-black sm:text-md text-[.75rem] md:text-xl font-extrabold ">
				Total : {tp} MMK
			</h2>
			<div className="w-[280px] mx-auto my-4 flex items-center justify-center gap-3">
				<button
					onClick={handleCheckOut}
					className="sm:text-[.85rem] lg:text-[1rem] text-[.75rem] px-4 py-1 font-bold text-gray-100 duration-300 bg-yellow-500 rounded-md hover:text-gray-500 hover:bg-transparent hover:shadow-md hover:shadow-yellow-500"
				>
					Check out
				</button>
				<button
					onClick={handleEmpty}
					className="text-[.75rem] sm:text-[.85rem] lg:text-[1rem] px-4 py-1 font-bold text-gray-100 duration-300 bg-red-600 rounded-md hover:text-gray-500 hover:bg-transparent hover:shadow-md hover:shadow-red-600"
				>
					Empty cart
				</button>
			</div>
		</div>
	);
};
export default memo(Items);
