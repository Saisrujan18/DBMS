import React, {useState} from "react";
import Card from "../Components/Card";
import Navbar from "../Components/Navbar";

function Home() {
    const [products, setProducts] = useState([1,2,3,4,5]);
	return (
		<div className="flex-1">
			<Navbar />
			<div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-2 my-2 max-w-fit mx-auto">
				{
                    products.map(prod => <Card />)
                }
			</div>
		</div>
	);
}

export default Home;
