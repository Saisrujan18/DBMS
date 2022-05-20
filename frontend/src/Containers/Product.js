import axios from "axios";
import React from "react";
import { useState } from "react";
import { Link, Navigate, useLocation } from "react-router-dom";
import { useParams } from "react-router-dom";

export default function Product({ user, addToCart }) {
	const { id } = useParams();
	const location = useLocation();
	const [product, setProduct] = useState(location.state);
	console.log(product);
	const GetImages = (props) => {
		return (
			<div className="mt-6 lg:w-1/2 w-1/3 h-auto self-center ">
				<img
					src={product.imagesrc}
					alt={product.imagesrc}
					className="w-full h-full object-center object-cover"
				/>
			</div>
		);
	};

	const GetDescription = () => {
		return (
			<div className="py-10 lg:pt-6 lg:pb-16 lg:col-start-1 lg:col-span-2 lg:pr-8">
				<div>
					<h3 className="sr-only">Description</h3>

					<div className="space-y-6">
						<p className="text-base text-gray-900">{product.description}</p>
					</div>
				</div>
			</div>
		);
	};

	const ProductInfo = () => {
		return (
			<div className="mx-auto pt-10 pb-16 px-4 sm:px-6 lg:pt-16 lg:pb-24 lg:px-8 ">
				<div className="lg:pr-8 ">
					<h1 className="text-2xl font-extrabold tracking-tight text-gray-900 sm:text-3xl">
						{product.name}
						<GetDescription />
					</h1>
				</div>

				<div className="mt-4">
					

					<h2 className="sr-only">Product Information</h2>
					<p className="text-3xl text-gray-900">${`${product.price}`}</p>
					<div>
						<button
							onClick={() => addToCart(product)}
							className="mt-10 w-full bg-indigo-600 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
						>
							Add to Bag
						</button>
					</div>
				</div>
			</div>
		);
	};
	return (
		<div className="bg-white pt-6 self-center max-w-2xl lg:max-w-7xl flex flex-col lg:flex-row">
			<GetImages />
			<div className="divider"></div>
			<ProductInfo />
		</div>
	);
}
