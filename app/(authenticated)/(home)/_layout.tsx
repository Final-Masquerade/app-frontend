import Header from "@/components/layout/Header"
import { Foundation, Ionicons, Octicons } from "@expo/vector-icons"
import { Tabs } from "expo-router"

export default function HomeLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#D7FC6E",
        tabBarStyle: {
          backgroundColor: "transparent",
          borderTopWidth: 0,
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          header: Header,
          headerTransparent: true,
          tabBarIcon: ({ color, focused, size }) => (
            <Foundation name="home" {...{ size, color }} />
          ),
          tabBarHideOnKeyboard: true,
        }}
      />
      <Tabs.Screen
        name="library"
        options={{
          title: "Library",
          tabBarIcon: ({ color, focused, size }) => (
            <Octicons name="stack" {...{ size, color }} />
          ),
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          title: "Search",
          tabBarIcon: ({ color, focused, size }) => (
            <Ionicons name="search" {...{ size, color }} />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: "Settings",
          tabBarIcon: ({ color, focused, size }) => (
            <Ionicons name="settings-outline" {...{ size, color }} />
          ),
        }}
      />
    </Tabs>
  )
}
