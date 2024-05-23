import Header from "@/components/layout/Header"
import { useUser } from "@clerk/clerk-expo"
import { Foundation, Ionicons, Octicons } from "@expo/vector-icons"
import { Tabs } from "expo-router"
import { Image } from "react-native"

export default function HomeLayout() {
  const { user } = useUser()

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: "#070707",
          borderTopWidth: 0,
          marginTop: 12,
        },
      }}
    >
      <Tabs.Screen
        name="(home)"
        options={{
          title: "Home",
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
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color, focused, size }) => {
            return (
              <Image
                source={{ uri: user?.imageUrl }}
                className="aspect-square rounded-full"
                style={{
                  width: size,
                  height: size,
                }}
              />
            )
          },
        }}
      />
    </Tabs>
  )
}
