import { api } from "@api";
import { Payment } from "./paymentTypes";

async function create(data: Payment): Promise<Payment> {
  const response = await api.post<Payment[]>("/allPayments", data);
  return response.data[0];
}

async function updatePaymentById(id: number, data: Payment): Promise<Payment> {
  const response = await api.patch<Payment[]>(`/allPayments?id=eq.${id}`, data);
  return response.data[0];
}

export const paymentApi = {
  updatePaymentById,
  create,
};
