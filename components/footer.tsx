import Link from "next/link";

export default function footer() {
	return (
		<footer className='fixed bottom-0 left-0 z-20 w-full p-4 border-t border-gray-200 shadow md:flex md:items-center md:justify-between md:p-6 sm:flex sm:items-center sm:justify-between dark:bg-gray-800 dark:border-gray-600'>
			<span className='text-sm text-gray-500 sm:text-center dark:text-gray-400'>
				© 2023 Steven Chen . All Rights Reserved.
			</span>
			<ul className='flex flex-wrap items-center mt-3 text-sm font-medium text-gray-500 dark:text-gray-400 sm:mt-0'>
				<li>
					<Link href='/' className='mr-4 hover:underline md:mr-6'>
						Home
					</Link>
				</li>
				<li>
					<Link href='/products' className='mr-4 hover:underline md:mr-6'>
						Products
					</Link>
				</li>
				<li>
					<Link href='/aboutus' className='mr-4 hover:underline md:mr-6'>
						About Us
					</Link>
				</li>
			</ul>
		</footer>
	);
}
