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

const getSkinList = async (filter?: IFilterOptions) => {
  try {
    const endpoint = '/skins/search';
    const { data } = await api.post(endpoint, filter)

    if (data) {
      return data;
    }

    return new Error('Erro ao listar os registros.');
  } catch (e) {
    return new Error((e as { message: string }).message || 'Erro ao listar os registros.');
  }
};

export const SkinService = {
  getSkinList,
};
