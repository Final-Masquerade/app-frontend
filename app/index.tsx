import InfiniteScroller from "@/components/splash/InfiniteScroller";
import { Link } from "expo-router";
import { View, Text, Button, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Logo from "@/assets/svg/logo.svg";
import ScrollerLine from "@/components/splash/ScrollerLine";

const Page = () => {
  return (
    <SafeAreaView className="bg-background-primary px-8 py-2 flex-1 flex items-start justify-between text-text-primary">
      <View className="flex flex-row justify-between items-center w-full">
        <View className="flex flex-row gap-2 items-center">
          <Logo width={32} height={32} />
          <Text className="text-text-primary text-[28px] font-gilroy-bold">
            Sonata
          </Text>
        </View>
        <Text className="text-text-primary text-xs font-bold">EN</Text>
      </View>
      <InfiniteScroller></InfiniteScroller>
      <View className="pb-4 space-y-8 w-full flex items-start">
        <Text className="text-text-primary text-[32px] leading-[42px] font-gilroy-bold">
          Digitalise your music library with{" "}
          <Text className="font-bold text-accent font-gilroy-extrabold">
            no hassle.
          </Text>
        </Text>
        <Link href="/modal" asChild>
          <Pressable className="rounded-full border border-white px-4 py-2 mb-8">
            <Text className="text-text-primary font-gilroy-semibold text-xl">
              Sign In
            </Text>
          </Pressable>
        </Link>
        <Text className="text-text-secondary font-gilroy text-sm">
          Already have an account?{" "}
          <Pressable>
            <Text className="font-gilroy-bold text-text-primary">Register</Text>
          </Pressable>
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default Page;
