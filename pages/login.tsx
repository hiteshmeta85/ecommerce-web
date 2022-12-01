import {FormEvent, useState} from "react";
import Layout from "../components/Layout";
import Input from "../components/Input";
import {useRouter} from "next/router";

export default function Login() {
  const router = useRouter()
  const [username, setUsername] = useState<string>('')
  const [password, setPassword] = useState<string>('')

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault()
    console.log([username, password])
    router.push('/')
  }

  return (
    <Layout pageTitle="Login">
      <div className="container">
        <form onSubmit={handleSubmit} className="flex flex-col max-w-sm mx-auto lg:py-20">
          <Input
            type={'text'}
            label={'Username'}
            setState={setUsername}
            value={username}
            placeholder={'hiteshmeta'}
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
