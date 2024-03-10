import { Stack } from "expo-router"

function PublicLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{ title: "Start", headerShown: false }}
      />
      <Stack.Screen
        name="(auth)"
        options={{
          presentation: "modal",
          headerShown: false,
          gestureEnabled: false,
        }}
      />
    </Stack>
  )
}

export default PublicLayout
