import axios from "axios";
import api from "./interceptor";
import { storeTokens } from "../utils/tokenStorage";
import { getAccessToken } from "../utils/tokenStorage";

const apiURL = import.meta.env.VITE_BACKEND_API_URL;

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

export const getAdminInfo = async () => {
  try {
    const token = await getAccessToken();
    const res = await axios.get(`${apiURL}/user/get-admin-info`, {
      headers: {
        Authorization: `Bearer ${token}`
      },
    });
    return res.data;
  } catch (e) {
    console.error('Get Admin Info Error:', e);
    return null;
  }
};

export const getAllUnAppShops = async () => {
  try {
    const token = await getAccessToken();
    const res = await axios.get(`${apiURL}/auto_repair_shop/get-all-unapproved-shops`, {
      headers: {
        Authorization: `Bearer ${token}`
      },
    });
    return res.data;
  } catch (e) {
    console.error('Get Unapproved Shops Error:', e);
    return null;
  }
};