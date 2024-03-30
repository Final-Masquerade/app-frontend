import { useAuth, useUser } from "@clerk/clerk-expo"
import { useEffect } from "react"
import { Button, Image, Text, View } from "react-native"
import Animated from "react-native-reanimated"
import { SafeAreaView } from "react-native-safe-area-context"

export default function Home() {
  const { user } = useUser()
  const { signOut, getToken } = useAuth()

  // useEffect(() => {
  //   ;(async () => {
  //     console.log({ token: await getToken() })
  //   })()
  // }, [])

  return (
    <SafeAreaView className="flex items-center justify-center flex-1 bg-background-primary">
      <Animated.Image
        source={{ uri: user?.imageUrl }}
        width={64}
        height={64}
        className="rounded-full"
      />
      <Text className="text-text-primary text-lg my-4">
        Signed in as {user?.primaryEmailAddress?.toString()}!
      </Text>
      <Button title="Log Out" onPress={() => signOut()} />
    </SafeAreaView>
  )
}
