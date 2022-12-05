import {Product} from "../../../lib/types";
import {GetServerSideProps} from "next";
import {useRouter} from "next/router";
import getCartItemCount from "../../../lib/getCartItemCount";
import axios from "axios";
import {FormEvent, useState} from "react";
import Layout from "../../../components/Layout";
import SelectInput from "../../../components/SelectInput";

export default function IndividualProductDetails({
                                                   product,
                                                   isUserLoggedIn,
                                                   cartItemCount
                                                 }: { product: Product, cartItemCount: number, isUserLoggedIn: boolean }) {
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
    <Layout cartItemCount={cartItemCount} isUserLoggedIn={isUserLoggedIn}>
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

export const getServerSideProps: GetServerSideProps = async (context) => {

  const {isUserLoggedIn, cartItemCount} = await getCartItemCount({token: context.req.cookies['token'] || ""})

  try {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_HOST}/products/${context.params?.id}`)
    if (response.data.data) {
      return {
        props: {
          product: response.data.data,
          cartItemCount,
          isUserLoggedIn
        }
      }
    } else {
      return {
        notFound: true
      }
    }
  } catch (err) {
    return {
      notFound: true
    }
  }
};
