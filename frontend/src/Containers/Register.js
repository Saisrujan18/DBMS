import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Register() {
	const [name, setName] = useState("");
	const [password, setPassword] = useState("");
	const [email_id, setEmail_id] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");

	const navigate = useNavigate();

	const handleInputChange = (e) => {
		const { id, value } = e.target;
		switch (id) {
			case "name": {
				setName(value);
				break;
			}
			case "email": {
				setEmail_id(value);
				break;
			}
			case "password": {
				setPassword(value);
				break;
			}
			case "confirm-password": {
				setConfirmPassword(value);
				break;
			}
		}
	};

	const handleSubmit = () => {
		let url = "http://localhost:3002/api/auth/register";
		if (password !== confirmPassword) {
			console.log("err");
			return;
		}
		axios
			.post(url, {
				name: name,
				password: password,
				email_id: email_id,
				address: "",
				phone: "",
			})
			.then((res) => {
				sessionStorage.setItem("user", JSON.stringify(res.data));
				navigate("/home");
			})
			.catch((err) => console.log(err));
	};
	return (
		<div className="h-auto flex flex-col flex-grow items-center justify-center bg-gray-100">
			<div className="mt-5 flex flex-col bg-white justify-center shadow-md px-4 sm:px-6 md:px-8 lg:px-10 py-8 rounded-lg w-50 max-w-md">
				<div className="font-medium self-center text-xl sm:text-3xl text-gray-800">
					Welcome!
				</div>
				<div className="mt-4 self-center text-xl sm:text-sm text-gray-800">
					Enter your credentials to create your account
				</div>

				<div className="mt-8">
					<div className="flex flex-col mb-5">
						<label className="mb-1 text-xs tracking-wide text-gray-600">
							Name :
						</label>
						<div className="relative">
							<div
								className="
                                    inline-flex
                                    items-center
                                    justify-center
                                    absolute
                                    left-0
                                    top-0
                                    h-full
                                    w-10
                                    text-gray-400"
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									className="h-6 w-6"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
									strokeWidth="2"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
									/>
								</svg>
							</div>
							<input
								id="name"
								type="name"
								value={name}
								className="
                                        text-sm
                                        placeholder-gray-500
                                        pl-10
                                        pr-4
                                        rounded-md
                                        border border-gray-400
                                        w-full
                                        py-2
                                        focus:outline-none focus:border-blue-400"
								placeholder="Enter your name"
								onChange={(e) => handleInputChange(e)}
							/>
						</div>
					</div>
					<div className="flex flex-col mb-5">
						<label className="mb-1 text-xs tracking-wide text-gray-600">
							E-Mail Address:
						</label>
						<div className="relative">
							<div
								className="
                                    inline-flex
                                    items-center
                                    justify-center
                                    absolute
                                    left-0
                                    top-0
                                    h-full
                                    w-10
                                    text-gray-400"
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									className="h-6 w-6"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
									strokeWidth="2"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
									/>
								</svg>
							</div>
							<input
								id="email"
								type="email"
								name="email"
								value={email_id}
								className="
                                        text-sm
                                        placeholder-gray-500
                                        pl-10
                                        pr-4
                                        rounded-md
                                        border border-gray-400
                                        w-full
                                        py-2
                                        focus:outline-none focus:border-blue-400"
								placeholder="Enter your email"
								onChange={(e) => handleInputChange(e)}
							/>
						</div>
					</div>
					<div className="flex flex-col mb-6">
						<label className="mb-1 text-xs sm:text-sm tracking-wide text-gray-600">
							Password:
						</label>
						<div className="relative">
							<div
								className="
                                        inline-flex
                                        items-center
                                        justify-center
                                        absolute
                                        left-0
                                        top-0
                                        h-full
                                        w-10
                                        text-gray-400"
							>
								<span>
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
								</span>
							</div>
							<input
								id="password"
								type="password"
								name="password"
								value={password}
								className="
                                        text-sm
                                        placeholder-gray-500
                                        pl-10
                                        pr-4
                                        rounded-md
                                        border border-gray-400
                                        w-full
                                        py-2
                                        focus:outline-none focus:border-blue-400"
								placeholder="Enter your password"
								onChange={(e) => handleInputChange(e)}
							/>
						</div>
					</div>
					<div className="flex flex-col mb-6">
						<label className="mb-1 text-xs sm:text-sm tracking-wide text-gray-600">
							Confirm Password:
						</label>
						<div className="relative">
							<div
								className="
                                        inline-flex
                                        items-center
                                        justify-center
                                        absolute
                                        left-0
                                        top-0
                                        h-full
                                        w-10
                                        text-gray-400"
							>
								<span>
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
								</span>
							</div>
							<input
								id="confirm-password"
								type="password"
								name="password"
								value={confirmPassword}
								className="
                                        text-sm
                                        placeholder-gray-500
                                        pl-10
                                        pr-4
                                        rounded-md
                                        border border-gray-400
                                        w-full
                                        py-2
                                        focus:outline-none focus:border-blue-400"
								placeholder="Enter your password"
								onChange={(e) => handleInputChange(e)}
							/>
						</div>
					</div>
					<div className="flex w-full">
						<button
							onClick={handleSubmit}
							className="
                                        flex
                                        mt-2
                                        items-center
                                        justify-center
                                        focus:outline-none
                                        bg-indigo-600 px-6 text-base font-medium text-white shadow-sm hover:bg-indigo-700
                                        rounded-md
                                        py-2
                                        w-full
                                        transition
                                        duration-150
                                        ease-in"
						>
							<span className="mr-2 uppercase">Register</span>
							<span>
								<svg
									className="h-6 w-6"
									fill="none"
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth="2"
									viewBox="0 0 24 24"
									stroke="currentColor"
								>
									<path d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z" />
								</svg>
							</span>
						</button>
					</div>
				</div>
			</div>
			<div className="mb-5 flex justify-center items-center mt-6">
				<div
					className="
                        inline-flex
                        items-center
                        text-gray-700
                        font-medium
                        text-xs text-center"
				>
					<span className="ml-2">
						Already have an account?
						<Link
							to="/login"
							className="text-xs ml-2 text-indigo-600 hover:text-indigo-500 font-semibold"
						>
							Login
						</Link>
					</span>
				</div>
			</div>
		</div>
	);
}

export default Register;
