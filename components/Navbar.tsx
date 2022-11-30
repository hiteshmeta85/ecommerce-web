import Link from "next/link";

const Navbar = () => {
  return (
    <div className="container flex justify-end gap-4">
      <Link href="/" className="text-blue-600 underline">Home</Link>
      <Link href="/products" className="text-blue-600 underline">Products</Link>
      <Link href="/cart" className="text-blue-600 underline">Cart</Link>
      <Link href="/login" className="text-blue-600 underline">Login</Link>
    </div>
  );
};

export default Navbar;
