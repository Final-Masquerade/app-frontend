import { Stack } from "expo-router"

export default function LibraryLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: "Library",
          headerLargeTitle: true,
          headerLargeStyle: {
            backgroundColor: "#070707",
          },
          headerSearchBarOptions: {
            obscureBackground: true,
          },
          headerBlurEffect: "prominent",
          headerLargeTitleShadowVisible: false,
        }}
      />
    </Stack>
  )
}
