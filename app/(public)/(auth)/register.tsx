import { Link } from "expo-router";
import { Button, Text, View } from "react-native";

const register = () => (
  <View className="flex-1 flex items-center justify-center bg-background-secondary">
    <Text className="text-white text-3xl font-gilroy-bold">Register</Text>
    <Text className="text-text-secondary mb-12 mt-2">
      To login, enter your credentials.
    </Text>
    <Link href="/(public)/(auth)/login" asChild replace>
      <Button title="Sign In" />
    </Link>
  </View>
);

export default register;
