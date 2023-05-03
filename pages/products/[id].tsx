import clientPromise from "../../lib/mongodb";
import Image from "next/image";
import { useEffect, useState } from "react";
import ReactLoading from "react-loading";
import {
	GetServerSideProps,
	GetServerSidePropsContext,
	InferGetServerSidePropsType,
	NextPage,
} from "next";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import BlockIcon from "@mui/icons-material/Block";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Button } from "@mui/material";
import { useRouter } from "next/router";

interface Product {
	productId: number;
	name: string;
	price: number;
	quantity: number;
	description: string;
	imgSrc: string;
	imgAlt: string;
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
	try {
		const id = params?.id as string;

		const client = await clientPromise;
		const db = client.db("mechboards");
		const product = await db
			.collection("products")
			.findOne({ productId: parseInt(id as string) });

		return {
			props: {
				product: JSON.parse(JSON.stringify(product)),
			},
		};
	} catch (e) {
		return {
			props: {
				product: null,
			},
		};
	}
};

export default function ProductPage({
	product,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
	const [isLoading, setIsLoading] = useState(true);
	const [count, setCount] = useState<number>(1);
	const router = useRouter();

	useEffect(() => {
		if (product) {
			setIsLoading(false);
		}
	}, [product]);

	if (isLoading) {
		return (
			<div
				style={{
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
					height: "100vh",
				}}
			>
				<ReactLoading
					type={"spin"}
					color={"#00BFFF"}
					height={"10%"}
					width={"10%"}
				/>
			</div>
		);
	}

	if (!product) {
		return <div>Product not found</div>;
	}

	function handleIncrement() {
		if (count < 99) {
			setCount(count + 1);
		}
	}

	function handleDecrement() {
		if (count > 1) {
			setCount(count - 1);
		}
	}

	function handleQuantityChange(event: React.ChangeEvent<HTMLInputElement>) {
		const newCount = parseInt(event.target.value);
		if (!isNaN(newCount) && newCount >= 1 && newCount <= 99) {
			setCount(newCount);
		}
	}

	function handleBackClick() {
		if (router && router.back) {
			router.back();
		}
		router.push("/products");
	}

	return (
		<div className='container m-auto'>
			<div className='pt-16'>
				<div className='mx-auto lg:grid lg:grid-cols-2 lg:grid-rows-2 lg:max-w-7xl lg:gap-x-8 lg:px-8'>
					<div>
						<Button
							className='flex flex-row space-x-2 mb-2 bg-gray-800'
							variant='contained'
							onClick={handleBackClick}
							startIcon={<ArrowBackIcon />}
						>
							<h4 className='text-md'>Go Back</h4>
						</Button>
						<Image
							src={product.imgSrc}
							alt={product.imgAlt}
							width='620'
							height='680'
							className='lg:h-full lg:w-full object-cover object-center sm:pb-4 sm:h-1/2 sm:w-1/2 sm:mx-auto'
						/>
					</div>
					<div className='space-y-6'>
						<h1 className='text-2xl font-bold tracking-tight text-center sm:text-3xl'>
							{product.name}
						</h1>

						<h1 className='text-base  sm:text-lg'>{product.description}</h1>
						<div>
							<p className='text-2xl tracking-tight'>Price:</p>
							<p className='text-3xl tracking-tight'>CA${product.price}</p>
						</div>
						<form>
							<label>Quantity</label>
							<div className='flex flex-wrap'>
								<button
									type='button'
									className='bg-gray-700'
									onClick={handleDecrement}
								>
									<RemoveIcon></RemoveIcon>
								</button>
								<input
									type='number'
									name='qty'
									min={1}
									max={99}
									key={count}
									defaultValue={count}
									onChange={handleQuantityChange}
									className=' bg-gray-700 text-white text-center w-20 h-9 border-none'
								/>
								<button
									type='button'
									className='bg-gray-700'
									onClick={handleIncrement}
								>
									<AddIcon></AddIcon>
								</button>
							</div>
							{product.quantity > 1 ? (
								<Button
									type='submit'
									className='mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
								>
									Add to Cart
								</Button>
							) : (
								<Button
									type='submit'
									className='mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
									variant='contained'
									startIcon={<BlockIcon />}
								>
									<p className='text-white'>Sold Out!</p>
								</Button>
							)}
						</form>
					</div>
				</div>
			</div>
		</div>
	);
}
