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
import React, { useContext } from 'react';
import { arrayContext, productIdContext } from '../context';

import { FaTimes } from 'react-icons/fa';

const Cart = () => {
	const { hasId } = useContext(productIdContext);
	const { array, setArray } = useContext(arrayContext);
	function handleRemove(i) {
		const newArray = array.filter((_, index) => index !== i);
		setArray(newArray);
	}
	if (hasId && array.length !== 0) {
		//pass parent state totalPrice to control the totalPrice
		return <Items array={array} setArray={setArray} onRemove={handleRemove} />;
	} else {
		return (
			<div className="w-full h-screen flex items-start justify-center text-red-600 pt-28">
				No item in cart currently!
			</div>
		);
	}
};

export default Cart;
const Items = ({ array, setArray, onRemove }) => {
	const $_IN_KYAT = 2000;
	let tp = 0;
	const handleEmpty = () => {
		setArray([]);
	};
	return (
		<div className="w-full h-auto pt-[100px] flex flex-col gap-1">
			{/* add item price to totalPrice in every item iteration */}
			{array.map((item, index) => {
				tp += item.price * item.qty * $_IN_KYAT;
				return <Item key={index} i={index} item={item} onRemove={onRemove} />;
			})}
			<div className="w-[80%] mx-auto my-4 flex justify-end text-black text-xl font-extrabold">
				Total : {tp} MMK
			</div>
			<div className="w-[300px] mx-auto my-4 flex items-center justify-center gap-3">
				<button
					// onClick={handleCheckOut}
					className="px-4 py-1 font-bold text-gray-100 bg-yellow-500 hover:text-gray-500 hover:bg-transparent hover:border-2 hover:border-yellow-500 duration-300 rounded-md"
				>
					Check out
				</button>
				<button
					onClick={handleEmpty}
					className="px-4 py-1 font-bold text-gray-100 bg-red-600 hover:text-gray-500 hover:bg-transparent hover:border-2 hover:border-red-600 duration-300 rounded-md"
				>
					Empty cart
				</button>
			</div>
		</div>
	);
};
const Item = (props) => {
	const $_IN_KYAT = 2000;
	const { item, i, onRemove } = props;

	const PRICE_IN_MMK = Math.round(item.price * $_IN_KYAT);

	return (
		<div className="relative w-[80%] mx-auto pr-3 pb-2 border-b-2 flex items-center justify-around">
			<FaTimes
				onClick={() => onRemove(i)}
				className="absolute top-[35%] right-2 text-gray-500 cursor-pointer"
			/>
			<img src={item.image} alt="product_image" className="w-[80px] h-auto" />
			<h2>{item.title.slice(0, 20)}...</h2>
			<div className="flex-col items-center justify-center">
				<h2 className="my-1">Quantity</h2>
				<h3 className="flex justify-center font-bold">{item.qty}</h3>
			</div>
			<h3 className="font-semibold mb-2 tracking-wide text-gray-500">
				{PRICE_IN_MMK * item.qty} MMK
			</h3>
		</div>
	);
};
