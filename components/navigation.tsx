import React, { useEffect } from "react";
import { Fragment } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import Favicon from "../public/favicon.ico";
import Link from "next/link";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Button } from "@mui/material";
import useUser from "../lib/useUser";
import { useRouter } from "next/router";
import fetchJson from "../lib/fetchJson";

const navigation = [
	{ name: "Home", href: "/" },
	{ name: "Products", href: "/products" },
	{ name: "About Us", href: "/aboutus" },
];

export default function Navigation() {
	const { user, mutateUser } = useUser();
	const router = useRouter();
	return (
		<div>
			<Disclosure as='nav' className='bg-gray-800'>
				{({ open }) => (
					<>
						<div className='mx-auto max-w-7xl px-2 sm:px-6 lg:px-8'>
							<div className='relative flex h-16 items-center justify-between'>
								<div className='absolute inset-y-0 left-0 flex items-center sm:hidden'>
									{/* Mobile menu button*/}
									<Disclosure.Button className='inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white'>
										<span className='sr-only'>Open main menu</span>
										{open ? (
											<XMarkIcon className='block h-6 w-6' aria-hidden='true' />
										) : (
											<Bars3Icon className='block h-6 w-6' aria-hidden='true' />
										)}
									</Disclosure.Button>
								</div>
								<div className='flex flex-1 items-center justify-center sm:items-stretch sm:justify-start'>
									<div className='flex flex-shrink-0'>
										<Link href={"/"}>
											<Image
												src={Favicon}
												alt={"Store Logo"}
												className='block h-16 w-auto xl:block'
											/>
										</Link>
									</div>
									<div className='self-center hidden sm:ml-6 sm:block'>
										<div className='flex space-x-4'>
											{navigation.map((item) => (
												<Link
													key={item.name}
													href={item.href}
													className='text-gray-300 hover:bg-gray-700 hover:text-white
														px-3 py-2 rounded-md text-sm font-medium'
												>
													{item.name}
												</Link>
											))}
										</div>
									</div>
								</div>
								<div className='absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0'>
									{/* Shopping Cart */}
									<Button
										href='/cart'
										className='rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800'
									>
										<ShoppingCartIcon
											aria-label='Shopping Cart'
											className='h-6 w-6'
										/>
									</Button>
									{user?.isLoggedIn === true ? (
										<Menu as='div' className='relative ml-3'>
											<div>
												<Menu.Button className='flex rounded-full bg-gray-800 text-sm hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800'>
													<span className='sr-only'>Open user menu</span>
													<p
														className='text-gray-300 
													px-3 py-2 rounded-md text-sm font-medium'
													>
														Hello, {user.firstName} {user.lastName}!
													</p>
												</Menu.Button>
											</div>

											<Transition
												as={Fragment}
												enter='transition ease-out duration-100'
												enterFrom='transform opacity-0 scale-95'
												enterTo='transform opacity-100 scale-100'
												leave='transition ease-in duration-75'
												leaveFrom='transform opacity-100 scale-100'
												leaveTo='transform opacity-0 scale-95'
											>
												<Menu.Items className='absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'>
													<Menu.Item>
														<Link
															href='/profile'
															className={
																"block px-4 py-2 text-sm text-gray-700 hover:bg-gray-800 hover:text-white border-b"
															}
														>
															Your Profile
														</Link>
													</Menu.Item>
													{/* If in the future an admin page wants to be included. */}
													{user.userType === "admin" ? (
														<Menu.Item>
															<Link
																href='/admin'
																className={
																	"block px-4 py-2 text-sm text-gray-700 hover:bg-gray-800 hover:text-white border-b"
																}
															>
																Admin Page
															</Link>
														</Menu.Item>
													) : (
														<></>
													)}
													<Menu.Item>
														<Link
															href='/orders'
															className={
																"block px-4 py-2 text-sm text-gray-700 hover:bg-gray-800 hover:text-white border-b"
															}
														>
															Your orders
														</Link>
													</Menu.Item>
													<Menu.Item>
														<Link
															href='/cart'
															className={
																"block px-4 py-2 text-sm text-gray-700 hover:bg-gray-800 hover:text-white border-b"
															}
														>
															Cart
														</Link>
													</Menu.Item>
													<Menu.Item>
														<Link
															href='/api/logout'
															onClick={async (e) => {
																e.preventDefault();
																mutateUser(
																	await fetchJson("/api/logout", {
																		method: "POST",
																	}),
																	false
																);
																router.push("/login");
															}}
															className={
																"block px-4 py-2 text-sm text-gray-700 hover:bg-gray-800 hover:text-white"
															}
														>
															Sign out
														</Link>
													</Menu.Item>
												</Menu.Items>
											</Transition>
										</Menu>
									) : (
										<Menu as='div' className='relative ml-3'>
											<div>
												<Menu.Button className='flex rounded-full bg-gray-800 text-sm hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800'>
													<span className='sr-only'>Open user menu</span>
													<p
														className='text-gray-300 
													px-3 py-2 rounded-md text-sm font-medium'
													>
														Login
													</p>
												</Menu.Button>
											</div>
											<Transition
												as={Fragment}
												enter='transition ease-out duration-100'
												enterFrom='transform opacity-0 scale-95'
												enterTo='transform opacity-100 scale-100'
												leave='transition ease-in duration-75'
												leaveFrom='transform opacity-100 scale-100'
												leaveTo='transform opacity-0 scale-95'
											>
												<Menu.Items className='absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'>
													<Menu.Item>
														<Link
															href='/login'
															className={
																"block px-4 py-2 text-sm text-gray-700 hover:bg-gray-800 hover:text-white"
															}
														>
															Login
														</Link>
													</Menu.Item>
													<Menu.Item>
														<Link
															href='/register'
															className={
																"block px-4 py-2 text-sm text-gray-700 hover:bg-gray-800 hover:text-white"
															}
														>
															Register
														</Link>
													</Menu.Item>
												</Menu.Items>
											</Transition>
										</Menu>
									)}
								</div>
							</div>
						</div>

						<Disclosure.Panel className='sm:hidden'>
							<div className='space-y-1 px-2 pt-2 pb-3'>
								{navigation.map((item) => (
									<Disclosure.Button
										key={item.name}
										as='a'
										href={item.href}
										className={
											"text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
										}
									>
										{item.name}
									</Disclosure.Button>
								))}
							</div>
						</Disclosure.Panel>
					</>
				)}
			</Disclosure>
		</div>
	);
}
