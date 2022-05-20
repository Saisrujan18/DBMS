/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import Card from "./Components/Card";
import Navbar from "./Components/Navbar";
import Home from "./Containers/Home";
import Login from "./Containers/Login";
import Cart from "./Containers/Cart";
import Product from "./Containers/Product";
import UserProfile from "./Containers/UserProfile";
import SellerPage from "./Containers/SellerPage";
import axios from "axios";
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Link,
	Routes,
	Navigate,
} from "react-router-dom";
import Profile from "./Containers/Profile";
import SellerProfile from "./Containers/SellerProfile";
import Register from "./Containers/Register";
import ProtectedRoute from "./Components/ProtectedRoute";
import Checkout from "./Containers/Checkout";

const Protect = (component) => {
	return <ProtectedRoute component={component} />;
};

function App() {	
	const [cartOpen, setCartOpen] = useState(false);
	const [cartitems, setCartitems] = useState([]);
	const user = JSON.parse(sessionStorage.getItem("user"));
	const [userData, setUserData] = useState();
	const [orders, setOrders] = useState([]);

	useEffect(async () => {
		setUserData(user);
		if (user && user.customer_id) {
			let url = "http://localhost:3002/api/cartitems/";
			const options = {
				headers: { "x-access-token": user.token },
			};
			try {
				let res = await axios.get(url, options);
				setCartitems(res.data);
				url = "http://localhost:3002/api/orders/" + user.customer_id;
				res = await axios.get(url, options);
				setOrders(res.data);
			} catch (err) {
				console.log(err + " Error loading data");
			}
		}
	}, []);
	const removeCartitem = (cartitem_id) => {
		const newCartitems = [
			...cartitems.filter((e) => {
				return e.cartitem_id !== cartitem_id;
			}),
		];
		setCartitems(newCartitems);
		let url = "http://localhost:3002/api/cartitems/remove";
		let options = {
			headers: { "x-access-token": user.token },
		};
		axios
			.post(
				url,
				{
					cartitem_id: cartitem_id,
				},
				options
			)
			.then((res) => {
				console.log(res);
			})
			.catch((err) => console.log(err));
	};
	const addCartitemn = (product) => {
		const newCartItems = [...cartitems];

		let url = "http://localhost:3002/api/cartitems/add";
		let options = {
			headers: { "x-access-token": user.token },
		};
		console.log(user.customer_id);
		let cartitem = {
			product_id: product.product_id,
			customer_id: user.customer_id,
			quantity: 1,
		};
		axios
			.post(url, cartitem, options)
			.then((res) => {
				product.cartitem_id = res.data.cartitem_id;
				product.quantity = 1;
				newCartItems.push(product);
				setCartitems(newCartItems);
				console.log(newCartItems);
			})
			.catch((err) => console.log(err));
	};

	return (
		<div className="flex flex-col h-screen bg-white">
			<Router>
				<Navbar
					open={cartOpen}
					setOpen={setCartOpen}
					userData={userData}
					setUserData={setUserData}
					cartsize={cartitems.length}
				/>

				{userData && (
					<Cart
						open={cartOpen}
						setOpen={setCartOpen}
						removeCartitem={removeCartitem}
						products={cartitems}
					/>
				)}
				<Routes>
					<Route path="/" element={<Login setUserData={setUserData} />} />
					<Route path="/login" element={<Login setUserData={setUserData} />} />
					<Route
						path="/product/:id"
						element={Protect(
							Protect(<Product user={user} addToCart={addCartitemn} />)
						)}
					/>
					<Route path="/register" element={<Register />} />
					<Route path="/home" element={Protect(<Home user={user} />)} />
					<Route
						path="/profile"
						element={Protect(
							!user || (user && user.customer_id) ? (
								<UserProfile
									orders={orders}
									user={user}
									setUserData={setUserData}
								/>
							) : (
								<SellerProfile
									orders={orders}
									user={user}
									setUserData={setUserData}
								/>
							)
						)}
					/>
					<Route
						path="/checkout"
						element={Protect(
							<Checkout
								setOrders={setOrders}
								products={cartitems}
								orders = {orders}
								user={user}
								// placeOrder={placeOrder}
							/>
						)}
					/>
				</Routes>
			</Router>
		</div>
	);
}

export default App;
