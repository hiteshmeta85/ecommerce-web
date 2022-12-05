import Layout from "../../components/Layout";
import {GetServerSideProps} from "next";
import {CartItem} from "../../lib/types";
import CartItemCard from "../../components/CartItemCard";
import axios from "axios";
import getCartItemCount from "../../lib/getCartItemCount";

export default function Cart({
                               cartItems,
                               isUserLoggedIn,
                               cartItemCount
                             }: { cartItems: CartItem[], isUserLoggedIn: boolean, cartItemCount: number }) {

  return (
    <Layout isUserLoggedIn={isUserLoggedIn} cartItemCount={cartItemCount}>
      <div className="container">
        <p>Cart</p>
        <hr className="my-4"/>
        <div>
          {cartItems.map((item, index) => {
            return (
              <CartItemCard {...item} key={index}/>
            )
          })}
        </div>
        <a href={'/address'} className="bg-green-300 px-2 py-2 rounded">Proceed to Buy</a>
      </div>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {

  let cartItems: CartItem[] = []

  try {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_HOST}/cart-items`, {
      headers: {
        authorization: `Bearer ${context.req.cookies['token']}`
      }
    })
    if (response) {
      cartItems = response.data.data
    }
  } catch (err) {
    console.log(err)
  }

  const {isUserLoggedIn, cartItemCount} = await getCartItemCount({token: context.req.cookies['token'] || ""})

  return {
    props: {
      cartItems,
      isUserLoggedIn,
      cartItemCount
    },
  };
};
