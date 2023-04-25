import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import { Button } from "@mui/material";
import Link from "next/link";

export default function aboutus() {
	return (
		<div className='flex flex-col space-y-4 container mx-auto py-8 sm:px-3'>
			<h1 className='title-font'>About us</h1>
			<p className='text-center'>
				My name is Steven Chen and I am a Software Engineer graduate from
				Centennial College in Ontario, Canada.<br></br> This website is created
				to demonstrate my skills in developing a e-commerce store.<br></br> This
				page was coded using Next.Js, MongoDB, TailwindCSS, and MaterialUI.
			</p>
			<div className='border-t'>
				<div>
					<p className='text-xl font-semibold text-center'>
						Here are my social links
					</p>
				</div>
				<div className='flex mx-auto justify-center gap-4 my-4'>
					<Button variant='contained' href={"https://github.com/Stevencf28"}>
						<GitHubIcon className='w-20 h-20' />
						<h2 className='px-2'>Github</h2>
					</Button>
					<Button variant='contained' href={"https://github.com/Stevencf28"}>
						<LinkedInIcon className='w-20 h-20' />
						<h2 className='px-2'>LinkedIn</h2>
					</Button>
				</div>
			</div>
		</div>
	);
}
