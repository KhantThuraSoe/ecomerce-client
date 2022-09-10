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

	return loading ? (
		<Loading />
	) : (
		<div className="w-full min-h-screen pt-[85px] ">
			<div className="flex justify-center">
				<h1 className="mt-[3rem] mb-[2rem] text-[5rem] w-auto border-b-[.5rem] border-yellow-500">
					Hightlights
				</h1>
			</div>
			<div className="flex items-center justify-center flex-wrap gap-4">
				{highLight.map((product) => (
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
