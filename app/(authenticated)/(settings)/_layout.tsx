import React from "react"
import FontAwesome from "@expo/vector-icons/FontAwesome"
import { Link, Stack, Tabs, useRouter } from "expo-router"
import { Text, TouchableOpacity } from "react-native"
import { Ionicons } from "@expo/vector-icons"
import BackButton from "@/components/layout/BackButton"

export default function TabLayout() {
  const router = useRouter()
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: "Settings",
          headerLargeTitle: true,
          headerShown: true,
          headerStyle: {
            backgroundColor: "#070707",
          },
          headerTitleStyle: {
            fontFamily: "GilroyBold",
          },
          headerLargeTitleStyle: {
            fontFamily: "GilroyBold",
          },
          headerShadowVisible: false,
          headerSearchBarOptions: {
            hideWhenScrolling: true,
          },
          headerBackTitleStyle: {
            fontFamily: "GilroyMedium",
          },
          headerBackButtonMenuEnabled: false,
          headerLeft: () => <BackButton />,
        }}
      />
    </Stack>
  )
}
