import { useRouter } from "expo-router"
import { Button, Image, Platform, Text, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"

export default function Cameras() {
  const router = useRouter()

  if (false)
    return (
      <SafeAreaView className="flex-1">
        <Text className="text-text-primary">TextAMK</Text>
      </SafeAreaView>
    )

  return (
    <SafeAreaView className="flex-1">
      <View className="flex items-center justify-center my-3">
        <Text className=" text-text-primary font-gilroy-bold text-xl">
          Camera
        </Text>
      </View>
      <View className="flex-1 mx-4 border overflow-hidden border-background-secondary rounded-3xl bg-background-secondary/30"></View>

      <View className="flex items-center justify-center mb-6 mt-12">
        <Button title="Back" onPress={() => router.back()} />
      </View>
    </SafeAreaView>
  )
}
