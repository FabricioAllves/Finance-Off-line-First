import { colorsTheme } from "@theme";
import { Text as RNText, TextProps as RNTextProps } from "react-native";

interface TextProps extends RNTextProps {
  fontWeight?: 'regular' | 'bold' | 'medium';
  size?: keyof typeof sizes;
  color?: keyof typeof colorsTheme;
}

const font = {
  regular: "Inter_400Regular",
  medium: "Inter_500Medium",
  bold: "Inter_700Bold",
};

const sizes = {
  s10: 10,
  s12: 12,
  s15: 15,
  s18: 18,
  s24: 24,
};

export function Text({ fontWeight = 'regular', size = 's15', color = 'black', style, ...restProps }: TextProps) {
  return (
    <RNText
      {...restProps}
      style={[
        style,
        {
          fontFamily: font[fontWeight],
          fontSize: sizes[size],
          color: colorsTheme[color]
        }
      ]}
    />
  );
}
