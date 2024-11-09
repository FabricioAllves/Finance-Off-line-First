import { colorsTheme } from "@theme";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    padding: 30,
    paddingTop: 0,
    flex: 1,
    backgroundColor: colorsTheme.background,
  },
  header: {
    height: 60,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    marginBottom: 10,
  },
  form: {
    gap: 16,
    flex: 1,
    paddingBottom: 30,
  },
  buttons: {
    gap: 10,
    justifyContent: "flex-end",
  },
});
