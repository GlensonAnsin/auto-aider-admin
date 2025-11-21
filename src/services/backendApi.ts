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

export const getUnAppShopInfo = async (shopID: number) => {
  try {
    const token = await getAccessToken();
    const res = await axios.get(`${apiURL}/auto_repair_shop/get-unapproved-shop-info/${shopID}`, {
      headers: {
        Authorization: `Bearer ${token}`
      },
    });
    return res.data;
  } catch (e) {
    console.error('Get Unapproved Shop Info Error:', e);
    return null;
  }
};

export const updateApprovalStatus = async (shopID: number, decision: string) => {
  try {
    const token = await getAccessToken();
    await axios.patch(`${apiURL}/auto_repair_shop/update-approval-status`,
      { shopID, decision },
      {
        headers: {
          Authorization: `Bearer ${token}`
        },
      },
    );
  } catch (e) {
    console.error('Update Approval Status Error:', e);
  }
};

export const getAllUsers = async () => {
  try {
    const res = await axios.get(`${apiURL}/user/get-all`);
    return res.data;
  } catch (e) {
    console.error('Get All Users Error:', e);
  }
};

export const getAllShopsForAdmin = async () => {
  try {
    const token = await getAccessToken();
    const res = await axios.get(`${apiURL}/auto_repair_shop/get-all-admin`, {
      headers: {
        Authorization: `Bearer ${token}`
      },
    });
    return res.data;
  } catch (e) {
    console.error('Get All Shops Error:', e);
  }
};

export const countAllCO = async () => {
  try {
    const token = await getAccessToken();
    const res = await axios.get(`${apiURL}/user/count-all-co`, {
      headers: {
        Authorization: `Bearer ${token}`
      },
    });
    return res.data;
  } catch (e) {
    console.error('Count All Users Error:', e);
  }
};

export const countAllRS = async () => {
  try {
    const token = await getAccessToken();
    const res = await axios.get(`${apiURL}/auto_repair_shop/count-all-rs`, {
      headers: {
        Authorization: `Bearer ${token}`
      },
    });
    return res.data;
  } catch (e) {
    console.error('Count All Shops Error:', e);
  }
};

export const countScansToday = async () => {
  try {
    const token = await getAccessToken();
    const res = await axios.get(`${apiURL}/vehicle_diagnostic/count-scans-today`, {
      headers: {
        Authorization: `Bearer ${token}`
      },
    });
    return res.data;
  } catch (e) {
    console.error('Count Scans Today Error:', e);
  }
};

export const newlyRegisteredCO = async () => {
  try {
    const token = await getAccessToken();
    const res = await axios.get(`${apiURL}/user/newly-registered-co`, {
      headers: {
        Authorization: `Bearer ${token}`
      },
    });
    return res.data;
  } catch (e) {
    console.error('Get Newly Registered CO Error:', e);
  }
};

export const newlyRegisteredRS = async () => {
  try {
    const token = await getAccessToken();
    const res = await axios.get(`${apiURL}/auto_repair_shop/newly-registered-rs`, {
      headers: {
        Authorization: `Bearer ${token}`
      },
    });
    return res.data;
  } catch (e) {
    console.error('Get Newly Registered RS Error:', e);
  }
};