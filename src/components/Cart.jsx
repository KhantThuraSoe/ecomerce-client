/**
 * set initial price state to track total price of all items
 *
 * get id from navigated item
 *	fetch data with that id
 * 	create history array
 * 	push item to history array
 *
 * 	display the array of items list
 *
 * 		display card
 * 			calculate price base on quantity (local state)
 * 			track the total price of all items with setPrice (global state)
 *
 * show total price
 * 			show in MMK
 * 			show in USD
 *
 * 	empty items (user)
 *		if the array is empty return 
		otherwise set the array state to empty array
 * 	checkout (user)
 
 */
import React, { useContext, useState } from 'react';
import { arrayContext, productIdContext } from '../context';
import { useNavigate } from 'react-router-dom';

import Items from './Items/Items';
const Cart = ({ user }) => {
	const [isCheckedOut, setIsCheckedOut] = useState(false);

	const { hasId } = useContext(productIdContext);
	const { array, setArray } = useContext(arrayContext);
	const navigate = useNavigate();
	function handleRemove(i) {
		const newArray = array.filter((_, index) => index !== i);
		setArray(newArray);
	}
	if (array.length === 0 && isCheckedOut) {
		return (
			<div className="flex flex-col items-center justify-center w-full h-screen ">
				<h1 className="text-[3rem] my-4 text-green-600">Thanks!</h1>
				<div className="flex items-center justify-center">
					<button
						className="mx-2 px-2 outline-none text-blue-600 border-blue-600 border-[2px] rounded-md hover:bg-blue-600 hover:text-white duration-300"
						onClick={() => navigate('/')}
					>
						Home
					</button>
					<button
						className="mx-2 px-2 outline-none text-blue-600 border-blue-600 border-[2px] rounded-md hover:bg-blue-600 hover:text-white duration-300"
						onClick={() => navigate('/profile')}
					>
						profile
					</button>
				</div>
			</div>
		);
	} else if (hasId && array.length !== 0) {
		return (
			<Items
				setIsCheckedOut={setIsCheckedOut}
				user={user}
				array={array}
				setArray={setArray}
				onRemove={handleRemove}
			/>
		);
	} else {
		return (
			<div className="flex items-start justify-center w-full h-screen text-red-600 pt-28">
				No item in cart currently!
			</div>
		);
	}
};

export default Cart;
