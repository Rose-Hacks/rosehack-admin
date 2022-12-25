import "../styles/globals.css";
import type { AppProps } from "next/app";
import { Lexend } from "@next/font/google";

const lexend = Lexend({ subsets: ["latin"], variable: "--font-lexend" });

export default function App({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <main className={`${lexend.variable}`}>
      <Component {...pageProps} />
    </main>
  );
}
