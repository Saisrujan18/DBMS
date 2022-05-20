import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Checkout({ products, setOrders, orders, user }) {
	const navigate = useNavigate();
	const [verified, setVerified] = useState(false);
	const [account, setAccount] = useState();
	const [otp, setOtp] = useState();
	const getSubTotal = (products) => {
		let subTotal = 0;
		for (let i in products) {
			subTotal += parseInt(products[i].price);
		}
		return subTotal;
	};
	let total = getSubTotal(products);
	const receiveOtp = async () => {
		try {
			let url = "http://localhost:3002/api/account/";
			let res = await axios.post(url, { account_number: account });
			let email_id = res.data[0].email_id;

			if (email_id) {
				url = "http://localhost:3002/api/auth/sendotp";
				res = await axios.post(url, { email_id });
				console.log(res);
			} else {
				console.log("No account Found");
			}
		} catch (err) {
			console.log(err);
		}
	};
	const verifyOtp = () => {
		let url = "http://localhost:3002/api/auth/verifyotp";
		axios
			.post(url, { otp })
			.then((res) => {
				console.log(res.data);
				if (res.data === "Verified") {
					setVerified(true);
				}
			})
			.catch((err) => console.log(err));
	};
	const placeOrder = (productList) => {
		let url = "http://localhost:3002/api/orders/add";
		let options = {
			headers: { "x-access-token": user.token },
		};
		let orderList = [];
		for (let i in productList) {
			let order = {
				customer_id: user.customer_id || 1,
				product_id: productList[i].product_id || 2,
				quantity: productList[i].quantity,
				status: "placed",
				placedAt: new Date().toISOString().slice(0, 19).replace("T", " "),
			};
			orderList.push(order);
		}
		axios
			.post(url, { orderList: orderList }, options)
			.then((res) => {
				console.log(res);
				for (let i in productList) {
					productList[i].status = res.data[i].status;
					productList[i].placedAt = res.data[i].placedAt;
					orders.push(productList[i]);
				}
				let newOrders = [...orders];
				setOrders(newOrders);
				navigate("/profile");	
			})
			.catch((err) => console.log(err));

	};
	return (
		<div className="max-w-xl p-2 border-gray-100 border-2 rounded-lg mt-2 mx-auto mb-6">
			<h1 className="text-3xl py-5 px-5 mx-auto">Order Summary</h1>
			<div className="flex flex-col gap-5 justify-evenly w-80 md:w-96 mx-10 my-2">
				<ul role="list" className="-my-6 divide-y divide-gray-200">
					{products.length == 0 && (
						<div className="text-2xl text-gray-500 py-2 text-center">
							No Products.
						</div>
					)}
					{products.length > 0 &&
						products.map((product, idx) => (
							<li key={idx} className="flex py-6 w-full">
								<div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
									<img
										src={product.imagesrc}
										alt={product.imageAlt}
										className="h-full w-full object-cover object-center"
									/>
								</div>

								<div className="ml-4 flex flex-1 flex-col">
									<div>
										<div className="flex justify-between text-base font-medium text-gray-900">
											<h3>
												<a href={product.href}> {product.name} </a>
											</h3>
											<p className="ml-4">${product.price}</p>
										</div>
										<p className="mt-1 text-sm text-gray-500">
											{product.color}
										</p>
									</div>
									<div className="flex flex-1 items-end justify-between text-sm">
										<p className="text-gray-500">Qty {product.quantity}</p>
									</div>
								</div>
							</li>
						))}
				</ul>
				<div className="border-t border-gray-200 py-6 px-4 sm:px-6">
					<div className="flex justify-between text-base font-medium text-gray-900">
						<p>Total</p>
						<p>${total}</p>
					</div>
				</div>
				<h1 className="text-xl pt-5 px-5 mx-auto">Bank Details</h1>
				<div className="flex flex-col w-full">
					<div className="text-gray-500 p-1">Account Number</div>
					<input
						type="text"
						id="phone"
						className="
						text-sm
						placeholder-gray-500
						pl-2
						pr-4
						rounded-md
						border border-gray-400
						w-full
						py-2
						focus:outline-none focus:border-blue-400"
						placeholder="A/c No."
						value={account}
						onChange={(e) => setAccount(e.target.value)}
					/>
					<button
						type="button"
						className="text-sm ml-auto font-medium text-indigo-500 hover:text-indigo-400"
						onClick={receiveOtp}
						disabled={total == 0}
					>
						Receive OTP
					</button>
					<span className="text-gray-500 p-1 py-2">Enter OTP</span>
					<input
						type="text"
						id="address"
						className="
						text-sm
						placeholder-gray-500
						pl-2
						pr-4
						rounded-md
						border border-gray-400
						w-full
						py-2
						focus:outline-none focus:border-blue-400"
						placeholder="OTP"
						value={otp}
						onChange={(e) => setOtp(e.target.value)}
					/>
					<button
						type="button"
						className="text-sm ml-auto font-medium text-indigo-500 hover:text-indigo-400"
						onClick={verifyOtp}
						disabled={total == 0}
					>
						Verify OTP
					</button>
				</div>
				<button
					className={
						verified
							? "flex mt-2 items-center bg-indigo-600 justify-center focus:outline-none px-6 text-base font-medium text-white shadow-sm hover:bg-indigo-700 rounded-md py-2 w-full transition duration-150 ease-in gap-1 only:bg-indigo-600"
							: "flex mt-2 items-center justify-center focus:outline-none px-6 text-base font-medium text-white shadow-sm rounded-md py-2 w-full transition duration-150 ease-in gap-1 bg-gray-500"
					}
					onClick={() => placeOrder(products)}
					disabled={!verified || total == 0}
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						className="h-5 w-5"
						viewBox="0 0 20 20"
						fill="currentColor"
					>
						<path
							fillRule="evenodd"
							d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
							clipRule="evenodd"
						/>
					</svg>
					Pay ${getSubTotal(products)}
				</button>
			</div>
		</div>
	);
}

export default Checkout;
