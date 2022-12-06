import React, {FormEvent} from 'react';
import {GetServerSideProps} from "next";
import axios from "axios";
import getCartItemCount from "../../lib/getCartItemCount";
import {Address} from "../../lib/types";
import Layout from "../../components/Layout";
import Input from "../../components/Input";
import {getAuthTokenCookie} from "../../lib/getAuthTokenCookie";
import {useRouter} from "next/router";

function Index({
                 addresses,
                 isUserLoggedIn,
                 cartItemCount
               }: { addresses: Address[], isUserLoggedIn: boolean, cartItemCount: number }) {

  const router = useRouter()
  const [selectedAddress, setSelectedAddress] = React.useState<Address>({} as Address)
  const [userAddresses, setUserAddresses] = React.useState<Address[]>(addresses);
  const [newAddress, setNewAddress] = React.useState<string>('');

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault()
    console.log(newAddress)
    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_HOST}/addresses`, {address: newAddress}, {
        headers: {
          Authorization: `Bearer ${getAuthTokenCookie()}`
        }
      })
      if (response) {
        setUserAddresses([...userAddresses, response.data.data])
        setNewAddress('')
        console.log(response.data.data)
      }
    } catch (err) {
      console.log(err)
    }
  }

  const handlePlaceOrder = async () => {
    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_HOST}/orders`, {address_id: selectedAddress.id}, {
        headers: {
          Authorization: `Bearer ${getAuthTokenCookie()}`
        }
      })
      if (response) {
        await router.push('/success')
      }
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <Layout isUserLoggedIn={isUserLoggedIn} cartItemCount={cartItemCount}>
      <div className="container">
        <p>Address</p>
        <hr className="my-4"/>
        {isUserLoggedIn ?
          <>
            <form onSubmit={handleSubmit}>
              <Input
                type={'text'}
                label={'Add new address'}
                setState={setNewAddress}
                value={newAddress}
                placeholder={'Enter your address'}
                isRequired={true}
              />
              <button
                type={"submit"}
                className="rounded bg-blue-600 text-white px-2 py-1 w-20 text-center mb-4"
              >
                Add
              </button>
            </form>
            {userAddresses.map((address, index) => {
              return (
                <div
                  key={index}
                  className={`bg-gray-100 p-2 border border-1 mb-2 ${selectedAddress.id === address.id && 'border-blue-800'}`}
                  onClick={() => setSelectedAddress(address)}>
                  <p>{address.address}</p>
                </div>
              )
            })}
            <button
              disabled={Object.keys(selectedAddress).length === 0}
              onClick={handlePlaceOrder}
              className="rounded bg-blue-600 text-white px-4 py-1 text-center my-2"
            >
              Place Order
            </button>
          </> : <p>Please login</p>}
      </div>
    </Layout>
  );
}

export default Index;

export const getServerSideProps: GetServerSideProps = async (context) => {

  let addresses: Address[] = []

  try {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_HOST}/addresses`, {
      headers: {
        authorization: `Bearer ${context.req.cookies['token']}`
      }
    })
    if (response) {
      addresses = response.data.data
    }
  } catch (err) {
    console.log(err)
  }

  const {isUserLoggedIn, cartItemCount} = await getCartItemCount({token: context.req.cookies['token'] || ""})

  return {
    props: {
      addresses,
      isUserLoggedIn,
      cartItemCount
    },
  };
}
