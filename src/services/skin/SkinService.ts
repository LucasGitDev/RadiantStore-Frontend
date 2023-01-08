import { getAuthToken } from '../../utils/auth';
import { api } from '../axios/api';

interface IFilterOptions {
  name?: string;
  gun?: string;
  rarity?: string;
  price?: number;
  available?: boolean;
  order?: string;
}

interface IPaginationOptions {
  page?: number;
  limit?: number;
}

const createSkin = async (skin: any) => {
  try {
    const endpoint = '/skins';
    const { data } = await api.post(endpoint, skin);
    return data;
  } catch (e) {
    return new Error((e as { message: string }).message || 'Erro ao criar o registro.');
  }
};

const getSkinList = async (filter?: IFilterOptions) => {
  try {
    const hasLoggedIn = getAuthToken();
    const endpoint = `/skins/search${hasLoggedIn ? '' : '/not-logged-in'}`;
    const { data } = await api.post(endpoint, filter);

    if (data) {
      return data;
    }

    return new Error('Erro ao listar os registros.');
  } catch (e) {
    return new Error((e as { message: string }).message || 'Erro ao listar os registros.');
  }
};

const deleteSkin = async (id: string) => {
  try {
    const { data } = await api.delete(`/skins/${id}`);

    if (data) {
      return data;
    }

    return new Error('Erro ao deletar o registro.');
  } catch (e) {
    return new Error((e as { message: string }).message || 'Erro ao deletar o registro.');
  }
};

export const SkinService = {
  getSkinList,
  deleteSkin,
  createSkin,
};
