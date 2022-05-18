import React from "react";
import { useState } from "react";
const products = [
	{
		id: 1,
		name: "Throwback Hip Bag",
		href: "#",
		color: "Salmon",
		price: "$90.00",
		quantity: 1,
		imageSrc:
			"https://tailwindui.com/img/ecommerce-images/shopping-cart-page-04-product-01.jpg",
		imageAlt:
			"Salmon orange fabric pouch with match zipper, gray zipper pull, and adjustable hip belt.",
	},
	{
		id: 2,
		name: "Medium Stuff Satchel",
		href: "#",
		color: "Blue",
		price: "$32.00",
		quantity: 1,
		imageSrc:
			"https://tailwindui.com/img/ecommerce-images/shopping-cart-page-04-product-02.jpg",
		imageAlt:
			"Front of satchel with blue canvas body, black straps and handle, drawstring top, and front zipper pouch.",
	},
	{
		id: 5,
		name: "Medium Stuff Satchel",
		href: "#",
		color: "Blue",
		price: "$32.00",
		quantity: 1,
		imageSrc:
			"https://tailwindui.com/img/ecommerce-images/shopping-cart-page-04-product-02.jpg",
		imageAlt:
			"Front of satchel with blue canvas body, black straps and handle, drawstring top, and front zipper pouch.",
	},
	{
		id: 3,
		name: "Medium Stuff Satchel",
		href: "#",
		color: "Blue",
		price: "$32.00",
		quantity: 1,
		imageSrc:
			"https://tailwindui.com/img/ecommerce-images/shopping-cart-page-04-product-02.jpg",
		imageAlt:
			"Front of satchel with blue canvas body, black straps and handle, drawstring top, and front zipper pouch.",
	},
	{
		id: 4,
		name: "Medium Stuff Satchel",
		href: "#",
		color: "Blue",
		price: "$32.00",
		quantity: 1,
		imageSrc:
			"https://tailwindui.com/img/ecommerce-images/shopping-cart-page-04-product-02.jpg",
		imageAlt:
			"Front of satchel with blue canvas body, black straps and handle, drawstring top, and front zipper pouch.",
	},
	// More products...
];

function SellerProfile() {
	const [nav, setNav] = useState("recent");
	const [currentUser,setUser]=useState({
		name:"Manjunath",
		phone:"8830526885",
		address:"Mumbai",
		email:"nath.vasam@gmail.com"
	});
	const [product,setProduct]=useState({
		name:"Manjunath",
		price:"13",
		description:"Mumbai",
		category:"Men",
		imagesrc:"#",
		searchitem:"Shirt"
	});
	const update = (event) => {
		event.preventDefault();
		const { id, value } = event.target;
		setUser((prevNote) => {
			return {
			...prevNote,
			[id]: value,
			};
		});
	};
	function UpdateInDb(event)
	{
		console.log("insert into db");
		console.log(currentUser);
	}
	function AddProduct(event)
	{
		console.log("Add product to Db");
	}
	return (
		<div className="min-h-full">
			<div className="bg-gray-100 pt-10 pb-5">
				<div className="max-w-fit mx-auto flex flex-row max-h-40 bg-white rounded-md p-4 gap-2 shadow-md justify-center">
					<div className="avatar my-auto flex flex-col text-center">
						<div className="w-20 rounded-full">
							<img src="https://api.lorem.space/image/face?hash=92048" />
						</div>
						<h1 className="text-sm">{currentUser.name}</h1>
					</div>
					<div className="flex flex-col my-1 overflow-clip">
						<div className="flex flex-row  w-80">
							<span className="text-gray-500 w-20 p-1">Phone</span>
							<input type="text" onChange={update} id="phone" value={currentUser.phone}/>
						</div>
						<div className="flex flex-row w-80">
							<span className="text-gray-500 w-20 p-1">Address</span>
							<input type="text" onChange={update} id="address" value={currentUser.address}/>
						</div>
						<div className="flex flex-row w-80">
							<span className="text-gray-500 w-20 p-1">EmailId</span>
							<input type="text" onChange={update} id="email" value={currentUser.email}/>
						</div>
						<button
							type="button"
							className="ml-auto pt-1 font-medium text-indigo-600 hover:text-indigo-500"
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
								(nav === "transaction" ? "border-b-2 border-b-indigo-600" : "")
							}
							onClick={() => setNav("transaction")}
						>
							Transactions
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
					{nav!=="addproducts" && products.map((product) => (
						<div key={product.id} className="flex py-6 px-3">
							<div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
								<img
									src={product.imageSrc}
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
										<p className="ml-4">{product.price}</p>
									</div>
									<p className="mt-1 text-sm text-gray-500">{product.color}</p>
								</div>
								<div className="flex flex-1 items-end justify-between text-sm">
									<p className="text-gray-500">Qty {product.quantity}</p>
								</div>
							</div>
						</div>
					))}
					{nav==="addproducts" && 
						<div className="flex flex-col space-y-2 pt-4">
							<div className="flex flex-row  w-100">
							<span className="text-gray-500 w-40 p-1">Name</span>
							<input type="text" onChange={update} id="name" value={product.name}/>
						</div>
						<div className="flex flex-row w-100">
							<span className="text-gray-500 w-40 p-1">Description</span>
							<input type="text" onChange={update} id="description" value={product.description}/>
						</div>
						<div className="flex flex-row w-100">
							<span className="text-gray-500 w-40 p-1">price</span>
							<input type="text" onChange={update} id="price" value={product.price}/>
						</div>
						<div className="flex flex-row w-100">
							<span className="text-gray-500 w-40 p-1">Category</span>
							<input type="text" onChange={update} id="category" value={product.category}/>
						</div>
						<div className="flex flex-row w-100">
							<span className="text-gray-500 w-40 p-1">ImageSrc</span>
							<input type="text" onChange={update} id="imagesrc" value={product.imagesrc}/>
						</div>
						<div className="flex flex-row w-100">
							<span className="text-gray-500 w-40 p-1">SearchItem</span>
							<input type="text" onChange={update} id="searchitem" value={product.searchitem}/>
						</div>
							<button
								type="button"
								className="ml-auto pt-1 font-medium text-indigo-600 hover:text-indigo-500"
								onClick={AddProduct}
							>
								Add
							</button>
						</div> 
					}

				</div>
			</div>
		</div>
	);
}

export default SellerProfile;
