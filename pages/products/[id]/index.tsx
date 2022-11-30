import {Product} from "../../../lib/types";
import {GetServerSideProps} from "next";
import Layout from "../../../components/Layout";

export default function IndividualProductDetails({product}: { product: Product }) {

  return (
    <Layout>
      <div className="container">
        <h1 className="text-4xl">{product.name}</h1>
        <p className="font-light">{product.description}</p>
        <p className="font-light">${product.price}</p>
        <p className="font-light">Quantity: {product.quantity}</p>
      </div>
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps = async ({params}) => {
  const res = await fetch(`${process.env.DATABASE_URL}/products/${params?.id}`);
  const product = await res.json()

  return {
    props: {
      product
    },
  };
};
