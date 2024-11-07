import React, { useState } from 'react';
import { Modal, ScrollView, StyleSheet, TextInput, TextInputProps, TouchableOpacity, View } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { colorsTheme } from "@theme";
import { Text } from '../Text/Text';

export interface SelectProps extends TextInputProps {
  label: string;
  placeholder?: string;
  errorMessage?: string;
  options: Array<{ label: string; value: string }>;
  onSelect: (value: string) => void;
  disabled?: boolean;
}

export function Select({ label, placeholder = "Selecionar", errorMessage, options, onSelect, disabled = false, ...restInput }: SelectProps) {
  const [isOpenSelect, setIsOpenSelect] = useState<boolean>(false);
  const [selectedOption, setSelectedOption] = useState<string>("");

  function handleOpenSelect() {
    if (!disabled) {
      setIsOpenSelect(true);
    }
  }

  function handleCloseSelect() {
    setIsOpenSelect(false);
  }

  function handleSelectOption(option: { label: string; value: string }) {
    setSelectedOption(option.label);
    onSelect(option.value);
    handleCloseSelect();
  }

  return (
    <View style={styles.container}>
      <Text fontWeight="regular" style={styles.title}>{label}</Text>
      <TouchableOpacity
        style={[styles.containerInput, disabled && styles.disabledContainer]}
        activeOpacity={disabled ? 1 : 0.5}
        onPress={handleOpenSelect}
      >
        <TextInput
          style={[styles.input, disabled && styles.disabledInput]}
          placeholder={placeholder}
          placeholderTextColor="#CDCDCD"
          value={selectedOption}
          editable={false}
          pointerEvents="none"
          {...restInput}
        />
        <AntDesign name={"caretdown"} size={20} color={disabled ? "#E0E0E0" : "#CDCDCD"} />
      </TouchableOpacity>

      {errorMessage && (
        <Text color="red_100">
          {errorMessage}
        </Text>
      )}

      <Modal
        visible={isOpenSelect}
        transparent={true}
        animationType="slide"
        onRequestClose={handleCloseSelect}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text fontWeight="bold" style={styles.modalTitle}>{label}</Text>
            <ScrollView contentContainerStyle={styles.scrollContent}>
              {options.map((option) => (
                <TouchableOpacity key={option.value} onPress={() => handleSelectOption(option)}>
                  <Text style={styles.optionText}>{option.label}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </View>
      </Modal>
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
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    width: "80%",
    backgroundColor: "white",
    padding: 20,
    borderRadius: 8,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 18,
    marginBottom: 16,
  },
  scrollContent: {
    alignItems: "flex-start",
    width: "100%",
  },
  optionText: {
    paddingVertical: 10,
    fontSize: 16,
  },
});
