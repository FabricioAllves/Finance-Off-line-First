import { Button, FormCurrencyInput, FormDateInput, FormSelect, Text } from "@components";
import { colorsTheme } from "@theme";
import { View, StyleSheet, ScrollView, Alert, Pressable, Platform } from "react-native";
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { NewPaymentSchema, newPaymentSchema } from "./newPaymentSchema";
import { useEffect, useState } from "react";
import { usePaymentCreate, usePaymentUpdate, Payment } from "@domain";
import { useDatabase } from "@database";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { AppStackNavigatorRoutesProps, RootStackParamList } from "src/routes/app.stack.routes";
import { paymentMethodList, suppliersList, typePaymentsList } from "mockSelect";
import { MaterialIcons } from '@expo/vector-icons';

export function NewPayment() {
  const { goBack } = useNavigation<AppStackNavigatorRoutesProps>();
  const route = useRoute<RouteProp<RootStackParamList, 'NewPayment'>>();
  const { isEdit, data } = route.params || {};
  const [isEditable, setIsEditable] = useState(!isEdit);
  const { updatePaymentDatabase } = usePaymentUpdate()
  const { createPayment } = usePaymentCreate()
  const paymentDatabase = useDatabase();

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

  useEffect(() => {
    if (data) {
      setValue("supplier", data.supplier);
      setValue("type", data.type);
      setValue("paymentMethod", data.paymentMethod);
      setValue("dueDate", data.dueDate ?? '');
      setValue("amount", data.amount);
    }
  }, [data, setValue]);

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

  const buttonActions = {
    editMode: data ? (
      <>
        <Button onPress={() => remove(data)} label="Deletar" backgroundColor="red_100" colorLabel="white" />
        <Button onPress={() => setIsEditable(true)} label="Editar" />
      </>
    ) : null,
    cancelMode: <Button onPress={() => goBack()} label="Cancelar" />,
    saveMode: (
      <Button onPress={handleSubmit(submitForm)} label="Salvar" colorLabel="white" backgroundColor="green_50" />
    ),
  };
  
  const shouldShowEditModeButtons = isEdit && !isEditable && data;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Pressable onPress={() => goBack()}>
          <MaterialIcons name="arrow-back" size={24} color="black" />
        </Pressable>
        <Text size="s18">Novo Pagamento</Text>
        <Pressable >
          <View style={{ width: 24 }} />
        </Pressable>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.form}>
          <FormSelect
            control={control}
            name="supplier"
            label="Fornecedor"
            placeholder="Selecione"
            options={suppliersList}
            disabled={!isEditable}
          />
          <FormSelect
            control={control}
            name="type"
            label="Tipo"
            placeholder="Selecione"
            options={typePaymentsList}
            disabled={!isEditable}
          />
          <FormSelect
            control={control}
            name="paymentMethod"
            label="Meio de pagamento"
            placeholder="Selecione"
            options={paymentMethodList}
            disabled={!isEditable}
          />
          <FormDateInput
            control={control}
            name="dueDate"
            label="Data de vencimento"
            placeholder="Escolha uma data"
            disabled={!isEditable}
          />
          <FormCurrencyInput
            control={control}
            name="amount"
            label="Valor"
            placeholder="Insira um valor"
            disabled={!isEditable}
          />
        </View>
      </ScrollView>
      <View style={styles.buttons}>
        {shouldShowEditModeButtons ? buttonActions.editMode : buttonActions.cancelMode}
        {isEditable && buttonActions.saveMode}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 30,
    paddingTop: 0,
    flex: 1,
    backgroundColor: colorsTheme.background
  },
  header: {
    height: 60,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: 10
  },
  form: {
    gap: 16,
    flex: 1,
    paddingBottom: 30
  },
  buttons: {
    gap: 16,
  },
});
