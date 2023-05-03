import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import Image from "next/image";
import clientPromise from "../lib/mongodb";
import { Fragment, useEffect, useState } from "react";
import { Button, Checkbox, Pagination } from "@mui/material";

import { Dialog, Disclosure, Menu, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import {
	ChevronDownIcon,
	FunnelIcon,
	MinusIcon,
	PlusIcon,
} from "@heroicons/react/20/solid";

interface Product {
	productId: number;
	name: string;
	price: number;
	quantity: number;
	imgSrc: string;
	imgAlt: string;
	amountSold: number;
	sale: boolean;
	salePrice: number;
}

export const getServerSideProps: GetServerSideProps = async () => {
	try {
		const client = await clientPromise;
		const db = client.db("mechboards");
		const products = await db.collection("products").find().toArray();
		return {
			props: {
				products: JSON.parse(JSON.stringify(products)) || [],
			},
		};
	} catch (e) {
		return {
			props: {
				products: [],
			},
		};
	}
};
export default function Products({
	products,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
	// amount of products per page
	const pageSize = 16;
	const [currentPage, setCurrentPage] = useState(1);

	// Filters products
	const [sortOrder, setSortOrder] = useState("");
	const [inStockOnly, setInStockOnly] = useState(false);

	// get the max amount of pages possible with the amount of products
	const [maxPage, setMaxPage] = useState(1);

	const [currentPageProducts, setCurrentPageProducts] = useState<Product[]>([]);

	const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

	const subCategories = [
		{ name: "Keyboards" },
		{ name: "Keycaps" },
		{ name: "Switches" },
		{ name: "Deskpad" },
	];
	const filters = [
		{
			id: "category",
			name: "Category",
			options: [
				{ value: "new-arrivals", label: "New Arrivals", checked: false },
				{ value: "sale", label: "Sale", checked: false },
				{ value: "travel", label: "Travel", checked: false },
				{ value: "organization", label: "Organization", checked: false },
				{ value: "accessories", label: "Accessories", checked: false },
			],
		},
	];

	const sortOptions = [
		{ name: "Most Popular", current: true },
		{ name: "Newest", current: false },
		{ name: "Price: Low to High", current: false },
		{ name: "Price: High to Low", current: false },
	];

	const [activeOption, setActiveOption] = useState("");

	useEffect(() => {
		// filter products based on page and amount of products per page
		// Since array starts at 0, the start index must be the current page subtracted by 1.
		const startIndex = (currentPage - 1) * pageSize;
		const endIndex = startIndex + pageSize;
		// Set the current page products to the max amount of products per page
		let newProducts = products.slice(startIndex, endIndex);
		setMaxPage(Math.ceil(products.length / pageSize));

		// Apply filters
		if (inStockOnly) {
			let inStockProducts = products.filter(
				(product: Product) => product.quantity > 0
			);
			setMaxPage(Math.ceil(inStockProducts.length / pageSize));
			newProducts = inStockProducts.slice(startIndex, endIndex);
		}

		switch (sortOrder) {
			case "Most Popular":
				newProducts.sort(
					(a: Product, b: Product) => b.amountSold - a.amountSold
				);
				break;
			case "Newest":
				newProducts.sort((a: Product, b: Product) => b.productId - a.productId);
				break;
			case "Price: Low to High":
				newProducts.sort((a: Product, b: Product) => a.price - b.price);
				console.log("low to high called");
				break;
			case "Price: High to Low":
				newProducts.sort((a: Product, b: Product) => b.price - a.price);
				console.log("high to low called");
				break;
			default:
				newProducts.sort((a: Product, b: Product) => a.productId - b.productId);
		}
		// First eliminate the current page products (in case of existing products are being displayed)
		setCurrentPageProducts([]);
		setCurrentPageProducts(newProducts);
	}, [currentPage, products, pageSize, sortOrder, inStockOnly]);

	const handlePageChange = (
		event: React.ChangeEvent<unknown>,
		value: number
	) => {
		setCurrentPageProducts([]);
		setCurrentPage(value);
	};

	const handleInStockChange = (
		event: React.ChangeEvent<{ value: unknown }>,
		checked: boolean
	) => {
		setInStockOnly(checked);
		handlePageChange(event, 1);
	};

	const handleSortOrderChange = (sortType: string) => {
		if (sortType === activeOption) {
			console.log("no change");
			setSortOrder("");
			setActiveOption("");
		} else {
			setActiveOption(sortType);
			setSortOrder(sortType);
		}
		handlePageChange(null as any, 1);
	};

	return (
		<div>
			<div>
				{/* Mobile filter dialog */}
				<Transition.Root show={mobileFiltersOpen} as={Fragment}>
					<Dialog
						as='div'
						className='relative z-40 lg:hidden'
						onClose={setMobileFiltersOpen}
					>
						<Transition.Child
							as={Fragment}
							enter='transition-opacity ease-linear duration-300'
							enterFrom='opacity-0'
							enterTo='opacity-100'
							leave='transition-opacity ease-linear duration-300'
							leaveFrom='opacity-100'
							leaveTo='opacity-0'
						>
							<div className='fixed inset-0 bg-black bg-opacity-25' />
						</Transition.Child>

						<div className='fixed inset-0 z-40 flex'>
							<Transition.Child
								as={Fragment}
								enter='transition ease-in-out duration-300 transform'
								enterFrom='translate-x-full'
								enterTo='translate-x-0'
								leave='transition ease-in-out duration-300 transform'
								leaveFrom='translate-x-0'
								leaveTo='translate-x-full'
							>
								<Dialog.Panel className='relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-12 shadow-xl'>
									<div className='flex items-center justify-between px-4'>
										<h2 className='text-lg font-medium text-gray-900'>
											Filters
										</h2>
										<button
											type='button'
											className='-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 text-gray-400'
											onClick={() => setMobileFiltersOpen(false)}
										>
											<span className='sr-only'>Close menu</span>
											<XMarkIcon className='h-6 w-6' aria-hidden='true' />
										</button>
									</div>

									{/* Filters */}
									<form className='mt-4 border-t border-gray-200'>
										<h3 className='sr-only'>Categories</h3>
										<ul
											role='list'
											className='px-2 py-3 font-medium text-gray-900'
										>
											{subCategories.map((category) => (
												<li key={category.name}>
													<Button className='block px-2 py-3'>
														{category.name}
													</Button>
												</li>
											))}
										</ul>

										{filters.map((section) => (
											<Disclosure
												as='div'
												key={section.id}
												className='border-t border-gray-200 px-4 py-6'
											>
												{({ open }) => (
													<>
														<h3 className='-mx-2 -my-3 flow-root'>
															<Disclosure.Button className='flex w-full items-center justify-between bg-white px-2 py-3 text-gray-400 hover:text-gray-500'>
																<span className='font-medium text-gray-900'>
																	{section.name}
																</span>
																<span className='ml-6 flex items-center'>
																	{open ? (
																		<MinusIcon
																			className='h-5 w-5'
																			aria-hidden='true'
																		/>
																	) : (
																		<PlusIcon
																			className='h-5 w-5'
																			aria-hidden='true'
																		/>
																	)}
																</span>
															</Disclosure.Button>
														</h3>
														<Disclosure.Panel className='pt-6'>
															<div className='space-y-6'>
																{section.options.map((option, optionIdx) => (
																	<div
																		key={option.value}
																		className='flex items-center'
																	>
																		<input
																			id={`filter-mobile-${section.id}-${optionIdx}`}
																			name={`${section.id}[]`}
																			defaultValue={option.value}
																			type='checkbox'
																			defaultChecked={option.checked}
																			className='h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500'
																		/>
																		<label
																			htmlFor={`filter-mobile-${section.id}-${optionIdx}`}
																			className='ml-3 min-w-0 flex-1 text-gray-500'
																		>
																			{option.label}
																		</label>
																	</div>
																))}
															</div>
														</Disclosure.Panel>
													</>
												)}
											</Disclosure>
										))}
									</form>
								</Dialog.Panel>
							</Transition.Child>
						</div>
					</Dialog>
				</Transition.Root>

				<main className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
					<div className='flex items-baseline justify-between border-b border-gray-200 pb-6 pt-24'>
						<h1 className='text-4xl font-bold tracking-tight text-gray-900'>
							Products
						</h1>

						<div className='flex items-center'>
							<div className='flex items-center -m-2 mr-5 p-2 sm:mr-7'>
								<Checkbox
									checked={inStockOnly}
									onChange={handleInStockChange}
									className='h-4 w-4 rounded border-gray-300 text-indigo-600 outline-none focus:ring-indigo-500'
								/>
								<label className='ml-3 text-sm text-gray-600'>
									In-Stock Only
								</label>
							</div>
							{/*  Sort Order Menu */}
							<Menu as='div' className='relative inline-block text-left'>
								<div>
									<Menu.Button className='group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900'>
										Sort
										<ChevronDownIcon
											className='-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500'
											aria-hidden='true'
										/>
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
									<Menu.Items className='absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none'>
										<div className='py-1'>
											{sortOptions.map((option) => (
												<Menu.Item key={option.name}>
													{({ active }) => (
														<a
															onClick={() => handleSortOrderChange(option.name)}
															className={`${
																active || activeOption == option.name
																	? "bg-gray-200 text-gray-900"
																	: "text-gray-700"
															} block px-4 py-2 text-sm w-full`}
														>
															{option.name}
														</a>
													)}
												</Menu.Item>
											))}
										</div>
									</Menu.Items>
								</Transition>
							</Menu>

							<Button
								className='-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden'
								onClick={() => setMobileFiltersOpen(true)}
							>
								<span className='sr-only'>Filters</span>
								<FunnelIcon className='h-5 w-5' aria-hidden='true' />
							</Button>
						</div>
					</div>

					<section aria-labelledby='products-heading' className='pb-24 pt-6'>
						<h2 id='products-heading' className='sr-only'>
							Products
						</h2>

						<div className='grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4'>
							{/* Filters */}
							<form className='hidden lg:block'>
								<h3 className='sr-only'>Categories</h3>
								<ul
									role='list'
									className='space-y-4 border-b border-gray-200 pb-6 text-sm font-medium text-gray-900'
								>
									{subCategories.map((category) => (
										<li key={category.name}>
											<Button>{category.name}</Button>
										</li>
									))}
								</ul>

								{filters.map((section) => (
									<Disclosure
										as='div'
										key={section.id}
										className='border-b border-gray-200 py-6'
									>
										{({ open }) => (
											<>
												<h3 className='-my-3 flow-root'>
													<Disclosure.Button className='flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500'>
														<span className='font-medium text-gray-900'>
															{section.name}
														</span>
														<span className='ml-6 flex items-center'>
															{open ? (
																<MinusIcon
																	className='h-5 w-5'
																	aria-hidden='true'
																/>
															) : (
																<PlusIcon
																	className='h-5 w-5'
																	aria-hidden='true'
																/>
															)}
														</span>
													</Disclosure.Button>
												</h3>
												<Disclosure.Panel className='pt-6'>
													<div className='space-y-4'>
														{section.options.map((option, optionIdx) => (
															<div
																key={option.value}
																className='flex items-center'
															>
																<input
																	id={`filter-${section.id}-${optionIdx}`}
																	name={`${section.id}[]`}
																	defaultValue={option.value}
																	type='checkbox'
																	defaultChecked={option.checked}
																	className='h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500'
																/>
																<label
																	htmlFor={`filter-${section.id}-${optionIdx}`}
																	className='ml-3 text-sm text-gray-600'
																>
																	{option.label}
																</label>
															</div>
														))}
													</div>
												</Disclosure.Panel>
											</>
										)}
									</Disclosure>
								))}
							</form>

							{/* Product grid */}
							<div className='lg:col-span-3'>
								<div className='grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8'>
									{currentPageProducts.map((product: Product) => (
										<a
											key={product.productId}
											href={"/products/" + product.productId}
											className='group'
										>
											<div className='aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7'>
												<Image
													src={product.imgSrc}
													alt={product.imgAlt}
													fill
													className='h-full w-full object-cover object-center group-hover:opacity-75'
												/>
											</div>
											<h3 className='mt-4 text-lg font-medium '>
												{product.name}
											</h3>
											{product.sale ? (
												product.quantity > 1 ? (
													<>
														<p className='mt-1 text-md font-medium line-through'>
															CA${product.price.toFixed(2)}
														</p>
														<p className='mt-1 text-md font-medium '>
															<span className='text-red-500 font-bold'>
																ON SALE!
															</span>{" "}
															CA$
															{product.salePrice.toFixed(2)}
														</p>
													</>
												) : (
													<>
														<p className='mt-1 text-md font-medium line-through'>
															CA${product.price.toFixed(2)}
														</p>
														<p className='mt-1 text-md font-medium '>
															<span className='text-red-500 font-bold'>
																ON SALE!
															</span>{" "}
															CA$
															{product.salePrice.toFixed(2)}
														</p>
														<p className='mt-1 text-md text-red-500 font-bold'>
															SOLD OUT
														</p>
													</>
												)
											) : product.quantity > 1 ? (
												<p className='mt-1 text-md font-medium '>
													CA${product.price.toFixed(2)}
												</p>
											) : (
												<>
													<p className='mt-1 text-md font-medium '>
														CA${product.price.toFixed(2)}
													</p>
													<p className='mt-1 text-md text-red-500 font-bold'>
														SOLD OUT
													</p>
												</>
											)}
										</a>
									))}
								</div>
								<div className='flex justify-center py-3 '>
									<div className='shrink bg-white rounded-lg p-2'>
										<Pagination
											count={maxPage}
											page={currentPage}
											onChange={handlePageChange}
											color='primary'
											shape='rounded'
										/>
									</div>
								</div>
							</div>
						</div>
					</section>
				</main>
			</div>
		</div>
	);
}
