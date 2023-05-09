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
					Welcome to my E-commerce Website!
				</Typography>
				<Typography variant='body1'>
					This website was created as a personal project for my portfolio! The
					goal of the project was to create an e-commerce website. This project
					was developed using Next.JS, MongoDB, Tailwind CSS, and Material UI.
					Feel free to explore the pages and see what I have created.
				</Typography>
			</div>
		</>
	);
}
