import React, { useState } from 'react';
import { View, TouchableOpacity, StyleSheet, TextInput, Modal, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { AntDesign } from '@expo/vector-icons';
import { colorsTheme } from '@theme';
import { Text } from '../Text/Text';

export interface DateProps {
  label: string;
  placeholder?: string;
  value?: Date | string | null;
  onChange?: (date: Date | null) => void;
  errorMessage?: string;
  disabled?: boolean;
}

export function DateInput({ label, placeholder = "Selecionar data", value, onChange, errorMessage, disabled = false }: DateProps) {
  const [isOpenPicker, setIsOpenPicker] = useState(false);

  const handleDateChange = (event: any, date?: Date) => {
    if (event.type === "set" && date) {
      onChange?.(date);
    }
    setIsOpenPicker(false);
  };

  const openDatePicker = () => {
    if (!disabled) {
      if (Platform.OS === 'android') {
        setIsOpenPicker(true);
      } else {
        setIsOpenPicker(true);
      }
    }
  };

  const dateValue = typeof value === 'string' ? new Date(value) : value;
  const formattedDate = dateValue ? dateValue.toLocaleDateString("pt-BR") : "";

  return (
    <View style={styles.container}>
      <Text fontWeight="regular" style={styles.title}>{label}</Text>
      <TouchableOpacity
        style={[styles.containerInput, disabled && styles.disabledContainer]}
        activeOpacity={disabled ? 1 : 0.5}
        onPress={openDatePicker}
      >
        <TextInput
          style={[styles.input, disabled && styles.disabledInput]}
          placeholder={placeholder}
          placeholderTextColor="#CDCDCD"
          value={formattedDate}
          editable={false}
          pointerEvents="none"
        />
        <AntDesign name={"calendar"} size={20} color={disabled ? "#E0E0E0" : "#CDCDCD"} />
      </TouchableOpacity>

      {errorMessage && (
        <Text color="red_100" style={styles.errorText}>
          {errorMessage}
        </Text>
      )}

      {Platform.OS === 'ios' ? (
        <Modal
          transparent={true}
          visible={isOpenPicker}
          animationType="slide"
          onRequestClose={() => setIsOpenPicker(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <DateTimePicker
                value={dateValue || new Date()}
                mode="date"
                display="inline"
                onChange={handleDateChange}
                style={{ width: '100%' }}
              />
            </View>
          </View>
        </Modal>
      ) : (
        isOpenPicker && (
          <DateTimePicker
            value={dateValue || new Date()}
            mode="date"
            display="calendar"
            onChange={handleDateChange}
          />
        )
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
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    width: "90%",
    backgroundColor: "white",
    borderRadius: 8,
    padding: 16,
    alignItems: "center",
  },
  errorText: {
    color: "red",
    fontSize: 12,
    marginTop: 4,
  },
});
