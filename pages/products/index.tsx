import {Product} from "../../lib/types";
import {GetServerSideProps} from "next";
import Layout from "../../components/Layout";

export default function Products({products}: { products: Product[] }) {

  return (
    <Layout>
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

export const getServerSideProps: GetServerSideProps = async () => {

  const res = await fetch(`${process.env.DATABASE_URL}/products`);
  const products = await res.json()

  return {
    props: {
      products
    },
  };
};
