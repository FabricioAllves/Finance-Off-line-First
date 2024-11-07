import React, { useEffect, useState } from 'react';
import { StyleSheet, TextInput, TouchableOpacity, View } from "react-native";
import { Feather } from "@expo/vector-icons";
import { colorsTheme } from "@theme";
import { Text } from '../Text/Text';

export interface CurrencyInputProps {
  label: string;
  placeholder?: string;
  value?: number;
  onChange?: (value: number) => void;
  errorMessage?: string;
  disabled?: boolean;
}

export function CurrencyInput({
  label,
  placeholder = "Digite o valor",
  errorMessage,
  value,
  onChange,
  disabled = false,
  ...restInput
}: CurrencyInputProps) {
  const [formattedValue, setFormattedValue] = useState<string>("");

  useEffect(() => {
    if (value !== undefined) {
      setFormattedValue(formatCurrency(value));
    }
  }, [value]);

  const handleValueChange = (text: string) => {
    if (disabled) return;

    const numericValue = text.replace(/[^0-9]/g, "");
    const numberValue = parseFloat(numericValue) / 100;
    setFormattedValue(formatCurrency(numberValue));
    onChange?.(numberValue);
  };

  const formatCurrency = (amount: number) => {
    return amount.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  };

  return (
    <View style={styles.container}>
      <Text fontWeight="regular" style={styles.title}>{label}</Text>
      <TouchableOpacity style={[styles.containerInput, disabled && styles.disabledContainer]} activeOpacity={1}>
        <TextInput
          style={[styles.input, disabled && styles.disabledInput]}
          placeholder={placeholder}
          placeholderTextColor="#CDCDCD"
          value={formattedValue}
          keyboardType="numeric"
          onChangeText={handleValueChange}
          editable={!disabled}
          {...restInput}
        />
        <Feather name={"dollar-sign"} size={20} color={disabled ? "#E0E0E0" : "#CDCDCD"} />
      </TouchableOpacity>

      {errorMessage && (
        <Text color="red_100">
          {errorMessage}
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 8,
  },
  title: {
    fontWeight: "600",
    fontSize: 16,
  },
  containerInput: {
    flexDirection: "row",
    width: "100%",
    height: 60,
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "#E6E6E6",
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: "center",
  },
  disabledContainer: {
    backgroundColor: "#F0F0F0",
    borderColor: "#E0E0E0",
  },
  input: {
    flex: 1,
    color: colorsTheme.black,
  },
  disabledInput: {
    color: "#A0A0A0",
  },
});
