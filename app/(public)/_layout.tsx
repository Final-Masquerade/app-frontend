import { Link, Stack } from "expo-router";
import { Text, TouchableOpacity } from "react-native";

const PublicLayout = () => (
  <Stack>
    <Stack.Screen name="index" options={{ headerShown: false }} />
    <Stack.Screen
      name="login"
      options={{
        presentation: "modal",
        headerTitle: "Sign Up",
        headerShown: true,
        headerLeft: () => (
          <Link href="/(public)/">
            <Text className="text-accent font-gilroy-medium">Cancel</Text>
          </Link>
        ),
      }}
    />
  </Stack>
);

export default PublicLayout;
