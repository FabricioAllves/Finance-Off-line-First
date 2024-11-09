import { TouchableOpacity, TouchableOpacityProps, StyleSheet } from "react-native";
import { Text } from "../Text/Text";
import { colorsTheme } from "@theme";

interface ButtonProps extends TouchableOpacityProps {
  onPress: () => void;
  label: string;
  colorLabel?: keyof typeof colorsTheme;
  backgroundColor?: keyof typeof colorsTheme;
}

export function Button({
  label,
  colorLabel = 'gray_300',
  backgroundColor = 'yellow_100',
  disabled,
  ...rest
}: ButtonProps) {
  return (
    <TouchableOpacity
      style={[
        styles.container,
        {
          backgroundColor: disabled ? colorsTheme.green_25 : colorsTheme[backgroundColor],
        },
      ]}
      activeOpacity={0.8}
      disabled={disabled}
      {...rest}
    >
      <Text
        fontWeight="bold"
        color={disabled ? 'gray_300' : colorLabel}
        size="s18"
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 16,
    minWidth: 100,        
    maxHeight: 60,         
    height: 60,           
    alignItems: 'center', 
    justifyContent: 'center',
    borderRadius: 10,
  },
});
