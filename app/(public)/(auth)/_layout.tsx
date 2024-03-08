import { Link, Stack } from "expo-router";
import { Text, TouchableOpacity } from "react-native";

const AuthLayout = () => (
  <Stack>
    <Stack.Screen
      name="login"
      options={{
        headerTitle: "Sign In",
        headerShown: false,
        headerLeft: () => (
          <Link href="/(public)/">
            <Text className="text-accent font-gilroy-medium">Cancel</Text>
          </Link>
        ),
      }}
    />
    <Stack.Screen
      name="register"
      options={{
        headerTitle: "Sign Up",
        headerShown: false,
        headerLeft: () => (
          <Link href="/(public)/">
            <Text className="text-accent font-gilroy-medium">Cancel</Text>
          </Link>
        ),
      }}
    />
  </Stack>
);

export default AuthLayout;
