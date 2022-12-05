import {FormEvent, useState} from "react";
import Layout from "../../components/Layout";
import Input from "../../components/Input";
import {useRouter} from "next/router";
import axios from "axios";
import {setCookie} from "nookies";

export default function Login() {
  const router = useRouter()
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault()
    try {
      await axios.post(`http://localhost:3333/login`, {email, password})
        .then(function (response) {
          if (response.data) {
            setCookie(null, 'token', `${response.data.token}`, {
              maxAge: 30 * 24 * 60 * 60,
              path: '/',
            })
            router.push('/')
          }
        })
        .catch(function (error) {
          console.log(error)
        })
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <Layout pageTitle="Login">
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
