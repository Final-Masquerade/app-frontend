import { Link, Stack } from "expo-router"
import { Text, TouchableOpacity } from "react-native"

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
    <Stack.Screen
      name="otp-verify"
      options={{
        headerTitle: "Verify Your Email",
        headerLeft: () => (
          <Link href="/" replace asChild>
            <TouchableOpacity>
              <Text className="text-accent">Cancel</Text>
            </TouchableOpacity>
          </Link>
        ),
      }}
    />
  </Stack>
)

export default AuthLayout
