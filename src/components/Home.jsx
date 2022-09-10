import React from 'react';
import { useContext } from 'react';
import Card from './Card';
import { hideContext } from '../context';
// import useFetch from '../useFetch';
import Loading from './Loading';
const Home = () => {
	// const { products, loading } = useFetch(`https://fakestoreapi.com/products`);
	const { hide, setHide, products, loading } = useContext(hideContext);
	const menClothing = "men's clothing";
	const womenClothing = "women's clothing";
	const jewelery = 'jewelery';
	const electronics = 'electronics';
	const menArr = divideArr(products, menClothing);
	const womenArr = divideArr(products, womenClothing);
	const jewelArr = divideArr(products, jewelery);
	const electronicArr = divideArr(products, electronics);
	const highLight = [...menArr, ...womenArr, ...jewelArr, ...electronicArr];
	function formatTitle(str) {
		return str.split(' ').slice(0, 4).join(' ');
	}
	return loading ? (
		<Loading />
	) : (
		<div className="w-full min-h-screen py-[85px]">
			<div className="flex justify-center">
				<h1 className="tracking-widest mt-[3rem] mb-[2rem] text-gray-500 text-[1.5rem] xs:text-[2rem] sm:text-[3rem] md:text-[4rem] lg:text-[5rem] w-auto border-b-[.3rem] sm:border-b-[.4rem] md:border-b-[.5rem] border-yellow-500">
					Highlights
				</h1>
			</div>
			<div className="flex flex-wrap items-center justify-center gap-4">
				{highLight.map((product) => (
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
				))}
			</div>
		</div>
	);
	// );
};

export default Home;

function divideArr(categoryArr, category) {
	let arr = categoryArr.filter((product) => product.category === category);
	return arr.splice(arr.length - 2, 1);
}
