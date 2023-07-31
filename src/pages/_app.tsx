import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { RecoilRoot } from "recoil";
import { ToastContainer } from "react-toastify";
import "@/firebase/config";
import RainbowProvider from "@/rainbow/RainbowProvider";

import "react-toastify/dist/ReactToastify.css";
import "@rainbow-me/rainbowkit/styles.css";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <RecoilRoot>
      <ToastContainer />
      <RainbowProvider>
        <Component {...pageProps} />
      </RainbowProvider>
    </RecoilRoot>
  );
}
