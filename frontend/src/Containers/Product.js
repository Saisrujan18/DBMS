import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
export default function Product()
{
	const [product, setProduct] = useState(
		{
			id: 1,
			name: "Basic Tee 6-Pack",
			href: "#",
			imageSrc:
				["https://tailwindui.com/img/ecommerce-images/product-page-02-secondary-product-shot.jpg", 
				"https://tailwindui.com/img/ecommerce-images/product-page-02-tertiary-product-shot-01.jpg",
				"https://tailwindui.com/img/ecommerce-images/product-page-02-tertiary-product-shot-02.jpg",
				],
			imageAlt: 
				["Two each of gray, white, and black shirts laying flat",
				"Model wearing plain black basic tee",
				"Model wearing plain gray basic tee",
				],
			price: 55,
			currency: "$",
			description:["The Basic Tee 6-Pack allows you to fully express your vibrant personality with three grayscale options. Feeling adventurous? Put on a heather gray tee. Want to be a trendsetter? Try our exclusive colorway: \"Black\". Need to add an extra pop of color to your outfit? Our white tee has you covered.", 
						["Hand cut and sewn locally", "Dyed with our proprietary colors", "Pre-washed & pre-shrunk", "Ultra-soft 100% cotton"],
						"The 6-Pack includes two black, two white, and two heather gray Basic Tees. Sign up for our subscription service and be the first to get new, exciting colors, like our upcoming \"Charcoal Gray\" limited release."],
			color: ["white", "gray-200", "gray-900"],
			size: ["XS", "S", "M", "L", "XL"],
			type: "Clothing",
			category: "Men",
			searchterm: "TShirt",
			rating: [400, 120],
			path: "Clothing/Men/TShirt/Product1"
		}
	)
	const getTempPath = (path, index) => {
		return path.slice(0, index+1).join("/")
	}
	const GetProductPath = (props) => {
		// Type of Product / Category / Categories (optional) / Search Term / Product Name
		// Each of them are navigation links
		// Example : Clothing/Men/TShirt/Basic TShirt Pack of 6

		const path=props.path.split("/")
		return(
			<div className="flex flex-row mx-10 px-4 py-2">
				{path.map((pathterm, index)=> 
					<div className="flex flex-row items-center mr-2 text-sm font-medium text-gray-900">
						<Link to={getTempPath(path, index)}>{pathterm}</Link>
						{index!==path.length-1 && <svg width="16" height="20" viewBox="0 0 16 20" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" className="ml-2 w-4 h-5 text-gray-300">
							<path d="M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z" />
						</svg>}
					</div>
				)}
			</div>)
	}
	const GetImages = (props) => {
		// return(
		// 	<div className="mt-6 mx-auto sm:px-6 lg:px-8 lg:grid lg:grid-cols-3 lg:gap-x-8">
		// 		<div className="hidden aspect-w-3 aspect-h-4 rounded-lg overflow-hidden lg:block">
		// 			<img src="https://tailwindui.com/img/ecommerce-images/product-page-02-secondary-product-shot.jpg" alt="Two each of gray, white, and black shirts laying flat." className="w-full h-full object-center object-cover"/>
		// 		</div>
		// 		<div className="hidden lg:grid lg:grid-cols-1 lg:gap-y-8">
		// 			<div className="aspect-w-3 aspect-h-2 rounded-lg overflow-hidden">
		// 			<img src="https://tailwindui.com/img/ecommerce-images/product-page-02-tertiary-product-shot-01.jpg" alt="Model wearing plain black basic tee." className="w-full h-full object-center object-cover"/>
		// 			</div>
		// 			<div className="aspect-w-3 aspect-h-2 rounded-lg overflow-hidden">
		// 			<img src="https://tailwindui.com/img/ecommerce-images/product-page-02-tertiary-product-shot-02.jpg" alt="Model wearing plain gray basic tee." className="w-full h-full object-center object-cover"/>
		// 			</div>
		// 		</div>
		// 		<div className="aspect-w-4 aspect-h-5 sm:rounded-lg sm:overflow-hidden lg:aspect-w-3 lg:aspect-h-4">
		// 			<img src="https://tailwindui.com/img/ecommerce-images/product-page-02-featured-product-shot.jpg" alt="Model wearing plain white basic tee." className="w-full h-full object-center object-cover"/>
		// 		</div>
		// 	</div>
		// )
		return(
			<div className="mt-6 lg:w-1/2 w-1/3 h-auto self-center">
				<img src={product.imageSrc[0]} alt={product.imageSrc[0]} className="w-full h-full object-center object-cover"/>
			</div>	
		)
	}
	const Star = (props) => {
		return(
			<svg className={`text-${props.color} h-5 w-5 flex-shrink-0`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
				<path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
			</svg>
		)
	}
	const GetRating = (props) => {
		const rating=props.rating
		const noOfRatings=rating[1]
		const stars=Math.floor(rating[0]/noOfRatings)
		let stars_svg=[]
		for(let i=0; i<stars; i++)
			stars_svg.push(<Star color="gray-900"/>)
		for(let i=0; i<5-stars; i++)
			stars_svg.push(<Star color="gray-200"/>)
		
		return(
			<div className="mt-6">
				<h3 className="sr-only">Ratings</h3>
				<div className="flex items-center">
					<div className="flex items-center">
						{stars_svg}
					</div>
				</div>
			</div>
		)
	}
	const SingleColor = (props) => {
		return(
			<label className="-m-0.5 relative p-0.5 rounded-full flex items-center justify-center cursor-pointer focus:outline-none ring-gray-400">
				<input type="radio" name="color-choice" value={props.color[0]} className="sr-only" aria-labelledby="color-choice-0-label"/>
				<p id="color-choice-0-label" className="sr-only">{props.color[0]}</p>
				<span aria-hidden="true" className={`h-8 w-8 bg-${props.color[0]}${props.color.length>1? -props.color[1]:""} border border-black border-opacity-10 rounded-full`}></span>
			</label>
		)
	}
	const ColorSet = () => {
		return(
			<div className="my-5">
				<h3 className="text-sm my-2 text-gray-900 font-medium">Color</h3>
				<fieldset className="my-4">
				<legend className="sr-only">Choose a Color</legend>
					<div className="flex flex-row items-center space-x-3">
						{product.color.map((color, index)=>
							<SingleColor color={color.split("-")}/>
						)}
					</div>
				</fieldset>
			</div>
		)
	}
	const SingleSize = (props) => {
		return(
			<label className={`group relative border rounded-md py-3 px-4 flex items-center justify-center text-sm font-medium uppercase hover:bg-gray-50 focus:outline-none sm:flex-1 sm:py-6 ${props.isAvailable? "bg-white shadow-sm text-gray-900 cursor-pointer":"bg-gray-50 text-gray-200 cursor-not-allowed"}`}>
				<input type="radio" name="size-choice" value={props.size} disabled={!props.isAvailable} className="sr-only" aria-labelledby="size-choice-0-label"/>
				<p id="size-choice-0-label">{props.size}</p>

				{!props.isAvailable && <div aria-hidden="true" className="absolute -inset-px rounded-md border-2 border-gray-200 pointer-events-none">
					<svg className="absolute inset-0 w-full h-full text-gray-200 stroke-2" viewBox="0 0 100 100" preserveAspectRatio="none" stroke="currentColor">
						<line x1="0" y1="100" x2="100" y2="0" vector-effect="non-scaling-stroke" />
					</svg>
				</div>}
			</label>
		)
	}
	const SizeSet = () => {
		return(
			<div className="my-5">
				<h3 className="text-sm text-gray-900 font-medium">Size</h3>
				<fieldset className="mt-4">
				<legend className="sr-only">Choose a Size</legend>
					<div className="grid grid-cols-4 gap-4 sm:grid-cols-8 lg:grid-cols-4">
						<SingleSize size="XXS" isAvailable={false}/>
						{product.size.map((size, index) => 
							<SingleSize size={size} isAvailable={true}/>
						)}
					</div>
				</fieldset>
			</div>
		)
	}
	const Highlights = (props) => {
		return(
			<div className="mt-4">
				<ul className="pl-4 list-disc text-sm space-y-2">
					{props.content.map((highlight, index)=>
						<li className="text-gray-400"><span className="text-gray-600">{highlight}</span></li>
					)}	
				</ul>
			</div>
		)
	}
	const GetDescription = () => {
		return(
			<div className="py-10 lg:pt-6 lg:pb-16 lg:col-start-1 lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
				<div>
					<h3 className="sr-only">Description</h3>

					<div className="space-y-6">
						<p className="text-base text-gray-900">{product.description[0]}</p>
					</div>
				</div>

				<div className="mt-10">
					<h3 className="text-sm font-medium text-gray-900">Highlights</h3>
					{product.description.length > 1 && product.description[1].length >0 && <Highlights content={product.description[1]}/>}
				</div>

				{product.description.length > 2 && <div className="mt-10">
					<h2 className="text-sm font-medium text-gray-900">Details</h2>
					<div className="mt-4 space-y-6">
						<p className="text-sm text-gray-600">{product.description[2]}</p>
					</div>
				</div>}
			</div>
		)
	}
	const ProductInfo = () => {
		return(
			<div className="mx-auto pt-10 pb-16 px-4 sm:px-6 lg:pt-16 lg:pb-24 lg:px-8 lg:grid lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8">
				<div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
					<h1 className="text-2xl font-extrabold tracking-tight text-gray-900 sm:text-3xl">{product.name}</h1>
				</div>

				<div className="mt-4 lg:mt-0 lg:row-span-3">
					<h2 className="sr-only">Product Information</h2>
					<p className="text-3xl text-gray-900">{`${product.currency} ${product.price}`}</p>

					<GetRating rating={product.rating}/>

					<form>
						{product.color.length > 0 && <ColorSet/>}
						{product.size.length > 0 && <SizeSet/>}
						<button type="submit" className="mt-10 w-full bg-indigo-600 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Add to Bag</button>
					</form>
				</div>
				<GetDescription/>
			</div>
		)
	}
	return(
		<div className="bg-white pt-6 self-center max-w-2xl lg:max-w-7xl flex flex-col">
			<GetProductPath path={product.path}/>
			<GetImages/>
			<ProductInfo/>
		</div>
	)
}