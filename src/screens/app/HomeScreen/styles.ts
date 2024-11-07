import { colorsTheme } from "@theme";
import { StyleSheet, Platform } from "react-native";

export const styles = StyleSheet.create({
  container: {
    padding: 16,
    flex: 1,
    backgroundColor: colorsTheme.background,
  },
  header: {
    height: 60,
    marginTop: Platform.OS === 'android' ? 20 : 0,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row'
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  animation: {
    width: 200,
    height: 200,
  },
});