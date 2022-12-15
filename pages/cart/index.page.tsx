import Layout from "../layout";
import {GetServerSideProps} from "next";
import {CartItem} from "../../lib/types";
import axios from "axios";
import getCartItemCount from "../../lib/getCartItemCount";
import React, {useState} from "react";
import Select from "../../components/Select";
import {getAuthTokenCookie} from "../../lib/getAuthTokenCookie";

export default function Cart({
                               cartItems,
                               isUserLoggedIn,
                               cartItemCount
                             }: { cartItems: CartItem[], isUserLoggedIn: boolean, cartItemCount: number }) {

  const [currentCartItems, setCurrentCartItems] = useState<CartItem[]>(cartItems)

  const productRange = (quantity: number) => Array.from(Array(quantity).keys())
    .map((x) => {
      return {key: x + 1, value: x + 1}
    })

  const handleQuantityChange = async (value: number, id: number) => {
    try {
      const response = await axios.put(`${process.env.NEXT_PUBLIC_API_HOST}/cart-items/${id}`, {
        quantity: value
      }, {
        headers: {
          authorization: `Bearer ${getAuthTokenCookie()}`
        }
      })
      if (response) {
        const updatedCartItems = currentCartItems.map((item) => {
          if (item.id === id) {
            return {...item, quantity: value}
          }
          return item
        })
        setCurrentCartItems(updatedCartItems)
      }
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <Layout isUserLoggedIn={isUserLoggedIn} cartItemCount={cartItemCount}>
      <div className="container">
        <p>Cart</p>
        <hr className="my-4"/>
        {isUserLoggedIn ?
          <>
            <div>
              {currentCartItems.map((item, index) => {
                return (
                  <div key={index}>
                    <div>
                      <a href={`/products/${item.product.id}`} className='text-blue-500'>{item.product.name}</a>
                      <p className='truncate'>{item.product.description}</p>
                      {item.product.quantity >= item.quantity ?
                        <Select
                          id={item.id}
                          type={'number'}
                          label={'Quantity: '}
                          value={item.quantity}
                          handleChange={handleQuantityChange}
                          options={productRange(item.product.quantity)}
                          isRequired={true}
                        /> :
                        <p className="text-red-500 text-sm">Currently Unavailable</p>}
                    </div>
                    <hr className="my-4"/>
                  </div>
                )
              })}
            </div>
            {cartItems.length > 0 ?
              <a href={'/address'} className="bg-green-300 px-2 py-2 rounded">Proceed to Buy</a> :
              <p className="text-gray-500">No items in cart</p>
            }
          </> :
          <p>Please login to view cart</p>
        }
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
