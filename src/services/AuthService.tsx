import axios from "axios";
import { LOGIN_URL } from "../url";

const login = async <T = any>(
  data: T,
  token?: string
): Promise<any> => {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const response = await axios.post(LOGIN_URL, data, { headers });

  return response.data;
};





export {login}