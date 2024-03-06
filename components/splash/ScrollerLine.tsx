import { Text, View } from "react-native";

type ScrollerLineProps = {
  images?: Array<string>;
};

const ScrollerLine = ({ images = [] as Array<string> }: ScrollerLineProps) => (
  <View className="flex-grow h-full border flex items-center justify-center border-white/30 rounded-lg bg-background-secondary">
    <Text className="text-text-primary mx-auto">A</Text>
  </View>
);

export default ScrollerLine;
