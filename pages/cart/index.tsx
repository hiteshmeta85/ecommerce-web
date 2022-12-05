import Layout from "../../components/Layout";
import {GetServerSideProps} from "next";
import {CartItem} from "../../lib/types";
import CartItemCard from "../../components/CartItemCard";

export default function Cart({cartItems}: { cartItems: CartItem[] }) {

  return (
    <Layout>
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

export const getServerSideProps: GetServerSideProps = async () => {
  const res = await fetch(`${process.env.DATABASE_URL}/cart-items`);
  const cartItems = await res.json()

  return {
    props: {
      cartItems
    },
  };
};
