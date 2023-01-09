import { api } from '../axios/api';

const addSkinToCart = async (skinId: string) => {
  try {
    const endpoint = `/order/add/${skinId}`;
    console.log(endpoint);
    const { data } = await api.get(endpoint);
    return data;
  } catch (error: any) {
    console.log(error);
    const message = error.response.data.message as string;
    return new Error(message || 'Erro ao adicionar skin ao carrinho.');
  }
};

const removeSkinFromCart = (skinId: string) => {};

const getCart = () => {};

const createOrder = () => {};

export const OrderService = {
  addSkinToCart,
  removeSkinFromCart,
  getCart,
  createOrder,
};
