import axios from "axios";

const validateToken = async (token: { token: string }): Promise<boolean> => {

  if (!token) {
    return false
  }
  try {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_HOST}/auth/validate`, {
      headers: {
        authorization: `Bearer ${token.token}`,
      }
    })
    return response.status === 200;
  } catch (err) {
    return false
  }
}

export default validateToken
