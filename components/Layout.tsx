import React from 'react';
import Head from "next/head";

interface Layout {
  pageTitle?: string;
  children: React.ReactNode;
}

function Layout(props: Layout) {
  const {pageTitle, children} = props

  return (
    <div>
      <Head>
        <title>{pageTitle || 'Ecommerce App'}</title>
        <meta name="description" content="Ecommerce App created with Next.js and Tailwind" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div>
        {children}
      </div>
    </div>
  );
}

export default Layout;
