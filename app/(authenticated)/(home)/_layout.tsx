import Header from "@/components/layout/Header"
import { Foundation, Ionicons, Octicons } from "@expo/vector-icons"
import { Tabs } from "expo-router"

export default function HomeLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarStyle: {
          backgroundColor: "#070707",
          borderTopWidth: 0,
          marginTop: 12,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          header: () => <Header />,
          headerTransparent: true,
          tabBarIcon: ({ color, focused, size }) =>
            focused ? (
              <Ionicons name="home" {...{ size, color }} />
            ) : (
              <Ionicons name="home-outline" {...{ size, color }} />
            ),
        }}
      />
      <Tabs.Screen
        name="(library)"
        options={{
          headerShown: false,
          title: "Library",
          tabBarIcon: ({ color, focused, size }) =>
            focused ? (
              <Ionicons name="albums" {...{ size, color }} />
            ) : (
              <Ionicons name="albums-outline" {...{ size, color }} />
            ),
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          title: "Search",
          tabBarIcon: ({ color, focused, size }) =>
            focused ? (
              <Ionicons name="search" {...{ size, color }} />
            ) : (
              <Ionicons name="search-outline" {...{ size, color }} />
            ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: "Settings",
          tabBarIcon: ({ color, focused, size }) =>
            focused ? (
              <Ionicons name="cog" {...{ size, color }} />
            ) : (
              <Ionicons name="cog-outline" {...{ size, color }} />
            ),
        }}
      />
    </Tabs>
  )
}
