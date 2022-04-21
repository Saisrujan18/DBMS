/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import Card from "../Components/Card";
import Navbar from "../Components/Navbar";
import Profile from "./Profile";

export default function Home() {
	const [filter, setFilter] = useState("");
	const [products, setProducts] = useState([
		{
			id: 1,
			name: "Basic Tee",
			href: "#",
			imageSrc:
				"https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg",
			imageAlt: "Front of men's Basic Tee in black.",
			price: 55,
			currency: "$",
			color: "Black",
		},
		{
			id: 2,
			name: "Basic Tee",
			href: "#",
			imageSrc:
				"https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg",
			imageAlt: "Front of men's Basic Tee in black.",
			price: 65,
			currency: "$",
			color: "Black",
		},
		{
			id: 3,
			name: "Basic Tee",
			href: "#",
			imageSrc:
				"https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg",
			imageAlt: "Front of men's Basic Tee in black.",
			price: 35,
			currency: "$",
			color: "Black",
		},
		{
			id: 4,
			name: "Basic Tee",
			href: "#",
			imageSrc:
				"https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg",
			imageAlt: "Front of men's Basic Tee in black.",
			price: 15,
			currency: "$",
			color: "Black",
		},
		{
			id: 5,
			name: "Basic Tee",
			href: "#",
			imageSrc:
				"https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg",
			imageAlt: "Front of men's Basic Tee in black.",
			price: 25,
			currency: "$",
			color: "Black",
		},
		// More products...
	]);
	const sortByFilter = (key) => {
		console.log(key);
		console.log(filter);
		if (filter !== key) {
			setFilter(key);
			products.sort(function (a, b) {
				if (filter === "relevance") return true;
				else {
					console.log("Price Only");
					return a.price - b.price;
				}
			});
			setProducts(products);
		}
	};
	return (
		<div className="bg-white">
			<div className="max-w-2xl mx-auto px-4 sm:py-10 sm:px-6 lg:max-w-7xl lg:px-8">
				{/* <h2 className="text-2xl font-extrabold tracking-tight text-gray-900">
					Clothes
				</h2> */}

				<div className="flex flex-col">
					<div className="self-end">
						<div className="dropdown dropdown-end">
							<p
								tabindex="0"
								className="text-medium m-1 btn clickables bg-none text-white bg-indigo-600 border-none hover:bg-indigo-700"
							>
								Filter
							</p>
							<ul
								tabindex="0"
								className="p-2 shadow menu dropdown-content bg-white text-black rounded-box w-52 text-sm"
							>
								<li class="rounded hover:bg-gray-300 dropdown-active">
									<p onClick={() => sortByFilter("price")}>Price</p>
								</li>
								<li class="rounded hover:bg-gray-300 dropdown-active">
									<p onClick={() => sortByFilter("relevance")}>Relevance</p>
								</li>
							</ul>
						</div>
					</div>
					<div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
						{products.map((product) => (
							<div key={product.id} className="group relative">
								<div className="w-full min-h-80 bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:h-80 lg:aspect-none">
									<img
										src={product.imageSrc}
										alt={product.imageAlt}
										className="w-full h-full object-center object-cover lg:w-full lg:h-full"
									/>
								</div>
								<div className="mt-4 flex justify-between">
									<div>
										<h3 className="text-sm text-gray-700">
											<a href={product.href}>
												<span aria-hidden="true" className="absolute inset-0" />
												{product.name}
											</a>
										</h3>
										<p className="mt-1 text-sm text-gray-500">
											{product.color}
										</p>
									</div>
									<p className="text-sm font-medium text-gray-900">
										{product.currency}
										{product.price}
									</p>
								</div>
							</div>
						))}
					</div>
				</div>
			</div>
		</div>
	);
}
