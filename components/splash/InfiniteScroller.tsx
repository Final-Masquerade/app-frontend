import ScrollerLine from "@/components/splash/ScrollerLine";
import { ReactNode } from "react";
import { Text, View } from "react-native";

const InfiniteScroller = ({ children }: { children?: ReactNode }) => {
  return (
    <View className="flex-grow overflow-hidden my-8 flex flex-row items-center justify-between w-full rounded-lg">
      <ScrollerLine />
      <View className="w-3"></View>
      <ScrollerLine />
      <View className="w-3"></View>
      <ScrollerLine />
      <View className="w-3"></View>
      <ScrollerLine />
    </View>
  );
};

export default InfiniteScroller;
