import HowToRegIcon from "@mui/icons-material/HowToReg";
import { Typography } from "@mui/material";
import Image from "next/image";
import Favicon from "../public/favicon.ico";
import validator from "validator";
import { useState } from "react";
import { useRouter } from "next/router";

export default function Register() {
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [passwordConfirmation, setPasswordConfirmation] = useState("");
	const [errorMessage, setErrorMessage] = useState("");
	const router = useRouter();

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (!validator.isEmail(email)) {
			setErrorMessage("Please enter a valid email address.");
			return;
		}

		if (password !== passwordConfirmation) {
			setErrorMessage("Passwords do not match.");
			return;
		}

		try {
			const response = await fetch("/api/register", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					firstName,
					lastName,
					email,
					password,
				}),
			});

			if (response.ok) {
				router.push("/login");
			} else {
				const { message } = await response.json();
				setErrorMessage(message);
			}
		} catch (error) {
			console.error(error);
			setErrorMessage("An unexpected error occurred.");
		}
	};

	return (
		<>
			<div className='flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8'>
				<div className='w-full max-w-md space-y-8'>
					<div className='grid justify-items-center'>
						<Image src={Favicon} alt={"logo"} />
						<Typography variant='h3' className='text-center'>
							Create an Account
						</Typography>
					</div>
					<form
						className='mt-8 space-y-6'
						onSubmit={handleSubmit}
						method='POST'
					>
						{errorMessage && <p>{errorMessage}</p>}
						<input type='hidden' name='remember' defaultValue='true' />
						<div className=' rounded-md shadow-sm -space-y-px'>
							<div>
								<label htmlFor='first-name' className='sr-only'>
									First Name
								</label>
								<input
									id='firstname'
									name='firstname'
									type='text'
									required
									className='relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm'
									placeholder='First Name'
									onChange={(e) => setFirstName(e.target.value)}
								/>
							</div>
							<div>
								<label htmlFor='last-name' className='sr-only'>
									Last Name
								</label>
								<input
									id='lastname'
									name='lastname'
									type='text'
									required
									className='relative block w-full appearance-none rounded-none border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm'
									placeholder='Last Name'
									onChange={(e) => setLastName(e.target.value)}
								/>
							</div>
							<div>
								<label htmlFor='email-address' className='sr-only'>
									Email address
								</label>
								<input
									id='email-address'
									name='email'
									type='email'
									autoComplete='email'
									required
									className='relative block w-full appearance-none rounded-none border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm'
									placeholder='Email address'
									onChange={(e) => setEmail(e.target.value)}
								/>
							</div>
							<div>
								<label htmlFor='password' className='sr-only'>
									Password
								</label>
								<input
									id='password'
									name='password'
									type='password'
									required
									className='relative block w-full appearance-none rounded-none border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm'
									placeholder='Password'
									onChange={(e) => setPassword(e.target.value)}
								/>
							</div>
							<div>
								<label htmlFor='password' className='sr-only'>
									Confirm Password
								</label>
								<input
									id='confirmPassword'
									name='confirmPassword'
									type='password'
									required
									className='relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm'
									placeholder='Confirm Password'
									onChange={(e) => setPasswordConfirmation(e.target.value)}
								/>
							</div>
						</div>
						<div>
							<button
								type='submit'
								className='group relative flex w-full justify-center rounded-md border border-transparent bg-orange-600 py-2 px-4 text-sm font-medium text-white hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2'
							>
								<span className='absolute inset-y-0 left-0 flex items-center pl-3'>
									<HowToRegIcon
										className='h-5 w-5 text-indigo-500 group-hover:text-indigo-400'
										aria-hidden='true'
									/>
								</span>
								Register
							</button>
						</div>
					</form>
				</div>
			</div>
		</>
	);
}
