import React, { useContext, useState, useRef } from 'react';
import { Outlet } from 'react-router-dom';
import { FaSearch } from 'react-icons/fa';
import Card from './Card';
import { hideContext } from '../context';
import Loading from './Loading';

const Products = () => {
	const { hide, setHide, products, loading } = useContext(hideContext);
	const [arr, setArr] = useState([]);
	const [inputVal, setInputVal] = useState('');

	const inputRef = useRef(null);
	function formatTitle(str) {
		return str.split(' ').slice(0, 4).join(' ');
	}
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
		<div className={'w-full h-auto overflow-hidden py-[85px]'}>
			<div className="flex justify-center">
				<h1 className="tracking-widest mt-[3rem] mb-[2rem] text-gray-500 text-[1.5rem] xs:text-[2rem] sm:text-[3rem] md:text-[4rem] lg:text-[5rem] w-auto border-b-[.3rem] sm:border-b-[.4rem] md:border-b-[.5rem] border-yellow-500">
					Products
				</h1>
			</div>
			<div className="w-full mb-8 sm:mb-10 md:my-12">
				<div className="md:w-[600px] sm:w-[300px] w-[250px] overflow-hidden h-6 sm:h-8 md:h-10 mx-auto flex items-center justify-center rounded-3xl bg-zinc-100">
					<FaSearch
						className="w-[10%] bg-transparent text-yellow-500 transform scale-50 md:scale-75"
						size="30px"
					/>
					<input
						ref={inputRef}
						onChange={handleChange}
						type="text"
						name="search"
						placeholder="Search product. . ."
						className="w-[90%] h-full text-xs sm:text-base md:text-lg px-6 outline-none bg-zinc-100 placeholder:text-[.7rem] sm:placeholder:text-[.8rem] md:placeholder:text-[1rem] placeholder:text-gray-600"
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
					<div className="mt-8 text-xl font-semibold text-red-600">
						No matched item!
					</div>
				) : (
					products.map((product) => (
						<Card
							hide={hide}
							setHide={setHide}
							key={product.id}
							id={product.id}
							title={formatTitle(product.title)}
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
};

export default React.memo(Products);
