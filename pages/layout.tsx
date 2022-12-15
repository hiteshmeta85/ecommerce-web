import React from 'react';
import Head from "next/head";
import Navbar from "../components/Navbar";

interface Layout {
  pageTitle?: string;
  children: React.ReactNode;
  isUserLoggedIn: boolean;
  cartItemCount: number;
}

function Layout(props: Layout) {
  const {pageTitle, children, isUserLoggedIn, cartItemCount} = props

  return (
    <div>
      <Head>
        <title>{pageTitle || 'Ecommerce App'}</title>
        <meta name="description" content="Ecommerce App created with Next.js and Tailwind"/>
        <link rel="icon" href="/favicon.ico"/>
      </Head>

      <div>
        <Navbar isUserLoggedIn={isUserLoggedIn} cartItemCount={cartItemCount}/>
        {children}
      </div>
    </div>
  );
}

export default Layout;
