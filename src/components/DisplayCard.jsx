import React, { useState, useContext } from 'react';
import { useParams, useNavigate, useOutletContext } from 'react-router-dom';
import Loading from './Loading';
import { IoIosCloseCircleOutline } from 'react-icons/io';
import useFetch from '../useFetch';
import { countContext, productIdContext } from '../context';
import { arrayContext } from '../context';
export const DisplayCard = () => {
	const $_IN_KYAT = 2000;
	const [quantity, setQuantity] = useState(1);
	const [added, setAdded] = useState(false);
	const { productId } = useParams();
	const { hide, setHide } = useOutletContext();
	const { setId, setHasId } = useContext(productIdContext);
	const { count, setCount } = useContext(countContext);
	const { setArray } = useContext(arrayContext);
	const navigate = useNavigate();
	const { products, loading } = useFetch(
		`https://fakestoreapi.com/products/${productId}`
	);
	let { image, title, price, description } = products;
	const priceMMK = price * $_IN_KYAT;
	const handleClick = () => {
		setHide(!hide);
		navigate(-1);
	};
	return loading ? (
		<Loading />
	) : added ? (
		navigate(-1)
	) : (
		<div
			className={
				'fixed z-30 bg-white w-full h-screen max-h-screen top-0 left-0 flex items-center justify-center'
			}
		>
			<div className="relative w-[600px] px-4 h-auto bg-white flex flex-col justify-center rounded-lg">
				<IoIosCloseCircleOutline
					onClick={handleClick}
					size="30px"
					className="absolute text-red-600 cursor-pointer top-6 right-2"
				/>
				<img
					src={image}
					alt="product_image"
					className="bg bg-contain w-[150px] h-[150px] mx-auto my-4 mt-10"
				/>
				<h2 className="font-[800] text-[15px] leading leading-tight my-2">
					{title}
				</h2>
				<h3 className="mb-2 font-semibold tracking-wide text-gray-500">
					{priceMMK} MMK
				</h3>
				<h4 className="font-medium text-gray-600 text-[12px] my-2">
					{description}
				</h4>
				<div className="inline-flex items-center justify-center">
					<button
						onClick={() => {
							if (quantity < 2) {
								return;
							}
							setQuantity(quantity - 1);
						}}
						className=" mx-2 text-[3rem]"
					>
						-
					</button>

					<h2 className=" mx-2 text-[2rem] font-bold">{quantity}</h2>
					<button
						onClick={() => {
							setQuantity(quantity + 1);
						}}
						className=" mx-2 text-[2rem]"
					>
						+
					</button>
				</div>
				<div className="w-full">
					<div className="flex items-center justify-center">
						{priceMMK * quantity} MMK || {price * quantity} $
					</div>
				</div>

				<div className="flex items-center justify-center w-full">
					<button
						className="mt-4 mb-10 font-bold bg-yellow-500 w-[200px] py-2 rounded-md hover:shadow hover:scale-110 duration-300"
						onClick={() => {
							setHide(!hide);
							let c = count;
							setCount((c += quantity));
							// setQty(quantity);
							setHasId(true);
							setId(productId);
							setAdded(true);
							setArray((prev) => [...prev, { ...products, qty: quantity }]);
						}}
					>
						ADD TO CART
					</button>
				</div>
			</div>
		</div>
	);
};
