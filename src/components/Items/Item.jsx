import { memo } from 'react';
import { CgTrash } from 'react-icons/cg';
const Item = (props) => {
	const $_IN_KYAT = 2000;
	const { item, i, onRemove } = props;

	const PRICE_IN_MMK = Math.round(item.price * $_IN_KYAT);
	function formatTitle(str) {
		return str.split(' ').slice(0, 4).join(' ');
	}
	return (
		<div className="relative w-[90%] md:w-[80%] lg:w-[70%] mx-auto pr-3 pb-2 border-b-2 flex items-center justify-around">
			<CgTrash
				onClick={() => onRemove(i)}
				className="absolute top-[28%] sm:top-[33%] md:top-[35%] right-0 text-red-500 cursor-pointer"
			/>
			<img
				src={item.image}
				alt="product_image"
				className="md:w-[60px] md:h-[65px] sm:w-[50px] sm:h-[55px] h-[45px] w-[40px]"
			/>
			<h2 className="text-[.5rem] sm:text-[.75rem] md:text-[1rem]">
				{formatTitle(item.title)}
			</h2>

			<h3 className="text-[.5rem]  sm:text-[.75rem] md:text-[1rem]">
				{item.qty}
			</h3>
			<h3 className="mr-2 text-[.5rem] text-gray-500  sm:text-[.75rem] md:text-[1rem]">
				{PRICE_IN_MMK * item.qty} MMK
			</h3>
		</div>
	);
};
export default memo(Item);
