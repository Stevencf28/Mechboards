import "../styles/globals.css";
import type { AppProps } from "next/app";
import Navigation from "../components/navigation";
import Header from "../components/header";
import Footer from "../components/footer";
import clientPromise from "../lib/mongodb";

export async function getServerSideProps(context: any) {
	try {
		await clientPromise;
		// `await clientPromise` will use the default database passed in the MONGODB_URI
		// However you can use another database (e.g. myDatabase) by replacing the `await clientPromise` with the following code:
		//
		// `const client = await clientPromise`
		// `const db = client.db("myDatabase")`
		//
		// Then you can execute queries against your database like so:
		// db.find({}) or any of the MongoDB Node Driver commands

		return {
			props: { isConnected: true },
		};
	} catch (e) {
		throw new Error("Failed to connect to Database!");
	}
}

export default function App({ Component, pageProps }: AppProps) {
	return (
		<>
			<div className='flex flex-col h-screen justify-between'>
				<Header />
				<Navigation />
				<div className='mb-auto'>
					<Component {...pageProps} />
				</div>
				<Footer />
			</div>
		</>
	);
}
