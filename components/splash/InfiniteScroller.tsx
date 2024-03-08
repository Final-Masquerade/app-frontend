import { ReactNode } from "react";
import { View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

const InfiniteScroller = ({ children }: { children?: ReactNode }) => {
  return (
    <View className="flex-1 relative overflow-hidden my-8 flex flex-row items-center justify-between w-full rounded-xl">
      {children}
      <LinearGradient
        colors={["#070707", "transparent"]}
        className="absolute top-0 w-full h-12"
      />
      <LinearGradient
        colors={["transparent", "#070707"]}
        className="absolute bottom-0 w-full h-12"
      />
    </View>
  );
};

export const ScrollerSeparator = () => <View className="w-3"></View>;

export default InfiniteScroller;
