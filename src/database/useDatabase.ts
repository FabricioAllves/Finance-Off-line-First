import { useSQLiteContext } from "expo-sqlite";
export interface Payment {
  id: number;
  supplier: string;
  type: string;
  paymentMethod: string;
  dueDate: string | null;
  amount: number;
  isSynced: number;
  isDeleted: number;
  idWeb: number;
}

export function useDatabase() {
  const database = useSQLiteContext();

  async function create(data: Omit<Payment, "id">) {
    const statement = await database.prepareAsync(
      "INSERT INTO payment (supplier, type, dueDate, amount, paymentMethod, isSynced, isDeleted, idWeb) VALUES ($supplier, $type, $dueDate, $amount, $paymentMethod, $isSynced, $isDeleted, $idWeb )"
    );

    try {
      const result = await statement.executeAsync({
        $supplier: data.supplier,
        $type: data.type,
        $dueDate: data.dueDate,
        $amount: data.amount,
        $paymentMethod: data.paymentMethod,
        $isSynced: 0,
        $isDeleted: 0,
        $idWeb: data.idWeb,
      });

      const insertedRowId = result.lastInsertRowId.toLocaleString();

      return { insertedRowId };
    } catch (error) {
      throw error;
    } finally {
      await statement.finalizeAsync();
    }
  }

  async function getAll() {
    try {
      const query = "SELECT * FROM payment";
      const response = await database.getAllAsync<Payment>(query);

      return response;
    } catch (error) {
      throw error;
    }
  }

  async function update(data: Payment) {
    const statement = await database.prepareAsync(
      "UPDATE payment SET supplier = $supplier, type = $type, dueDate = $dueDate, amount = $amount, paymentMethod = $paymentMethod, isSynced = $isSynced, isDeleted = $isDeleted, supplier = $supplier, idWeb = $idWeb  WHERE id = $id"
    );

    try {
      await statement.executeAsync({
        $id: data.id,
        $supplier: data.supplier,
        $type: data.type,
        $dueDate: data.dueDate,
        $amount: data.amount,
        $paymentMethod: data.paymentMethod,
        $isSynced: data.isSynced,
        $isDeleted: data.isDeleted,
        $idWeb: data.idWeb,
      });
    } catch (error) {
      throw error;
    } finally {
      await statement.finalizeAsync();
    }
  }

  async function remove(id: number) {
    try {
      await database.execAsync("DELETE FROM payment WHERE id = " + id);
    } catch (error) {
      throw error;
    }
  }

  return {
    create,
    getAll,
    update,
    remove,
  };
}
