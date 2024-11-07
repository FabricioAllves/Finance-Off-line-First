import { Payment } from "@domain";
import {paymentService} from '../paymentService'

export function usePaymentCreate() {
  async function createPayment(paymentDatabase: any, data: Payment): Promise<Payment> {
    try {
      const response = await paymentDatabase.create({
        supplier: data.supplier,
        type: data.type,
        dueDate: data.dueDate,
        amount: data.amount,
        paymentMethod: data.paymentMethod,
      });
  
      return response;
    } catch (error) {
      console.error("Erro ao criar pagamento - createPayment:", error);
      throw new Error("Não foi possível criar o pagamento.");
    }
  }

  async function create(data: Payment): Promise<Payment> {
    try {
      const response = await paymentService.create({
        supplier: data.supplier,
        type: data.type,
        dueDate: data.dueDate,
        amount: data.amount,
        paymentMethod: data.paymentMethod,
      });
  
      return response;
    } catch (error) {
      console.error("Erro ao criar pagamento - create:", error);
      throw new Error("Não foi possível criar o pagamento.");
    }
  }

  return {
    createPayment,
    create
  }
}