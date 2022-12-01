import {Product} from "../../../lib/types";
import {GetServerSideProps} from "next";
import Layout from "../../../components/Layout";
import {FormEvent, useState} from "react";
import {useRouter} from "next/router";
import SelectInput from "../../../components/SelectInput";

export default function IndividualProductDetails({product}: { product: Product }) {
  const router = useRouter()

  const [quantity, setQuantity] = useState<number>(0)

  const productRange = product.quantity > 0 ? Array.from(Array(product.quantity).keys())
    .map((x) => {
      return {key: x + 1, value: x + 1}
    }) : [{key: 0, value: 0}]

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault()
    console.log([quantity])
    router.push('/cart')
  }

  return (
    <Layout>
      <div className="container flex flex-col md:flex-row justify-between gap-4 items-start">
        <div className="max-w-2xl">
          <h1 className="text-4xl">{product.name}</h1>
          <p className="font-light mb-2">{product.description}</p>
          <p className="font-normal bg-blue-500 inline text-white px-2 py-1">${product.price}</p>
        </div>
        <div className="rounded-lg px-4 py-2 border">
          <p className="mb-4">Only {product.quantity} left in stock.</p>
          <form onSubmit={handleSubmit}>
            <SelectInput
              type={'number'}
              label={'Quantity: '}
              value={quantity}
              setState={setQuantity}
              isRequired={true}
              options={productRange}
            />
            <button
              className="block w-full rounded-full bg-cyan-500 text-white px-2 py-1 w-20 text-center my-2"
              disabled={product.quantity === 0}
            >
              Add to Cart
            </button>
          </form>
        </div>
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
