import { Link, Stack } from "expo-router";
import { Text, TouchableOpacity } from "react-native";

const AuthLayout = () => (
  <Stack>
    <Stack.Screen
      name="login"
      options={{
        headerTitle: "Sign In",
        headerShown: false,
      }}
    />
    <Stack.Screen
      name="register"
      options={{
        headerTitle: "Sign Up",
        headerShown: false,
      }}
    />
  </Stack>
);

export default AuthLayout;
