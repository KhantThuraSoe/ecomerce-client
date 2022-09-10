import React, { useContext, useState, useRef } from 'react';
import { Outlet } from 'react-router-dom';
import { FaSearch } from 'react-icons/fa';
import Card from './Card';
import { hideContext } from '../context';
import Loading from './Loading';

const Products = React.memo(() => {
	console.log('render');
	const { hide, setHide, products, loading } = useContext(hideContext);
	const [arr, setArr] = useState([]);
	const [inputVal, setInputVal] = useState('');

	const inputRef = useRef(null);
	//handleChange
	// filter the products array by input value and assign to new array
	// set the state of the array with new array
	function handleChange() {
		setInputVal(inputRef.current.value);
		const newArr = products.filter((product) => {
			let t = JSON.stringify(product.title).toLowerCase();

			return t.includes(inputVal.toLowerCase());
		});
		setArr(newArr);
	}
	return loading ? (
		<Loading />
	) : (
		<div className={'w-full h-auto overflow-hidden pt-[85px] '}>
			<div className="flex items-start justify-center">
				<h1 className="h-[110px] mb-[1rem] text-[5rem] w-auto border-b-[.5rem] border-yellow-500">
					Products
				</h1>
			</div>
			<div className="w-full my-6">
				<div className="w-[600px] overflow-hidden h-10 mx-auto flex items-center justify-center rounded-lg bg-zinc-100">
					<FaSearch
						className="w-[10%] bg-transparent text-yellow-500"
						size="30px"
					/>
					<input
						ref={inputRef}
						onChange={handleChange}
						type="text"
						name="search"
						placeholder="Search product. . ."
						className="w-[90%] h-full text-lg px-6 outline-none bg-zinc-100 placeholder:text-gray-600"
					/>
				</div>
			</div>
			<div
				className={
					hide ? 'hidden' : 'flex items-center justify-center flex-wrap gap-4'
				}
			>
				{arr.length > 0 ? (
					arr.map((product) => (
						<Card
							hide={hide}
							setHide={setHide}
							key={product.id}
							id={product.id}
							title={product.title}
							img={product.image}
							price={product.price}
							desc={product.description}
						/>
					))
				) : inputVal.length > 0 ? (
					<div className="mt-8 font-semibold text-xl text-red-600">
						No matched item!
					</div>
				) : (
					products.map((product) => (
						<Card
							hide={hide}
							setHide={setHide}
							key={product.id}
							id={product.id}
							title={product.title}
							img={product.image}
							price={product.price}
							desc={product.description}
						/>
					))
				)}
			</div>

			<Outlet context={{ hide, setHide }} />
		</div>
	);
});

export default Products;
