import { Stack } from "expo-router";

const PublicLayout = () => (
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
      }}
    />
  </Stack>
);

export default PublicLayout;
