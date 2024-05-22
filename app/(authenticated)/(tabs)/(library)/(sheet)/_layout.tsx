import { Stack, useLocalSearchParams } from "expo-router"

export default function SheetLayout() {
  const { id } = useLocalSearchParams()

  return (
    <Stack>
      <Stack.Screen name="[sheet]" options={{ headerShown: false }} />
    </Stack>
  )
}
