import InfiniteScroller, {
  ScrollerSeparator,
} from "@/components/splash/InfiniteScroller"
import { Link, useRouter } from "expo-router"
import { View, Text, Pressable } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import Logo from "@/assets/svg/logo.svg"
import ScrollerLine from "@/components/splash/ScrollerLine"
import Ionicons from "@expo/vector-icons/Ionicons"

const vinyl = require("@/assets/images/splash/vinyl.png")
const guitar = require("@/assets/images/splash/classical-guitar.png")
const hammet = require("@/assets/images/splash/hammet.png")
const pianist = require("@/assets/images/splash/pianist.png")

const Page = () => {
  return (
    <SafeAreaView className="bg-background-primary px-8 pt-4 pb-2 flex-1 flex items-start justify-between text-text-primary">
      <View className="flex flex-row justify-between items-center w-full">
        <View className="flex flex-row gap-2 items-center">
          <Logo width={32} height={32} />
          <Text className="text-text-primary text-[28px] font-gilroy-bold">
            Nota
          </Text>
        </View>
        <Pressable
          className="border border-accent rounded-full flex flex-row py-[5px] pl-[6px] pr-[8px]"
          style={{ gap: 5 }}
        >
          <Ionicons
            name="globe-outline"
            size={18}
            style={{
              color: "#D7FC6E",
            }}
          />
          <Text className="text-accent text-xs font-gilroy-bold mt-[2px]">
            EN
          </Text>
        </Pressable>
      </View>
      <InfiniteScroller>
        <ScrollerLine
          images={[vinyl, hammet, pianist, null, guitar, null]}
          duration={18000}
        />
        <ScrollerSeparator />
        <ScrollerLine
          images={[pianist, null, guitar, hammet, vinyl]}
          duration={24000}
        />
        <ScrollerSeparator />
        <ScrollerLine
          images={[guitar, null, hammet, vinyl, pianist, null]}
          duration={20000}
        />
        <ScrollerSeparator />
        <ScrollerLine
          images={[pianist, guitar, null, hammet, null, vinyl]}
          duration={36000}
        />
      </InfiniteScroller>
      <View className="pb-4 space-y-8 w-full flex items-start">
        <Text className="text-text-primary text-[32px] leading-[42px] font-gilroy-bold">
          Digitalise your music library with{" "}
          <Text className="font-bold text-accent font-gilroy-extrabold">
            no hassle.
          </Text>
        </Text>
        <Link href="/(public)/(auth)/login" asChild>
          <Pressable className="rounded-full border border-white px-4 py-2 mb-8">
            <Text className="text-text-primary font-gilroy-semibold text-xl">
              Sign In
            </Text>
          </Pressable>
        </Link>

        <Text className="text-text-secondary font-gilroy text-sm">
          Don't have an account?{" "}
          <Link href="/(public)/(auth)/register" asChild>
            <Pressable>
              <Text className="font-gilroy-bold text-text-primary">
                Register
              </Text>
            </Pressable>
          </Link>
        </Text>
      </View>
    </SafeAreaView>
  )
}

export default Page
