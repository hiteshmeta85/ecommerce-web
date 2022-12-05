import {Product} from "../../lib/types";
import {GetServerSideProps} from "next";
import Layout from "../../components/Layout";
import getCartItemCount from "../../lib/getCartItemCount";

export default function Products({
                                   products, isUserLoggedIn,
                                   cartItemCount
                                 }: { products: Product[], isUserLoggedIn: boolean, cartItemCount: number }) {

  return (
    <Layout isUserLoggedIn={isUserLoggedIn} cartItemCount={cartItemCount}>
      <div className="container flex flex-col gap-3">
        <p>Products</p>
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

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_HOST}/products`);
  const products = await res.json()

  const {isUserLoggedIn, cartItemCount} = await getCartItemCount({token: context.req.cookies['token'] || ""})

  return {
    props: {
      products,
      isUserLoggedIn,
      cartItemCount
    },
  };
};
