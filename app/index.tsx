import { View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Page = () => {
  return (
    <SafeAreaView className="bg-background-primary px-8 flex-1 flex justify-between text-text-primary">
      <View className="flex flex-row justify-between items-center">
        <Text className="text-text-primary text-xl">Sonata</Text>
        <Text className="text-text-primary text-xs font-bold">EN</Text>
      </View>
      <View className="flex-grow border flex items-center justify-center">
        <Text className="text-lime-300">AMK</Text>
      </View>
      <View className="pb-4 space-y-4">
        <Text className="text-text-primary text-3xl font-bold">
          Digitalise your music library with{" "}
          <Text className="font-bold text-lime-300">no hassle.</Text>
        </Text>
        <Text className="text-text-primary">
          Already have an account? <Text className="font-bold">Register</Text>
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default Page;
