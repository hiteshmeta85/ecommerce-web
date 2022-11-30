import {FormEvent, useState} from "react";
import Layout from "../components/Layout";
import TextInput from "../components/TextInput";

export default function Login() {
  const [username, setUsername] = useState<string>('')
  const [password, setPassword] = useState<string>('')

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault()
    console.log([username, password])
  }

  return (
    <Layout pageTitle="Login">
      <div className="container">
        <form onSubmit={handleSubmit}>
          <TextInput
            label={'Username'}
            setState={setUsername}
            value={username}
            placeholder={'hitesh'}
            isRequired={true}
          />
          <TextInput
            label={'Password'}
            value={password}
            setState={setPassword}
            placeholder={'Password'}
            isRequired={true}
          />
          <button type={"submit"}>Submit</button>
        </form>
      </div>
    </Layout>
  );
};
