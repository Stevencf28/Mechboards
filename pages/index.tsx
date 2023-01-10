import Imagecarousel from "../components/imagecarousel";
import { Typography } from "@mui/material";

export default function Home() {
	return (
		<>
			<div className='mb-6'>
				<Imagecarousel />
			</div>
			<div className='container justify-evenly m-auto space-y-5'>
				<Typography
					variant='h1'
					className='font-bold text-5xl antialiased text-center'
				>
					Welcome to Mechboards!
				</Typography>
				<Typography variant='body1'>
					Lorem isum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
					tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
					veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
					ea commodo consequat. Duis aute irure dolor in reprehenderit in
					voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur
					sint occaecat cupidatat non proident, sunt in culpa qui officia
					deserunt mollit anim id est laborum.
				</Typography>
			</div>
		</>
	);
}
