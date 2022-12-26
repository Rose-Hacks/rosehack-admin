import "../styles/globals.css";
import type { AppProps } from "next/app";
import { Lexend } from "@next/font/google";
import "bootstrap/dist/css/bootstrap.min.css";
import Navigation from "../components/Navigation";

const lexend = Lexend({ subsets: ["latin"], variable: "--font-lexend" });

export default function App({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <main className={`${lexend.variable}`}>
      <Navigation />
      <Component {...pageProps} />
    </main>
  );
}
