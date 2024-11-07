import { useEffect, useState } from "react";
import { Alert } from "react-native";
import { NewPaymentSchema, newPaymentSchema } from "../../../screens/app/NewPayment/index";
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { AppStackNavigatorRoutesProps, RootStackParamList } from "src/routes/app.stack.routes";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { Payment } from "../paymentTypes";
import { usePaymentUpdate } from "./usePaymentUpdate";
import { useDatabase } from "../../../database/useDatabase";
import { usePaymentCreate } from "./usePaymentCreate";
const { updatePaymentDatabase } = usePaymentUpdate();

export function useNewPayment() {
  const { goBack } = useNavigation<AppStackNavigatorRoutesProps>();
  const route = useRoute<RouteProp<RootStackParamList, 'NewPayment'>>();
  const { isEdit, data } = route.params || {};
  const paymentDatabase = useDatabase();
  const { createPayment } = usePaymentCreate()
  const [isEditable, setIsEditable] = useState(!isEdit);
  const { control, handleSubmit, setValue } = useForm<NewPaymentSchema>({
    resolver: zodResolver(newPaymentSchema),
    mode: 'onChange',
    defaultValues: {
      supplier: data?.supplier ?? '',
      type: data?.type ?? '',
      paymentMethod: data?.paymentMethod ?? '',
      dueDate: data?.dueDate ?? undefined,
      amount: data?.amount ?? 0
    }
  });

  const shouldShowEditModeButtons = isEdit && !isEditable && data;

  async function remove(item: Payment) {
    await updatePaymentDatabase(paymentDatabase, {
      ...item,
      isDeleted: 1,
      isSynced: 0,
    });
    goBack();
  }

  async function submitForm(formData: NewPaymentSchema) {
    try {
      if (isEdit) {
        await updatePaymentDatabase(paymentDatabase, {
          ...formData,
          id: data?.id,
          idWeb: data?.idWeb,
          isSynced: 0,
        });
      } else {
        await createPayment(paymentDatabase, {
          ...formData
        });
      }
      goBack();
    } catch (error) {
      console.log(error);
      Alert.alert("Erro", "Não foi possível salvar o pagamento.");
    }
  }

  useEffect(() => {
    if (data) {
      setValue("supplier", data.supplier);
      setValue("type", data.type);
      setValue("paymentMethod", data.paymentMethod);
      setValue("dueDate", data.dueDate ?? '');
      setValue("amount", data.amount);
    }
  }, [data, setValue]);

  return {
    submitForm,
    handleSubmit,
    control,
    goBack,
    remove,
    data,
    setIsEditable,
    isEditable,
    shouldShowEditModeButtons,
  }
}