import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Navbar({ open, setOpen, userData, setUserData, cartsize }) {
	const [menuOpen, setMenuOpen] = useState(false);
	const navigate = useNavigate();
	// console.log(userData);
	const handleLogout = () => {
		sessionStorage.removeItem("user");
		setUserData(null);
		navigate("/login");
	};

	return (
		<nav className="bg-white border-b-2 text-black">
			<div className="container px-6 py-4 mx-auto md:flex md:justify-between md:items-center">
				<div className="flex items-center justify-between">
					<div>
						<Link
							className="text-2xl font-bold text-black transition-colors duration-200 transform lg:text-3xl hover:text-gray-700 "
							to="/home"
						>
							KaliStore
						</Link>
					</div>
					{/* Mobile menu button */}
					<div className="flex md:hidden">
						<button
							type="button"
							className="text-black hover:text-gray-600 focus:outline-none focus:text-gray-600 "
							aria-label="toggle menu"
							onClick={() => {
								console.log(menuOpen);
								setMenuOpen(!menuOpen);
							}}
						>
							<svg viewBox="0 0 24 24" className="w-6 h-6 fill-current">
								<path
									fillRule="evenodd"
									d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z"
								></path>
							</svg>
						</button>
					</div>
				</div>
				{/* Mobile Menu open: "block", Menu closed: "hidden" */}
				{userData && (
					<div className={"items-center md:flex"} hidden={menuOpen}>
						<div className="flex flex-col md:flex-row md:mx-6">
							{userData.customer_id && (
								<>
									<Link
										className="my-1 md:mx-4 text-sm font-medium text-black transition-colors duration-200 transform hover:text-indigo-600"
										to="/home"
									>
										Home
									</Link>
									<Link
										className="my-1 md:mx-4 text-sm font-medium text-black transition-colors duration-200 transform hover:text-indigo-600"
										to="/profile"
									>
										Profile
									</Link>
									<div
										className="my-1 md:mx-4 text-black transition-colors duration-200 transform hover:text-indigo-600 cursor-pointer"
										onClick={() => setOpen(!open)}
									>
										<svg
											className="w-5 h-5"
											viewBox="0 0 24 24"
											fill="none"
											xmlns="http://www.w3.org/2000/svg"
										>
											<path
												d="M3 3H5L5.4 5M7 13H17L21 5H5.4M7 13L5.4 5M7 13L4.70711 15.2929C4.07714 15.9229 4.52331 17 5.41421 17H17M17 17C15.8954 17 15 17.8954 15 19C15 20.1046 15.8954 21 17 21C18.1046 21 19 20.1046 19 19C19 17.8954 18.1046 17 17 17ZM9 19C9 20.1046 8.10457 21 7 21C5.89543 21 5 20.1046 5 19C5 17.8954 5.89543 17 7 17C8.10457 17 9 17.8954 9 19Z"
												stroke="currentColor"
												strokeWidth="2"
												strokeLinecap="round"
												strokeLinejoin="round"
											/>
										</svg>

										{cartsize > 0 && (
											<span className="absolute top-0 left-0 p-1 text-xs text-white bg-indigo-600 rounded-full"></span>
										)}
									</div>{" "}
								</>
							)}
							<div
								className="my-1 md:mx-4 text-black transition-colors duration-200 transform hover:text-indigo-600 cursor-pointer"
								onClick={handleLogout}
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									className="h-5 w-5"
									viewBox="0 0 20 20"
									fill="currentColor"
								>
									<path
										fillRule="evenodd"
										d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z"
										clipRule="evenodd"
									/>
								</svg>
							</div>
						</div>
					</div>
				)}
			</div>
		</nav>
	);
}

export default Navbar;
