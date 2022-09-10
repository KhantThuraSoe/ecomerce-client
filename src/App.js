import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Cart from './components/Cart';
import { DisplayCard } from './components/DisplayCard';
import Home from './components/Home';
import Login from './components/Login';
import NavBar from './components/NavBar';
import NotFound from './components/NotFound';
import Products from './components/Products';
import Profile from './components/Profile';
import Loading from './components/Loading';
import {
	ProtectedRoute,
	// AdminProtectedRoute,
} from './components/ProtectedRoute';
import useFetch from './useFetch';
import { hideContext } from './context';

import { productIdContext } from './context';
import { qtyContext } from './context';
import { countContext } from './context';
import { arrayContext } from './context';
import { historyContext } from './context';
import Register from './components/Register';

function App() {
	const { products, loading } = useFetch(`https://fakestoreapi.com/products`);
	const [hide, setHide] = useState(false);
	const [id, setId] = useState(null);
	const [hasId, setHasId] = useState(false);
	const [qty, setQty] = useState(1);
	const [count, setCount] = useState(0);
	const [array, setArray] = useState([]);
	const [user, setUser] = useState(null);
	const [orderHistory, setOrderHistory] = useState([]);
	useEffect(() => {
		const userData = localStorage.getItem('user');
		if (userData) setUser(JSON.parse(userData));
	}, []);
	useEffect(() => {
		localStorage.setItem('user', JSON.stringify(user));
	});
	return (
		<div className="font-[Poppins] bg-[#fbfbfb] min-w-[250px] max-w-[1600px]">
			<hideContext.Provider value={{ hide, setHide, products, loading }}>
				{loading ? (
					<Loading />
				) : (
					<productIdContext.Provider value={{ id, setId, hasId, setHasId }}>
						<qtyContext.Provider value={{ qty, setQty }}>
							<countContext.Provider value={{ count, setCount }}>
								<arrayContext.Provider value={{ array, setArray }}>
									<historyContext.Provider
										value={{ orderHistory, setOrderHistory }}
									>
										<Router>
											<NavBar user={user} />
											<Routes>
												<Route path="/" exact element={<Home />} />
												<Route
													path="/products"
													element={loading ? <Loading /> : <Products />}
												>
													<Route
														path=":productId"
														element={
															<ProtectedRoute user={user}>
																<DisplayCard />
															</ProtectedRoute>
														}
													/>
												</Route>

												<Route
													path="/profile"
													element={
														<ProtectedRoute user={user}>
															<Profile user={user} setUser={setUser} />
														</ProtectedRoute>
													}
												/>
												<Route
													path="/cart"
													element={
														<ProtectedRoute user={user}>
															<Cart user={user} />
														</ProtectedRoute>
													}
												/>
												{/* <Route
													path="/admin_login"
													element={
														<AdminProtectedRoute admin={admin}>
															<Admin admin={admin} />
														</AdminProtectedRoute>
													}
												/> */}
												<Route
													path="/login"
													element={<Login setUser={setUser} />}
												/>
												<Route path="/register" element={<Register />} />
												<Route path="*" element={<NotFound />} />
											</Routes>
										</Router>
									</historyContext.Provider>
								</arrayContext.Provider>
							</countContext.Provider>
						</qtyContext.Provider>
					</productIdContext.Provider>
				)}
			</hideContext.Provider>
		</div>
	);
}

export default App;
