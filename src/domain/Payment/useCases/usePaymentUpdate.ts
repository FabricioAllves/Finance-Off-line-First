import { paymentService } from "../paymentService";
import { Payment } from "../paymentTypes";

export function usePaymentUpdate() {
  async function updatePaymentDatabase(
    paymentDatabase: any,
    data: Payment
  ): Promise<Payment> {
    try {
      const response = await paymentDatabase.update({
        id: data.id,
        supplier: data.supplier,
        type: data.type,
        dueDate: data.dueDate,
        amount: data.amount,
        paymentMethod: data.paymentMethod,
        isSynced: data.isSynced,
        isDeleted: data.isDeleted ?? 0,
        idWeb: data.idWeb,
      });

      return response;
    } catch (error) {
      console.error("Erro ao criar pagamento - updatePaymentDatabase:", error);
      throw new Error("Não foi possível criar o pagamento.");
    }
  }

  async function updatePaymentIdWeb(
    id: number,
    data: Payment
  ): Promise<Payment> {
    try {
      const response = await paymentService.updatePaymentId(id, {
        supplier: data.supplier,
        type: data.type,
        dueDate: data.dueDate,
        amount: data.amount,
        paymentMethod: data.paymentMethod,
        isDeleted: data.isDeleted
      });

      return response;
    } catch (error) {
      console.error("Erro ao criar pagamento - updatePaymentIdWeb:", error);
      throw new Error("Não foi possível criar o pagamento.");
    }
  }

  return {
    updatePaymentIdWeb,
    updatePaymentDatabase
  };
}