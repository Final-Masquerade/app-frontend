import Header from "@/components/layout/Header"
import { Stack } from "expo-router"

export default function LibraryLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: "Home",
          header: () => <Header />,
          headerTransparent: true,
        }}
      />
    </Stack>
  )
}
