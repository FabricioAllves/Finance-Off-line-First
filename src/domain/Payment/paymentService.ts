import { paymentApi } from "./paymentApi";
import { Payment } from "./paymentTypes";

async function create(data: Payment): Promise<Payment> {
  const newPaymentAPI = await paymentApi.create(data);
  return newPaymentAPI;
}

async function updatePaymentId(id: number, data: Payment): Promise<Payment> {
  const updatePaymentIdAPI = await paymentApi.updatePaymentById(id, data);
  return updatePaymentIdAPI;
}

export const paymentService = {
  updatePaymentId,
  create,
};
