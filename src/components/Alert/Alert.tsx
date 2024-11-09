import React, { useState, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { Button } from "../Button/Button";
import { Text } from "../Text/Text";

interface AlertProps {
  title?: string;
  message?: string;
  onConfirm: () => void;
  onClose?: () => void;
  visible?: boolean;
}

export const Alert: React.FC<AlertProps> = ({ title, message, onConfirm, onClose, visible = false }) => {
  const [isVisible, setIsVisible] = useState(visible);

  useEffect(() => {
    setIsVisible(visible);
  }, [visible]);

  const handleClose = () => {
    setIsVisible(false);
    if (onClose) onClose();
  };

  const handleConfirm = () => {
    if (onConfirm) onConfirm();
    handleClose();
  };

  if (!isVisible) return null;

  return (
    <View style={styles.overlay}>
      <View style={styles.alertBox}>
        <Text fontWeight="bold" size="s18" style={styles.title}>{title}</Text>
        <Text style={styles.message}>{message}</Text>
        <View style={styles.buttonContainer}>
          <Button onPress={handleClose} label="Não" colorLabel="white" backgroundColor="green_50" />
          <Button onPress={handleConfirm} label="Excluir" backgroundColor="red_100" colorLabel="white" />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  alertBox: {
    width: '80%',
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    color: '#252525',
    marginBottom: 20,
    textAlign: 'center',
  },
  message: {
    fontSize: 18,
    color: '#333',
    marginBottom: 20,
    textAlign: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 10,
  },
});
