import LoginIcon from "@mui/icons-material/Login";
import { Typography } from "@mui/material";
import Image from "next/image";
import Favicon from "../public/favicon.ico";
import { useState } from "react";
import validator from "validator";
import useUser from "../lib/useUser";
import fetchJson, { FetchError } from "../lib/fetchJson";
import { useRouter } from "next/router";
export default function Login() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [errorMessage, setErrorMessage] = useState("");
	const router = useRouter();
	const { mutateUser } = useUser({
		redirectTo: "/",
		redirectIfFound: true,
	});
	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (!validator.isEmail(email)) {
			setErrorMessage("Please enter a valid email address.");
			return;
		}

		try {
			mutateUser(
				await fetchJson("/api/login", {
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({ email, password }),
				})
			);
			router.push("/");
		} catch (error) {
			if (error instanceof FetchError) {
				setErrorMessage(error.data.message);
			} else {
				console.error("An unexpected error happened:", error);
			}
		}
	};

	return (
		<>
			<div className='flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8'>
				<div className='w-full max-w-md space-y-8'>
					<div className='grid justify-items-center'>
						<Image src={Favicon} alt={"logo"} />
						<Typography variant='h3' className='text-center'>
							Login to your account
						</Typography>
					</div>
					{errorMessage && <p>{errorMessage}</p>}
					<form className='mt-8 space-y-6' onSubmit={handleSubmit}>
						<input type='hidden' name='remember' defaultValue='true' />
						<div className='-space-y-px rounded-md shadow-sm'>
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
									className='relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm'
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
									autoComplete='current-password'
									required
									className='relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm'
									placeholder='Password'
									onChange={(e) => setPassword(e.target.value)}
								/>
							</div>
						</div>
						<div>
							<button
								type='submit'
								className='group relative flex w-full justify-center rounded-md border border-transparent bg-orange-600 py-2 px-4 text-sm font-medium text-white hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2'
							>
								<span className='absolute inset-y-0 left-0 flex items-center pl-3'>
									<LoginIcon
										className='h-5 w-5 text-indigo-500 group-hover:text-indigo-400'
										aria-hidden='true'
									/>
								</span>
								Sign in
							</button>
						</div>
					</form>
				</div>
			</div>
		</>
	);
}
