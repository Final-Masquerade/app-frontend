import { ScrollView, Text, TouchableOpacity, View } from "react-native"

export default function Home() {
  return (
    <ScrollView
      className="flex-1 overflow-hidden rounded-b-2xl space-y-3 mx-4"
      contentInsetAdjustmentBehavior="automatic"
      contentContainerStyle={{
        paddingVertical: 16,
      }}
      showsVerticalScrollIndicator={false}
    >
      {new Array(100).fill("").map((e, i) => (
        <TouchableOpacity
          key={i}
          className="w-full h-16 rounded-xl flex items-center justify-center"
          style={{
            backgroundColor: `hsl(${(i + 4) * 14.4}, 100%, 50%)`,
          }}
        >
          <Text className="font-medium">Item {i}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  )
}
