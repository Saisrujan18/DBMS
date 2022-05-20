import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Login({ setUserData }) {
	const [email_id, setEmail_id] = useState("");
	const [password, setPassword] = useState("");
	const [isSeller, setIsSeller] = useState(false);
	const [message, setMessage] = useState("");
	const navigate = useNavigate();

	const handleSubmit = () => {
		let url = "http://localhost:3002/api/auth/login";
		if (isSeller) url = "http://localhost:3002/api/auth/b/login";
		axios
			.post(url, {
				email_id: email_id,
				password: password,
			})
			.then((res) => {
				sessionStorage.setItem("user", JSON.stringify(res.data));
				setUserData(res.data);
				if (!isSeller) navigate("/home");
				else navigate("/profile");
			})
			.catch((err) => {
				setMessage("*Check Email and Password");
				console.log(err.message);
			});
	};

	return (
		<div className="h-auto py-4 flex flex-col flex-grow items-center justify-center bg-gray-100">
			<div className="flex flex-col bg-white justify-center shadow-md px-4 sm:px-6 md:px-8 lg:px-10 py-8 rounded-lg w-50 max-w-md">
				<div className="font-medium self-center text-xl sm:text-3xl text-gray-800">
					Welcome Back
				</div>
				<div className="mt-4 self-center text-xl sm:text-sm text-gray-800">
					Enter your credentials to access your account
				</div>

				<div className="mt-10">
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
								onChange={(e) => setEmail_id(e.target.value)}
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
								onChange={(e) => setPassword(e.target.value)}
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
							/>
						</div>
					</div>

					<div className="flex items-center mb-4">
						<input
							id="checkbox-3"
							aria-describedby="checkbox-3"
							type="checkbox"
							className="bg-gray-50 border-gray-300 focus:ring-3 focus:ring-blue-300 h-4 w-4 rounded"
							checked={isSeller}
							onChange={() => setIsSeller(!isSeller)}
						/>
						<label
							for="checkbox-3"
							className="text-sm ml-3 font-medium text-gray-900"
						>
							Are you a seller?
						</label>
					</div>

					<div className="flex w-full flex-col">
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
							<span className="mr-2 uppercase">Sign In</span>
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
						<div className="text-xs p-2 text-red-600">{message}</div>
					</div>
				</div>
			</div>
			<div className="flex justify-center items-center mt-6">
				<div
					className="
                        inline-flex
                        items-center
                        text-gray-700
                        font-medium
                        text-xs text-center"
				>
					<span className="ml-2">
						You don't have an account?
						<Link
							to="/register"
							className="text-xs ml-2 text-indigo-600 hover:text-indigo-500 font-semibold"
						>
							Register now
						</Link>
					</span>
				</div>
			</div>
		</div>
	);
}

export default Login;
