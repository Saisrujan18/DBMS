/* eslint-disable no-unused-vars */
import React,{useState} from "react";
import Card from "./Components/Card";
import Navbar from "./Components/Navbar";
import Home from "./Containers/Home";
import Login from "./Containers/Login";
import Cart from "./Containers/Cart";
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


function App() {
    const [cartOpen, setCartOpen] = useState(false);
	return (
		<Router>
			<Navbar open={cartOpen} setOpen={setCartOpen}/>
            <Cart open={cartOpen} setOpen={setCartOpen}/>
			<Routes>
				<Route path="/" element={<Login />} />
				<Route path="/login" element={<Login />} />
				<Route path="/home" element={<Home />} />
				<Route path="/profile" element={<SellerProfile />} />
			</Routes>
		</Router>
	);
}

export default App;
