import { Ionicons } from "@expo/vector-icons"
import { Stack } from "expo-router"
import { TouchableOpacity } from "react-native"

export default function ProfileLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: "",
          headerBackVisible: true,
          headerTransparent: true,
          headerRight: () => (
            <TouchableOpacity>
              <Ionicons name="settings-outline" size={24} color="#fff" />
            </TouchableOpacity>
          ),
        }}
      />
    </Stack>
  )
}
