import { api } from '../axios/api';

const addSkinToCart = async (skinId: string) => {
  try {
    const endpoint = `/order/add/${skinId}`;
    const { data } = await api.get(endpoint);
    return data;
  } catch (error: any) {
    console.log(error);
    const message = error.response.data.message as string;
    return new Error(message || 'Erro ao adicionar skin ao carrinho.');
  }
};

const removeSkinFromCart = (skinId: string) => {};

const getCart = async () => {
  try {
    const endpoint = '/order/get';
    const { data } = await api.get(endpoint);
    return data;
  } catch (error: any) {
    console.log(error);
    const message = error.response.data.message as string;
    return new Error(message || 'Erro ao obter carrinho.');
  }
};

const createOrder = async () => {
  try {
    const endpoint = '/order';
    const { data } = await api.post(endpoint, {
      paymentType: 'Credit',
    });
  } catch (error: any) {
    console.log(error);
    const message = error.response.data.message as string;
    return new Error(message || 'Erro ao criar pedido.');
  }
};

export const OrderService = {
  addSkinToCart,
  removeSkinFromCart,
  getCart,
  createOrder,
};
