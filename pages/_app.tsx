import "../styles/globals.css";
import type { AppProps } from "next/app";
import Navigation from "../components/navigation";
import Header from "../components/header";
import Footer from "../components/footer";
import Head from "next/head";
import NextNProgress from "nextjs-progressbar";

export default function App({ Component, pageProps }: AppProps) {
	return (
		<>
			<Head>
				<title>Mechboards</title>
			</Head>
			<div className='flex flex-col h-full w-full justify-between '>
				<Header />
				<NextNProgress color='#21FA90' />
				<Navigation />
				<div className=' min-h-full w-full'>
					<Component {...pageProps} />
				</div>
				<Footer />
			</div>
		</>
	);
}
