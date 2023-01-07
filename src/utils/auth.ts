export interface IAuthData {
  user?: IUserData;
  token?: string;
}

export interface IUserData {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: {
    id: number;
    name: string;
  };
  updatedAt: string;
  createdAt: string;
}

export const getAuthUserData = () => {
  const data = sessionStorage.getItem(import.meta.env.VITE_WEB_STORAGE_ID);
  const authData: IAuthData = JSON.parse(data || '{}');

  return authData.user;
};

export const getAuthToken = () => {
  const data = sessionStorage.getItem(import.meta.env.VITE_WEB_STORAGE_ID);
  const authData: IAuthData = JSON.parse(data || '{}');

  return authData.token;
};

export const setLoginData = (token: string, user: IUserData) => {
  const authData: IAuthData = {
    user,
    token,
  };

  sessionStorage.setItem(import.meta.env.VITE_WEB_STORAGE_ID, JSON.stringify(authData));
};

export const logout = () => {
  sessionStorage.removeItem(import.meta.env.VITE_WEB_STORAGE_ID);
  document.location.href = '/auth/login';
}