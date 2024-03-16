import { useUser } from "@clerk/clerk-expo"
import { useRouter } from "expo-router"
import { Button, Image, Text, View } from "react-native"
import Animated from "react-native-reanimated"
import { SafeAreaView } from "react-native-safe-area-context"

export default function Camera() {
  const router = useRouter()

  return (
    <SafeAreaView className="flex-1">
      <View className="flex items-center justify-center my-3">
        <Text className=" text-text-primary font-gilroy-bold text-xl">
          Camera
        </Text>
      </View>
      <View className="flex-1 mx-4 border border-background-secondary rounded-xl bg-background-secondary/30"></View>
      <View className="flex items-center justify-center mb-6 mt-12">
        <Button title="Back" onPress={() => router.back()} />
      </View>
    </SafeAreaView>
  )
}
