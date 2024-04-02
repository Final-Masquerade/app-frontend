import Header from "@/components/layout/Header"
import { Stack } from "expo-router"

function AppLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="(home)"
        options={{
          title: "Home",
          headerShown: false,
          header: Header,
          headerTransparent: true,
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
          gestureDirection: "vertical",
          title: "Camera",
          headerShown: false,
        }}
      />
    </Stack>
  )
}

export default AppLayout
