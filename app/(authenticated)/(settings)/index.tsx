import { useState } from "react"
import { Button, ScrollView, Text, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { Picker } from "@react-native-picker/picker"
import { useRouter } from "expo-router"

export default function Settings() {
  const router = useRouter()
  return (
    <View className="flex-1 bg-background-primary">
      <ScrollView contentInsetAdjustmentBehavior="automatic" className="px-6">
        <Button
          onPress={() => router.navigate("/(authenticated)/(settings)/data")}
          title="To A"
        />
      </ScrollView>
    </View>
  )
}
