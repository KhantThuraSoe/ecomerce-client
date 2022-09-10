import axios from 'axios';
import { useState, useEffect } from 'react';

function useOrdersFetch(url) {
	const [orderHistory, setOrderHistory] = useState([]);
	const [error, setError] = useState('');
	const [isPending, setIsPending] = useState(true);
	useEffect(() => {
		axios
			.get(url)
			.then((res) => setOrderHistory(res.data))
			.catch((err) => setError(err.message))
			.finally(() => setIsPending(false));
	}, [url]);
	return { orderHistory, error, isPending };
}

export default useOrdersFetch;
