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
        name="(profile)"
        options={{
          presentation: "modal",
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
    </Stack>
  )
}

export default AppLayout
