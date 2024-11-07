import { useCallback } from "react";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { ListRenderItemInfo } from "react-native";

import { AppStackNavigatorRoutesProps } from "src/routes/app.stack.routes";
import {PaymentCard}  from '@components'
import { useAsync } from "../../Payment/useCases/useAsync";
import { Payment } from "../../Payment/paymentTypes";

enum ContentKeyMap {
  LIST = "list",
  EMPTY = "empty"
}

export function useListPayments() {
  const { paymentList, listGetAll } = useAsync();
  const { navigate } = useNavigation<AppStackNavigatorRoutesProps>();
  const emptyPaymentList = paymentList.length === 0

  useFocusEffect(
    useCallback(() => {
      listGetAll();
    }, [])
  );

  function renderItem({ item }: ListRenderItemInfo<Payment>) {
    return (
      <PaymentCard
        payment={item}
        onPress={() => navigate("NewPayment", { isEdit: true, data: item })}
      />
    );
  }

  const contentKey = emptyPaymentList ? ContentKeyMap.EMPTY : ContentKeyMap.LIST;

  return { paymentList, renderItem, contentKey, navigate };
}