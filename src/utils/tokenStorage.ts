export const storeTokens = async (accessToken: string, refreshToken: string): Promise<void> => {
  localStorage.setItem('accessToken', accessToken);
  localStorage.setItem('refreshToken', refreshToken);
};

export const getAccessToken = async (): Promise<string | null> => {
  return localStorage.getItem('accessToken');
};

export const getRefreshToken = async (): Promise<string | null> => {
  return localStorage.getItem('refreshToken');
};

export const clearTokens = async (): Promise<void> => {
  localStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');
};