import "../styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import { Provider } from "react-redux";
import { store } from "../redux/store";
function MyApp({ Component, pageProps }: AppProps) {
	return (
		<Provider store={store}>
			<Head>
				<title>Chatify</title>
			</Head>
			<Component {...pageProps} />
		</Provider>
	);
}

export default MyApp;
