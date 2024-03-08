import { StatusBar } from "expo-status-bar";
import { Platform, StyleSheet, Text, View } from "react-native";

export default function ModalScreen() {
  return (
    <View className="flex-1 flex items-center justify-center bg-background-secondary">
      <Text className="text-white text-3xl font-gilroy-bold">Login</Text>
    </View>
  );
}
