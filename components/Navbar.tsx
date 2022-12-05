import Link from "next/link";
import {destroyCookie, parseCookies} from "nookies";
import axios from "axios";
import {useRouter} from "next/router";

const Navbar = ({isUserLoggedIn, cartItemCount}: { isUserLoggedIn: boolean, cartItemCount: number }) => {
  const cookies = parseCookies()
  const router = useRouter()

  const handleLogout = async () => {
    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_HOST}/auth/logout`, "", {
        headers: {
          authorization: `Bearer ${cookies['token']}`
        }
      })
      if (response) {
        destroyCookie(null, 'token')
        router.push('/')
      }
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div className="container flex justify-end gap-4">
      <Link href="/" className="text-blue-600 underline">Home</Link>
      <Link href="/products" className="text-blue-600 underline">Products</Link>
      <div className="flex gap-0.5">
        <Link href="/cart" className="text-blue-600 underline">Cart</Link>
        <p>({cartItemCount})</p>
      </div>
      {isUserLoggedIn ?
        <button onClick={handleLogout} className="text-blue-600 underline">Logout</button>
        : <Link href="/auth/login" className="text-blue-600 underline">Login</Link>}
    </div>
  );
};

export default Navbar;
