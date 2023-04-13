import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import Image from "next/image";
import clientPromise from "../lib/mongodb";

interface Product {
	productId: number;
	name: string;
	price: number;
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
	return (
		<div className='min-h-screen bg-bg'>
			<div className='mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8'>
				<h2 className='sr-only'>Products</h2>

				<div className='grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8'>
					{list.map((product: Product) => (
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
							<h3 className='mt-4 text-sm '>{product.name}</h3>
							<p className='mt-1 text-lg font-medium '>CA${product.price}</p>
						</a>
					))}
				</div>
			</div>
		</div>
	);
}
