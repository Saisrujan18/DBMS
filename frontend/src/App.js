/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import Card from "./Components/Card";
import Navbar from "./Components/Navbar";
import Home from "./Containers/Home";
import Login from "./Containers/Login";
import Cart from "./Containers/Cart";
import Product from "./Containers/Product"
import UserProfile from "./Containers/UserProfile";
import SellerPage from "./Containers/SellerPage";
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Link,
	Routes,
} from "react-router-dom";
import Profile from "./Containers/Profile";
import SellerProfile from "./Containers/SellerProfile";
import Register from "./Containers/Register";

function App() {
	const [cartOpen, setCartOpen] = useState(false);
	return (
		<div className="flex flex-col h-screen bg-white">
			<Router>
				<Navbar open={cartOpen} setOpen={setCartOpen} />
				<Cart open={cartOpen} setOpen={setCartOpen} />
				<Routes>
					<Route path="/" element={<Login />} />
					<Route path="/login" element={<Login />} />
					<Route path="/product/:id" element={<Product />} />
					<Route path="/product/" element={<Product />} />
					<Route path="/register" element={<Register />} />
					<Route path="/home" element={<Home />} />
					<Route path="/profile" element={<SellerProfile />} />
					<Route path="/cart" element={<Cart/>}/>
				</Routes>
			</Router>
		</div>
	);
}

export default App;
