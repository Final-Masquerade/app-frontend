import { useAuth, useUser } from "@clerk/clerk-expo"
import {
  Image,
  ScrollView,
  Text,
  View,
  Animated,
  NativeSyntheticEvent,
  NativeScrollEvent,
  ImageComponent,
  TouchableOpacity,
  SafeAreaView,
  Button,
} from "react-native"
import { BlurView } from "expo-blur"
import { LinearGradient } from "expo-linear-gradient"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { useEffect, useRef } from "react"
import { useNavigation } from "expo-router"
import { interpolate } from "react-native-reanimated"
import { Ionicons } from "@expo/vector-icons"

export default function Profile() {
  const { user } = useUser()
  const { signOut } = useAuth()
  const navigation = useNavigation()

  return (
    <SafeAreaView className="flex-1 bg-background-primary">
      <Image
        source={{ uri: user?.imageUrl }}
        resizeMode="cover"
        className="absolute top-0 left-0 right-0 w-full aspect-square"
      />
      <BlurView className="absolute top-0 left-0 right-0 w-full aspect-square" />
      <LinearGradient
        colors={["rgba(7,7,7, 0.6)", "#070707"]}
        locations={[0, 0.8]}
        className="absolute top-0 left-0 right-0 w-full aspect-square"
      />
      <View className="flex-1 pb-12">
        <View className="mb-auto mt-8">
          <View className="w-36 aspect-square mx-auto relative">
            <Image
              source={{ uri: user?.imageUrl }}
              className="w-full aspect-square rounded-full"
            />

            <TouchableOpacity className="absolute bottom-0 right-0 w-11 border-2 rounded-full aspect-square bg-white/70 flex items-center justify-center">
              <Ionicons name="camera" size={24} />
            </TouchableOpacity>
          </View>
          <Text className="text-text-primary/80 text-center mt-8 font-medium text-xl px-6">
            {user?.fullName || user?.primaryEmailAddress?.toString()}
          </Text>
          <Text className="text-center text-text-secondary/70 mt-1 text-sm">
            {user?.fullName
              ? user?.primaryEmailAddress?.toString()
              : user?.id.split("_").at(1)}
          </Text>

          <Text className="text-center text-text-secondary mt-6">
            Member since {user?.createdAt?.toLocaleString()}.
          </Text>
        </View>
        <TouchableOpacity
          onPress={() => signOut()}
          className="mx-auto flex flex-row items-center justify-center"
          style={{
            gap: 8,
          }}
        >
          <Text className="text-red-500 text-lg">Log Out</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}
