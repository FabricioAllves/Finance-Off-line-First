import { View, StyleSheet } from "react-native";
import { Text } from "../Text/Text";
import { colorsTheme } from "@theme";

type TextProps = {
  title: string
}

export function Badge({ title }: TextProps) {
  return (
    <View style={styles.container}>
      <Text size="s10" fontWeight="medium" color="yellow_200">
        {title}
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 8,
    backgroundColor: colorsTheme.yellow_50,
    paddingHorizontal: 5,
    paddingVertical: 4,
    alignSelf: "flex-start"
  },
});