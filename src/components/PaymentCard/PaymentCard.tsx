import React from "react";
import { Payment } from "@domain";
import { View, StyleSheet, TouchableOpacityProps, TouchableOpacity } from "react-native";
import { Text } from "../Text/Text";
import { colorsTheme } from "@theme";

interface Props extends TouchableOpacityProps {
  payment: Payment;
}

const formatDate = (dateString: string) => {
  const options = { day: "2-digit", month: "2-digit", year: "numeric" } as const;
  return new Date(dateString).toLocaleDateString("pt-BR", options);
};

const formatCurrency = (amount: number) => {
  return amount.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
};

export function PaymentCard({ payment, ...rest }: Props) {
  return (
    <TouchableOpacity style={styles.container} {...rest}>
      <View style={styles.wrapperRow}>
        <View style={styles.infoText}>
          <Text fontWeight="regular" size="s12" color="gray_200">Fornecedor</Text>
          <Text fontWeight="regular" size="s15">{payment.supplier}</Text>
        </View>
        <View style={styles.status}>
          <Text fontWeight="regular" size="s12" color="gray_200">
            {payment.isSynced === 1 ? 'Sincronizado' : 'Não sincronizado'}
            {payment.isDeleted === 1 ? ' - Deletado' : ''}
          </Text>
        </View>
      </View>
      <View style={styles.infoText}>
        <Text fontWeight="regular" size="s12" color="gray_200">Tipo</Text>
        <Text fontWeight="regular" size="s15">{payment.type}</Text>
      </View>

      <View style={styles.wrapperRow}>
        <View style={styles.infoText}>
          <Text fontWeight="regular" size="s12" color="gray_200">Data vencimento</Text>
          <Text fontWeight="regular" size="s15"> {payment.dueDate ? formatDate(payment.dueDate) : ""}</Text>
        </View>
        <View style={styles.infoText}>
          <Text fontWeight="regular" size="s12" color="gray_200">Valor</Text>
          <Text fontWeight="regular" size="s15">{formatCurrency(payment.amount)}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 12,
    backgroundColor: colorsTheme.white,
    borderRadius: 8,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  wrapperRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  infoText: {
    flex: 1,
    marginBottom: 11,
  },
  status: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10
  },
});
