export interface AuthData {
  user?: UserData;
  token?: string;
}

export interface UserData {
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
  const authData: AuthData = JSON.parse(data || '{}');

  return authData.user;
};

export const getAuthToken = () => {
  const data = sessionStorage.getItem(import.meta.env.VITE_WEB_STORAGE_ID);
  const authData: AuthData = JSON.parse(data || '{}');

  return authData.token;
};

export const setUserData = (data: UserData) => {
  const authData: AuthData = {
    user: data,
    token: getAuthToken(),
  };

  sessionStorage.setItem(import.meta.env.VITE_WEB_STORAGE_ID, JSON.stringify(authData));
};
