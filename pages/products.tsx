import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import Image from "next/image";
import clientPromise from "../lib/mongodb";
import { cp } from "fs";
import { useState } from "react";
import { Pagination } from "@mui/material";

interface Product {
	productId: number;
	name: string;
	price: number;
	quantity: number;
	imgSrc: string;
	imgAlt: string;
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
	let list: Product[] = products;

	// amount of products per page
	const [pageSize, setPageSize] = useState(16);
	const [currentPage, setCurrentPage] = useState(1);
	// get the max amount of pages possible with the amount of products
	const maxPage = Math.ceil(list.length / pageSize);
	console.log(maxPage);

	// filter products based on page and amount of products per page
	// Since array starts at 0, the start index must be the current page subtracted by 1.
	const startIndex = (currentPage - 1) * pageSize;
	const endIndex = startIndex + pageSize;
	const currentPageProducts = list.slice(startIndex, endIndex);

	return (
		<div className='min-h-screen bg-bg'>
			<div className='mx-auto max-w-2xl px-4 py-8 sm:px-6 sm:py-8 lg:max-w-7xl lg:px-8'>
				<h1 className='pb-8 title-font'>Products</h1>
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
							<h3 className='mt-4 text-lg '>{product.name}</h3>
							{product.quantity > 1 ? (
								<p className='mt-1 text-md font-medium '>CA${product.price}</p>
							) : (
								<p className='mt-1 text-md font-medium '>SOLD OUT</p>
							)}
						</a>
					))}
				</div>
				<div className='flex justify-center'>
					<Pagination count={maxPage} color='primary' shape='rounded' />
				</div>
			</div>
		</div>
	);
}
