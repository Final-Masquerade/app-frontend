import { Stack } from "expo-router"

export default function CameraLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="sheet-form"
        options={{
          title: "Sheet Form",
          animation: "fade",
        }}
      />
    </Stack>
  )
}
