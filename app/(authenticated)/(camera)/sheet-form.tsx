import {
  Link,
  Redirect,
  useLocalSearchParams,
  useNavigation,
} from "expo-router"
import { Button, Text, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"

export default function SheetForm() {
  const { jobId } = useLocalSearchParams()

  if (!jobId) <Redirect href="/(authenticated)/(home)/" />

  return (
    <SafeAreaView className="flex-1 bg-background-primary">
      <View className="m-auto space-y-2">
        <Text className="text-white text-center text-base">
          Processing your sheet...
        </Text>
        <Text className="text-center text-[10px] text-text-secondary">
          {jobId}
        </Text>
        <Link href="/(authenticated)/(home)/" asChild>
          <Button title="Home" />
        </Link>
      </View>
    </SafeAreaView>
  )
}
