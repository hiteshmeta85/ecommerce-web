import {FormEvent, useState} from "react";
import Layout from "../layout";
import Input from "../../components/Input";
import {useRouter} from "next/router";
import axios from "axios";
import {setCookie} from "nookies";
import {GetServerSideProps} from "next";
import getCartItemCount from "../../lib/getCartItemCount";

export default function Login({isUserLoggedIn, cartItemCount}: { isUserLoggedIn: boolean, cartItemCount: number }) {
  const router = useRouter()
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault()
    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_HOST}/auth/login`, {email, password})
      if (response) {
        setCookie(null, 'token', `${response.data.token}`, {
          maxAge: 30 * 24 * 60 * 60,
          path: '/',
        })
        router.push('/')
      }
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <Layout pageTitle="Login" isUserLoggedIn={isUserLoggedIn} cartItemCount={cartItemCount}>
      <div className="container">
        <form onSubmit={handleSubmit} className="flex flex-col max-w-sm mx-auto lg:py-20">
          <Input
            type={'email'}
            label={'Email'}
            setState={setEmail}
            value={email}
            placeholder={'johndoe@gmail.com'}
            isRequired={true}
          />
          <Input
            type={'password'}
            label={'Password'}
            value={password}
            setState={setPassword}
            placeholder={'********'}
            isRequired={true}
          />
          <button
            type={"submit"}
            className="rounded bg-blue-600 text-white px-2 py-1 w-20 text-center mt-4"
          >
            Submit
          </button>
        </form>
      </div>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {

  const {isUserLoggedIn, cartItemCount} = await getCartItemCount({token: context.req.cookies['token'] || ""})

  return {
    props: {
      isUserLoggedIn,
      cartItemCount
    }
  }
}
