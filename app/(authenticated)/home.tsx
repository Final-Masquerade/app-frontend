import { useAuth, useUser } from "@clerk/clerk-expo"
import { Button, Text, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"

const Home = () => {
  const { user } = useUser()
  const { signOut } = useAuth()

  return (
    <SafeAreaView className="flex items-center justify-center flex-1 bg-background-primary">
      <Text className="text-text-primary text-lg mb-4">
        Signed in as {user?.primaryEmailAddress?.toString()}
      </Text>
      <Button title="Log Out" onPress={() => signOut()} />
    </SafeAreaView>
  )
}

export default Home
