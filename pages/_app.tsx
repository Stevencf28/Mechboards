import "../styles/globals.css";
import type { AppProps } from "next/app";
import Navigation from "../components/navigation";
import Header from "../components/header";
import Footer from "../components/footer";
import Head from "next/head";

export default function App({ Component, pageProps }: AppProps) {
	return (
		<>
			<Head>
				<title>Mechboards</title>
			</Head>
			<div className='flex flex-col h-full w-full justify-between bg-background'>
				<Header />
				<Navigation />
				<div className=' min-h-full w-full bg-background'>
					<Component {...pageProps} />
				</div>
				<Footer />
			</div>
		</>
	);
}
