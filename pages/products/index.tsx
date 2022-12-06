import {Product} from "../../lib/types";
import {GetServerSideProps} from "next";
import Layout from "../../components/Layout";
import getCartItemCount from "../../lib/getCartItemCount";
import axios from "axios";
import React from "react";

export default function Products({
                                   products, isUserLoggedIn,
                                   cartItemCount
                                 }: { products: Product[], isUserLoggedIn: boolean, cartItemCount: number }) {

  return (
    <Layout isUserLoggedIn={isUserLoggedIn} cartItemCount={cartItemCount}>
      <div className="container flex flex-col gap-3">
        <p>Products</p>
        <hr className="my-4"/>
        {products.map((product) => {
          return (
            <div key={product.id}>
              <a href={`/products/${product.id}`} className="text-blue-600 underline">{product.name}</a>
              <p className="text-sm">${product.price}</p>
            </div>
          )
        })}
      </div>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {

  const {isUserLoggedIn, cartItemCount} = await getCartItemCount({token: context.req.cookies['token'] || ""})
  const response = await axios.get(`${process.env.NEXT_PUBLIC_API_HOST}/products`)

  const products: Product[] = response.data.data

  return {
    props: {
      products,
      isUserLoggedIn,
      cartItemCount
    },
  };
};
