import { Stack, useLocalSearchParams } from "expo-router"

export default function SheetLayout() {
  const { id } = useLocalSearchParams()

  return (
    <Stack>
      <Stack.Screen name="[sheet]" options={{ headerShown: false }} />
      <Stack.Screen
        name="playground"
        options={{
          headerShown: false,
          presentation: "fullScreenModal",
          gestureEnabled: true,
        }}
      />
    </Stack>
  )
}
