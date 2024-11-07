import { Payment } from "@domain";

export async function listPayments(paymentDatabase: any): Promise<Payment[]> {
  try {
    const response = await paymentDatabase.getAll();
    return response;
  } catch (error) {
    console.error("Erro ao listar pagamentos:", error);
    throw new Error("Não foi possível listar os pagamentos.");
  }
}