import { useCallback } from "react";
import { useNavigation, useFocusEffect } from "@react-navigation/native";

import { AppStackNavigatorRoutesProps } from "src/routes/app.stack.routes";
import { useAsync } from "../../Payment/useCases/useAsync";

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

  const contentKey = emptyPaymentList ? ContentKeyMap.EMPTY : ContentKeyMap.LIST;

  return { paymentList, contentKey, navigate };
}