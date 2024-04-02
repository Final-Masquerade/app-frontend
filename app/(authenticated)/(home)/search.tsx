import { useAuth, useUser } from "@clerk/clerk-expo"
import { useEffect } from "react"
import { Button, Image, Text, View } from "react-native"
import Animated from "react-native-reanimated"
import { SafeAreaView } from "react-native-safe-area-context"

export default function Home() {
  const { user } = useUser()
  const { signOut } = useAuth()

  return (
    <SafeAreaView className="flex items-center justify-center flex-1 bg-background-primary">
      <Text className="text-text-primary text-lg my-4">Search</Text>
    </SafeAreaView>
  )
}
