import Layout from "@/components/layout";
import "@/styles/globals.scss";
import type { AppProps } from "next/app";
import { useState } from "react";

export default function App({ Component, pageProps }: AppProps) {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  return (
    <Layout
      isSubmitted={isSubmitted}
      setIsSubmitted={setIsSubmitted}
      searchQuery={searchQuery}
      setSearchQuery={setSearchQuery}
    >
      <Component
        {...pageProps}
        isSubmitted={isSubmitted}
        searchQuery={searchQuery}
      />
    </Layout>
  );
}
