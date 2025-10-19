import axios from "axios";
import api from "./interceptor";
import { storeTokens } from "../utils/tokenStorage";

export const loginAdmin = async (username: string, password: string): Promise<string | null> => {
  try {
    const res = await api.post('user/login-admin', { username, password });
    const { accessToken, refreshToken } = res.data;
    await storeTokens(accessToken, refreshToken);
    return null;
  } catch (e: unknown) {
    if (axios.isAxiosError(e) && e.response?.status === 401) {
      return '401';
    } else {
      console.error('Login Error:', e);
      return null;
    }
  }
};