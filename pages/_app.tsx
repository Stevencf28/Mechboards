import "../styles/globals.css";
import type { AppProps } from "next/app";
import Navigation from "../components/navigation";
import Header from "../components/header";
import Footer from "../components/footer";

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
