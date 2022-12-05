import axios from "axios";

const getCartItemCount = async (token: { token: string }): Promise<{ isUserLoggedIn: boolean, cartItemCount: number }> => {

  if (!token) {
    return {isUserLoggedIn: false, cartItemCount: 0}
  }

  try {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_HOST}/cart-items/count`, {
      headers: {
        authorization: `Bearer ${token.token}`,
      }
    })
    if (response.status === 200) {
      return {isUserLoggedIn: true, cartItemCount: response.data.data}
    } else {
      return {isUserLoggedIn: false, cartItemCount: 0}
    }
  } catch (err) {
    return {isUserLoggedIn: false, cartItemCount: 0}
  }
}

export default getCartItemCount
