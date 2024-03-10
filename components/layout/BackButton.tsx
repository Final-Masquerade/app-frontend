import { Ionicons } from "@expo/vector-icons"
import { useRouter } from "expo-router"
import { Text, TouchableOpacity } from "react-native"

function BackButton() {
  const router = useRouter()

  return (
    <TouchableOpacity
      onPress={() => router.back()}
      className="flex flex-row items-center justify-center"
      style={{ gap: 4 }}
    >
      <Ionicons name="arrow-back-sharp" color="#d7fc6e" size={24} />
      <Text className="text-base text-accent font-medium">Back</Text>
    </TouchableOpacity>
  )
}

export default BackButton
