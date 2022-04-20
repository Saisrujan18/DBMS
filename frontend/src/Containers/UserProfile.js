/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import Card from "../Components/Card";
import Navbar from "../Components/Navbar";
import ProfileCard from "../Components/ProfileCard";

function UserProfile(props) {
	const [isSeller, setSellerStatus] = useState(true);
	return (
		<div className="flex-1">
			<div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-2 my-2 max-w-fit mx-auto ">
				{!isSeller ? (
					<ProfileCard
						title={"Your Orders"}
						description={"View your recent orders"}
						target={"UserOrders"}
					/>
				) : (
					<ProfileCard
						title={"Orders Recieved"}
						description={"View recieved orders"}
						target={"SellerOrders"}
					/>
				)}
				<ProfileCard
					title={"Change Password"}
					description={"Secure Your account "}
					target={"ChangePassword"}
				/>
				{!isSeller ? (
					<ProfileCard
						title={"Add Money"}
						description={"Add money to your wallet"}
						target={"Addmoney"}
					/>
				) : (
					<ProfileCard
						title={"Request Money"}
						description={"Request money for your orders"}
						target={"Request Money"}
					/>
				)}
			</div>
			<div className="flex-grow"> </div>
			<div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-2 my-2 max-w-fit mx-auto ">
				{isSeller && (
					<ProfileCard
						title={"View your Products"}
						description={"See all your products"}
						target={"sellerPage"}
					/>
				)}
			</div>
		</div>
	);
}

export default UserProfile;
