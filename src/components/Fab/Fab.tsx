import React from 'react';
import { Pressable, PressableProps, StyleSheet, View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { colorsTheme } from '@theme';

interface ButtonProps extends PressableProps {
  onPress: () => void;
}

export function Fab({ onPress }: ButtonProps) {
  return (
    <View style={styles.container}>
      <Pressable onPress={onPress} style={({ pressed }) => [styles.fab, pressed && styles.pressed]}>
        <MaterialIcons name="add" size={24} color="white" />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 25,
    right: 25,
  },
  fab: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: colorsTheme.yellow_100,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
  },
  pressed: {
    backgroundColor: colorsTheme.yellow_50
  },
});
