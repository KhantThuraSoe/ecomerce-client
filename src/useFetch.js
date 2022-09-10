import { useState, useEffect } from 'react';
import axios from 'axios';
function useFetch(url) {
	const [products, setProducts] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState('');
	useEffect(() => {
		axios
			.get(url)
			.then((response) => setProducts(response.data))
			.catch((err) => setError(err))
			.finally(() => setLoading(false));
	}, [url]);
	return { products, loading, error };
}
export default useFetch;
