import Layout from "../components/Layout";
import {GetServerSideProps} from "next";
import getCartItemCount from "../lib/getCartItemCount";

export default function Home({isUserLoggedIn, cartItemCount}: { isUserLoggedIn: boolean, cartItemCount: number }) {
  return (
    <Layout pageTitle="Home" cartItemCount={cartItemCount} isUserLoggedIn={isUserLoggedIn}>
      <div className="container">
        Homepage
      </div>
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {

  const {isUserLoggedIn, cartItemCount} = await getCartItemCount({token: context.req.cookies['token'] || ""})

  return {
    props: {
      isUserLoggedIn,
      cartItemCount
    },
  };
}
