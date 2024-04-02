import { Image, Text, TouchableOpacity, View } from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import Logo from "@/assets/svg/logo.svg"
import { Ionicons } from "@expo/vector-icons"
import { useUser } from "@clerk/clerk-expo"
import { Link } from "expo-router"

const HEIGHT = 64

export default function Header() {
  const { user } = useUser()
  const safeAreaInsets = useSafeAreaInsets()

  return (
    <View
      style={{
        height: safeAreaInsets.top + HEIGHT,
      }}
    >
      <View
        className="w-full flex flex-row items-center justify-between pl-6 pr-4"
        style={{ height: HEIGHT, marginTop: safeAreaInsets.top }}
      >
        <Link href="/(authenticated)/(profile)/" asChild push>
          <TouchableOpacity>
            <Image
              source={{ uri: user?.imageUrl }}
              className="w-8 aspect-square rounded-full"
            />
          </TouchableOpacity>
        </Link>
        <View className="flex flex-row gap-2 items-center justify-center">
          <Logo width={24} height={24} />
          <Text className="text-text-primary text-[20px] font-gilroy-bold">
            Nota
          </Text>
        </View>
        <Link href="/(authenticated)/(camera)/" asChild push>
          <TouchableOpacity className="p-2">
            <Ionicons name="sparkles" size={24} color="#D7FC6E" />
          </TouchableOpacity>
        </Link>
      </View>
    </View>
  )
}
