import axios from "axios";
import React from "react";
import { useState, useEffect } from "react";

let inputStyle =
	"text-sm placeholder-gray-500 pl-2 rounded-md border border-white py-2 focus:outline-none focus:border-blue-400 hover:border-blue-200";

function SellerProfile({ orders, user, setUserData }) {
	const [nav, setNav] = useState("recent");
	const [inventory, setInventory] = useState([]);
	const [recentOrders, setRecentOrders] = useState([]);
	const [currentUser, setUser] = useState({
		name: user.name,
		phone: user.phone,
		address: user.address,
		email: user.email_id,
	});
	const [product, setProduct] = useState({
		name: "",
		price: "",
		description: "",
		category: "",
		imagesrc: "",
		stock: 0,
	});
	useEffect(async () => {
		let url = "http://localhost:3002/api/products/b/" + user.seller_id;
		let options = {
			headers: {
				"x-access-token": user.token,
			},
		};
		try {
			let res = await axios.get(url, options);
			setInventory(res.data);

			url = "http://localhost:3002/api/orders/b/" + user.seller_id;
			res = await axios.get(url, options);

			setRecentOrders(res.data);
		} catch (err) {
			console.log(err);
		}
	}, []);

	const update = (event) => {
		event.preventDefault();
		const { id, value } = event.target;
		if (id === "phone" || id === "address" || id === "email") {
			setUser((prevNote) => {
				return {
					...prevNote,
					[id]: value,
				};
			});
		} else {
			setProduct((prevNote) => {
				return {
					...prevNote,
					[id]: value,
				};
			});
		}
	};
	const UpdateInDb = () => {
		let url = "http://localhost:3002/api/sellers/update";
		const { name, address, email, phone } = currentUser;
		let options = {
			headers: {
				"x-access-token": user.token,
			},
		};
		axios
			.post(
				url,
				{
					setller_id: user.seller_id,
					name,
					address,
					email_id: email,
					phone,
				},
				options
			)
			.then((res) => {
				let newUser = { ...user };
				newUser.name = currentUser.name;
				newUser.phone = currentUser.phone;
				newUser.address = currentUser.address;
				sessionStorage.removeItem("user");
				sessionStorage.setItem("user", JSON.stringify(newUser));
				setUserData(newUser);
			})
			.catch((err) => console.log(err));
	};
	const addProduct = () => {
		let url = "http://localhost:3002/api/products/add";
		product.seller_id = user.seller_id;
		product.stock = parseInt(product.stock);
		let options = {
			headers: {
				"x-access-token": user.token,
			},
		};
		axios
			.post(url, { product: product }, options)
			.then((res) => {
				let newInventory = [...inventory]
				newInventory.push(product)
				setInventory(newInventory)
				setProduct({});
			})
			.catch((err) => console.log(err));
	};
	return (
		<div className="min-h-full">
			<div className="bg-gray-100 pt-10 pb-5">
				<div className="max-w-fit mx-auto flex flex-row max-h-44 bg-white rounded-md p-4 gap-2 shadow-md justify-center">
					<div className="avatar my-auto flex flex-col text-center">
						<div className="w-20 rounded-full mx-auto">
							<img src="https://api.lorem.space/image/face?hash=92048" />
						</div>
						<h1 className="text-sm p-2 text- ">{currentUser.name}</h1>
					</div>
					<div className="flex flex-col my-1">
						<div className="flex flex-row w-80">
							<span className="text-gray-500 w-20 p-1">EmailId</span>
							<input
								type="text"
								onChange={update}
								id="email"
								className={inputStyle}
								readOnly
								value={currentUser.email}
							/>
						</div>
						<div className="flex flex-row  w-80">
							<span className="text-gray-500 w-20 p-1">Phone</span>
							<input
								type="text"
								onChange={update}
								id="phone"
								placeholder="Add a Phone Number"
								className={inputStyle}
								value={currentUser.phone}
							/>
						</div>
						<div className="flex flex-row w-80">
							<span className="text-gray-500 w-20 p-1">Address</span>
							<input
								type="text"
								onChange={update}
								id="address"
								placeholder="Add Address"
								className={inputStyle}
								value={currentUser.address}
							/>
						</div>
						<button
							type="button"
							className="ml-auto mb-2 p-1 font-medium text-indigo-700 hover:text-indigo-500"
							onClick={UpdateInDb}
						>
							Save
						</button>
					</div>
				</div>
				{/* <button className="flex mt-2 mx-auto rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700">
					Add Products
				</button> */}
			</div>
			<div className="max-w-xl mx-auto px-2">
				<div>
					<div className="flex flex-row gap-5 justify-evenly border-b-2">
						<div
							className={
								"p-3 text-sm hover:cursor-pointer " +
								(nav === "recent" ? "border-b-2 border-b-indigo-600" : "")
							}
							onClick={() => setNav("recent")}
						>
							Recent Orders
						</div>
						<div
							className={
								"p-3 text-sm hover:cursor-pointer " +
								(nav === "inventory" ? "border-b-2 border-b-indigo-600" : "")
							}
							onClick={() => setNav("inventory")}
						>
							Inventory
						</div>
						<div
							className={
								"p-3 text-sm hover:cursor-pointer " +
								(nav === "addproducts" ? "border-b-2 border-b-indigo-600" : "")
							}
							onClick={() => setNav("addproducts")}
						>
							Add Products
						</div>
					</div>
				</div>
				<div>
					{nav === "recent" &&
						recentOrders.map((order) => (
							<div key={order.id} className="flex py-6 px-3">
								<div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
									<img
										src={order.imagesrc}
										alt={order.imagealt}
										className="h-full w-full object-cover object-center"
									/>
								</div>

								<div className="ml-4 flex flex-1 flex-col">
									<div>
										<div className="flex justify-between text-base font-medium text-gray-900">
											<h3>
												<p> {order.name} </p>
											</h3>
											<p className="ml-4">${order.price}</p>
										</div>
										{/* <p className="mt-1 text-sm text-gray-500">{order.color}</p> */}
									</div>
									<div className="flex flex-1 items-end justify-between text-sm">
										<p className="text-gray-500">Qty {order.quantity}</p>
										<p className="text-gray-500">{order.status}</p>
									</div>
								</div>
							</div>
						))}
					{nav === "addproducts" && (
						<div className="flex flex-col space-y-2 pt-4">
							<div className="flex flex-row  w-100">
								<span className="text-gray-500 w-40 p-1">Name</span>
								<input
									type="text"
									onChange={update}
									id="name"
									className={inputStyle}
									value={product.name}
									placeholder="Enter a Name"
								/>
							</div>
							<div className="flex flex-row w-100">
								<span className="text-gray-500 w-40 p-1">Description</span>
								<input
									type="text"
									onChange={update}
									id="description"
									className={inputStyle}
									value={product.description}
									placeholder="Enter Decription"
								/>
							</div>
							<div className="flex flex-row w-100">
								<span className="text-gray-500 w-40 p-1">Price</span>
								<input
									type="text"
									onChange={update}
									id="price"
									className={inputStyle}
									value={product.price}
									placeholder="Price in $"
								/>
							</div>
							<div className="flex flex-row w-100">
								<span className="text-gray-500 w-40 p-1">Category</span>
								<input
									type="text"
									onChange={update}
									id="category"
									className={inputStyle}
									value={product.category}
									placeholder="Category or Tags"
								/>
							</div>
							<div className="flex flex-row w-100">
								<span className="text-gray-500 w-40 p-1">ImageSrc</span>
								<input
									type="text"
									onChange={update}
									id="imagesrc"
									className={inputStyle}
									value={product.imagesrc}
									placeholder="Link to the image"
								/>
							</div>
							<div className="flex flex-row w-100">
								<span className="text-gray-500 w-40 p-1">Stock</span>
								<input
									type="number"
									min="0"
									onChange={update}
									id="stock"
									className={inputStyle}
									value={product.stock}
									placeholder="Quantity"
								/>
							</div>
							<button
								type="button"
								className="ml-auto pt-1 font-medium text-indigo-600 hover:text-indigo-500"
								onClick={addProduct}
							>
								Add
							</button>
						</div>
					)}
					{nav === "inventory" &&
						inventory.map((item, idx) => (
							<div key={idx} className="flex py-6 px-3">
								<div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
									<img
										src={item.imagesrc}
										alt={item.imagealt}
										className="h-full w-full object-cover object-center"
									/>
								</div>

								<div className="ml-4 flex flex-1 flex-col">
									<div>
										<div className="flex justify-between text-base font-medium text-gray-900">
											<h3>
												<p> {item.name} </p>
											</h3>
											<p className="ml-4">${item.price}</p>
										</div>
										{/* <p className="mt-1 text-sm text-gray-500">{order.color}</p> */}
									</div>
									<div className="flex flex-1 items-end justify-between text-sm">
										<p className="text-gray-500">Qty {item.stock}</p>
										<p className="text-gray-500">{item.status}</p>
									</div>
								</div>
							</div>
						))}
				</div>
			</div>
		</div>
	);
}

export default SellerProfile;
