import { useCallback, useEffect, useState } from "react";
import { listPayments } from "./usePaymentList";
import { Payment } from "../paymentTypes";
import { useDatabase } from "@database";
import { Alert } from "react-native";
import NetInfo from "@react-native-community/netinfo";
import { usePaymentUpdate } from "./usePaymentUpdate";
import { usePaymentCreate } from "./usePaymentCreate";
import { usePaymentRemove } from "./usePaymentRemove";


export function useAsync() {
  const [paymentList, setPaymentList] = useState<Payment[]>([]);
  const [isSyncing, setIsSyncing] = useState(false);
  const paymentDatabase = useDatabase();
  const { create } = usePaymentCreate();
  const { removePaymentDatabase } = usePaymentRemove();
  const { updatePaymentDatabase, updatePaymentIdWeb } = usePaymentUpdate();
  const hasUnsyncedOrDeletedPayments = !isSyncing && paymentList.some(p => p.isSynced === 0 || p.isDeleted === 1);

  const listGetAll = useCallback(async () => {
    try {
      const response = await listPayments(paymentDatabase);
      setPaymentList(response);
    } catch (error) {
      Alert.alert("Erro", "Não foi possível carregar os pagamentos.");
    }
  }, [paymentDatabase]);

  const syncPayments = useCallback(async () => {
    const state = await NetInfo.fetch();
    if (!state.isConnected) {
      Alert.alert("Sem conexão", "Conecte-se à internet para sincronizar os pagamentos.");
      return;
    }

    if (isSyncing) return;
    setIsSyncing(true);

    try {
      await Promise.all(
        paymentList.map(async (payment) => {
          if (payment.idWeb && payment.isSynced === 0 && payment.isDeleted === 0) {
            await updatePaymentIdWeb(payment.idWeb, {
              ...payment
            });
            await updatePaymentDatabase(paymentDatabase, { ...payment, isSynced: 1 });
          } else if (payment.isDeleted === 1) {
            if (payment.idWeb) {
              await updatePaymentIdWeb(payment.idWeb, { ...payment, isDeleted: 1 });
            }
            await removePaymentDatabase(paymentDatabase, payment.id ?? 0);
          } else if (!payment.idWeb && payment.isSynced === 0) {
            const response = await create({
              ...payment
            });

            await updatePaymentDatabase(paymentDatabase, {
              ...payment,
              idWeb: response.id,
              isSynced: 1,
            });
          }
        })
      );
    } catch (error) {
      Alert.alert("Erro ao sincronizar alguns pagamentos.");
    }

    await listGetAll();
    setIsSyncing(false);
  }, [paymentList, paymentDatabase, isSyncing, listGetAll]);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      if (state.isConnected && hasUnsyncedOrDeletedPayments) {
        syncPayments();
      }
    });

    return () => unsubscribe();
  }, [isSyncing, paymentList, syncPayments]);

  return {
    paymentList,
    syncPayments,
    listGetAll
  };
}
