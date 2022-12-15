import React from 'react';
import Layout from "./layout";
import {GetServerSideProps} from "next";
import getCartItemCount from "../lib/getCartItemCount";

const SuccessPage = ({isUserLoggedIn, cartItemCount}: { isUserLoggedIn: boolean, cartItemCount: number }) => {
  return (
    <Layout isUserLoggedIn={isUserLoggedIn} cartItemCount={cartItemCount}>
      <div className="container">
        <p>Order placed successfully</p>
      </div>
    </Layout>
  );
};

export default SuccessPage;

export const getServerSideProps: GetServerSideProps = async (context) => {

  const {isUserLoggedIn, cartItemCount} = await getCartItemCount({token: context.req.cookies['token'] || ""})

  return {
    props: {
      isUserLoggedIn,
      cartItemCount
    }
  }
}
