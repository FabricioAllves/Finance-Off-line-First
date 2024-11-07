export function usePaymentRemove() {
  async function removePaymentDatabase(
    paymentDatabase: any,
    id: number
  ): Promise<void> {
    try {
      await paymentDatabase.remove(id)
    } catch (error) {
      console.error("Erro ao remover pagamento - usePaymentRemove:", error);
      throw new Error("Não foi possível pagamento o pagamento.");
    }
  }

  return {
    removePaymentDatabase
  };
}
