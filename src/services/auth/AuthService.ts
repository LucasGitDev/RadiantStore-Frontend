import { logout, setLoginData } from '../../utils/auth';
import { api } from '../axios/api';

interface IRegisterData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

const loginUser = async (email: string, password: string) => {
  const endpoint = '/auth/email/login/';
  const { data } = await api.post(endpoint, { email, password });
  return data;
};

const loginAdmin = async (email: string, password: string) => {
  const endpoint = '/auth/admin/email/login/';
  const { data } = await api.post(endpoint, { email, password });
  return data;
};

const login = async (email: string, password: string): Promise<string | undefined> => {
  try {
    const user = await loginUser(email, password);
    setLoginData(user.token, user.user);
  } catch (e) {
    console.log(e);
    try {
      const user = await loginAdmin(email, password);
      setLoginData(user.token, user.user);
    } catch (e) {
      logout();
      return 'Erro ao fazer login.';
    }
  }
};

const register = async (registerData: IRegisterData) => {
  try {
    const endpoint = '/auth/email/register/';
    const { data } = await api.post(endpoint, registerData);
    return data;
  } catch (err: any) {
    return err.response.data.errors.email;
  }
};

export const AuthService = {
  login,
  register,
};
