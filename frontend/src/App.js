/* eslint-disable no-unused-vars */
import React from "react";
import Card from "./Components/Card";
import Navbar from "./Components/Navbar";
import Home from "./Containers/Home";
import Login from "./Containers/Login";
import UserProfile from "./Containers/UserProfile";
import SellerPage from "./Containers/SellerPage";

function App() {
    return (
        <div className="bg-gray-100">
            <SellerPage/>
        </div>
    );
}

export default App;