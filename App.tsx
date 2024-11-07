import {
  Inter_400Regular,
  Inter_500Medium,
  Inter_700Bold, useFonts
} from '@expo-google-fonts/inter';
import { colorsTheme } from '@theme';
import { SafeAreaView, StyleSheet } from 'react-native';
import { SQLiteProvider } from "expo-sqlite"
import { initializeDatabase } from '@database'
import { Routes } from '@routes';

export default function App() {
  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_700Bold
  });
  if (!fontsLoaded) return null

  return (
    <SafeAreaView style={styles.safeArea}>
      <SQLiteProvider databaseName='database.db' onInit={initializeDatabase}>
        <Routes />
      </SQLiteProvider>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colorsTheme.background,
  }
})
