import Header from "@/components/layout/Header"
import LibraryItem from "@/components/ui/library-item"
import { useAuth, useUser } from "@clerk/clerk-expo"
import { Ionicons } from "@expo/vector-icons"
import { LinearGradient } from "expo-linear-gradient"
import { useEffect, useRef } from "react"
import { Animated, Button, Image, ScrollView, Text, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"

export default function Home() {
  return (
    <View className="relative flex-1 pt-16">
      <Header />
      <View className="flex-1 bg-background-primary flex items-center justify-center">
        <View className="mt-16 flex items-center bg-background-secondary/0 p-12 rounded-xl">
          <Ionicons name="scan" color="#d7fc6e" size={40} />
          <Text className="text-text-primary text-center text-lg font-gilroy-bold mt-4">
            Try Scanning
          </Text>
          <Text className="text-text-secondary text-center max-w-sm mx-auto mt-2 leading-5">
            Start filling out your library with your existing score sheets
            through{" "}
            <Ionicons name="sparkles" size={12} color="rgb(200,200,200)" />{" "}
            button.
          </Text>
        </View>
      </View>
    </View>
  )
}
