import { ReactNode } from "react";
import { View } from "react-native";

const InfiniteScroller = ({ children }: { children?: ReactNode }) => {
  return (
    <View className="flex-1 overflow-hidden my-8 flex flex-row items-center justify-between w-full rounded-xl">
      {children}
    </View>
  );
};

export const ScrollerSeparator = () => <View className="w-3"></View>;

export default InfiniteScroller;
