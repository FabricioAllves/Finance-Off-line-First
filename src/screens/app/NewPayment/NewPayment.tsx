import React from "react";
import { View, ScrollView, Pressable } from "react-native";
import { Alert, Button, FormCurrencyInput, FormDateInput, FormSelect, Text } from "@components";
import { paymentMethodList, suppliersList, typePaymentsList } from "mockSelect";
import { MaterialIcons } from '@expo/vector-icons';
import { useNewPayment } from "@domain";
import { styles } from './styles';

export function NewPayment() {
  const {
    goBack,
    confirmDelete,
    formState,
    control,
    submitForm,
    isEditable,
    handleSubmit,
    setIsEditable,
    showDeleteAlert,
    setShowDeleteAlert,
    shouldShowEditModeButtons,
  } = useNewPayment();

  const buttonActions = {
    editMode: 
      <>
        <Button onPress={() => setShowDeleteAlert(true)} label="Deletar" backgroundColor="red_100" colorLabel="white" />
        <Button onPress={() => setIsEditable(true)} label="Editar" />
      </>,
    cancelMode: formState.isDirty && <Button onPress={() => goBack()} label="Cancelar" />,
    saveMode: <Button onPress={handleSubmit(submitForm)} label="Salvar" colorLabel="white" backgroundColor="green_50" />

  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Pressable onPress={() => goBack()}>
          <MaterialIcons name="arrow-back" size={24} color="black" />
        </Pressable>
        <Text size="s18">Novo Pagamento</Text>
        <Pressable>
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

      <Alert
        title="Excluir"
        message="Tem certeza que deseja excluir esse pagamento?"
        visible={showDeleteAlert}
        onClose={() => setShowDeleteAlert(false)}
        onConfirm={confirmDelete}
      />
    </View>
  );
}
