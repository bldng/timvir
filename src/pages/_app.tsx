import Head from "next/head";
import React from "react";

export default function App({ Component, pageProps }) {
  return (
    <>
      <style jsx global>{`
        body {
          margin: 0;
          box-sizing: border-box;
          overscroll-behavior: none;
        }

        *,
        *:before,
        *:after {
          box-sizing: inherit;
        }
      `}</style>

      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1.0, shrink-to-fit=no" />
      </Head>

      <Component {...pageProps} />
    </>
  );
}
