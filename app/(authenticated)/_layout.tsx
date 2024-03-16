import Header from "@/components/layout/Header"
import { Stack } from "expo-router"

function AppLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="(profile)"
        options={{
          presentation: "modal",
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="(home)"
        options={{
          title: "Home",
          headerShown: true,
          header: Header,
          headerTransparent: true,
        }}
      />
      <Stack.Screen
        name="camera"
        options={{
          animation: "fade_from_bottom",
          gestureDirection: "vertical",
          title: "Camera",
          headerShown: false,
        }}
      />
    </Stack>
  )
}

export default AppLayout
