import { Stack } from "expo-router"

function AppLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="(tabs)"
        options={{
          title: "Tabs",
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="(camera)"
        options={{
          presentation: "fullScreenModal",
          title: "Camera",
          headerShown: false,
        }}
      />

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

export default AppLayout
