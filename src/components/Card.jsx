import { useNavigate } from 'react-router-dom';
const Card = ({ hide, setHide, id, title, img, price, desc }) => {
	const navigate = useNavigate();
	const $_IN_KYAT = 2000;
	const handleClick = () => {
		navigate(`/products/${id}`);
		setHide(!hide);
	};

	return (
		<div
			onClick={handleClick}
			className="w-[230px] h-[350px] bg-white flex flex-col justify-center shadow-[#0000002b] shadow-sm px-2 rounded-lg cursor-pointer hover:shadow-black duration-500"
		>
			<img
				src={img}
				alt="product_image"
				className="bg bg-contain w-[180px] h-[180px] mx-auto my-4"
			/>
			<h2 className="font-[800] text-[15px] leading leading-tight my-2">
				{title}
			</h2>
			<h3 className="my-3 font-semibold tracking-wide text-gray-500">
				{price * $_IN_KYAT} MMK || {price} $
			</h3>
			{/* <h4 className="font-medium text-gray-600 text-[12px] my-2">
				{desc.substr(0, 70)}...
			</h4> */}
		</div>
	);
};
export default Card;
