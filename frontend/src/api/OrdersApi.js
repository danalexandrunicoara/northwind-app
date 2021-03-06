import RestHelper from './RestHelper';

export const saveOrder = (orderId, data) => RestHelper.put(`/orders/${orderId}`, data);
export const getOrders = () => RestHelper.get(`/orders`);