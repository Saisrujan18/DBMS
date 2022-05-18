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
	useNavigate,
} from "react-router-dom";
import Profile from "./Containers/Profile";
import SellerProfile from "./Containers/SellerProfile";
import Register from "./Containers/Register";
import ProtectedRoute from "./Components/ProtectedRoute";

const Protect = (component) => {
	return <ProtectedRoute component={component} />;
};

function App() {
	const [cartOpen, setCartOpen] = useState(false);
	const [cartitems, setCartitems] = useState([]);
	const user = JSON.parse(sessionStorage.getItem("user"));
	const [userData, setUserData] = useState();

	useEffect(() => {
		setUserData(user);
		if (user) {
			let url = "http://localhost:3002/api/cartitems/";
			const options = {
				headers: { "x-access-token": user.token },
			};
			axios
				.get(url, options)
				.then((res) => {
					setCartitems(res.data);
				})
				.catch((err) => console.log(err));
		}
	}, []);
	const removeCartitem = (cartitem_id) => {
		const newCartitems = [
			...cartitems.filter((e) => {
				return e.cartitem_id !== cartitem_id;
			}),
		];
		console.log(cartitem_id, "fron");
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

	const addCartitemn = (pro) => {
		const newCartItems = [...cartitems];

		let url = "http://localhost:3002/api/cartitems/add";
		let options = {
			headers: { "x-access-token": user.token },
		};
		let cartitem = {
			product_id: pro.product_id,
			customer_id: user.customer_id,
			quantity: 1,
		};
		axios
			.post(url, cartitem, options)
			.then((res) => {
				pro.cartitem_id = res.data.cartitem_id;
				newCartItems.push(pro);
				setCartitems(newCartItems);
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
						element={Protect(<Product user={user} addToCart={addCartitemn} />)}
					/>
					<Route path="/product/" element={Protect(<Product />)} />
					<Route path="/register" element={<Register />} />
					<Route path="/home" element={Protect(<Home />)} />
					<Route path="/profile" element={Protect(<SellerProfile />)} />
					<Route path="/cart" element={Protect(<Cart />)} />
				</Routes>
			</Router>
		</div>
	);
}

export default App;
