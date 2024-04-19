import Avatar from "@/components/ui/avatar"
import { useLocalSearchParams, useNavigation } from "expo-router"
import { useEffect } from "react"
import {
  Dimensions,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native"
import { LinearGradient } from "expo-linear-gradient"
import { useQuery } from "@tanstack/react-query"
import { useAuth } from "@clerk/clerk-expo"
import Button from "@/components/ui/button"
import { Ionicons } from "@expo/vector-icons"
import TimeAgo from "javascript-time-ago"
import en from "javascript-time-ago/locale/en"
import Form, { FormItem } from "@/components/ui/form"

TimeAgo.addLocale(en)

const formatter = new TimeAgo("en-US")

export default function SheetMeta() {
  const { sheet: sheetId }: { sheet: string } = useLocalSearchParams()
  const width = Dimensions.get("window").width
  const { getToken } = useAuth()

  const { data, isError, isPending } = useQuery({
    queryKey: [sheetId],
    queryFn: async () => {
      const data = await (
        await fetch(
          `${process.env.EXPO_PUBLIC_GATEWAY_HOST}/user/sheet/${sheetId}`,
          {
            headers: {
              Authorization: `Bearer ${await getToken()}`,
            },
          }
        )
      ).json()

      return data
    },
  })

  if (isPending) return <View></View>

  return (
    <View className="flex-1 relative">
      <Avatar
        title={data.name}
        size={width}
        borderRadius={0}
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: 0,
        }}
        tint="dark"
      />
      <LinearGradient
        colors={["rgba(7,7,7, 0.1)", "#070707"]}
        locations={[0, 0.8]}
        className="absolute top-0 left-0 right-0 w-full aspect-square"
      />
      <ScrollView
        contentContainerStyle={{
          marginHorizontal: 16,
          paddingBottom: 64,
        }}
      >
        <View
          className="w-full flex items-center mt-16 mb-8"
          style={{
            gap: 16,
          }}
        >
          <Avatar
            title={data.name}
            size={width / 1.5}
            withTitleMark
            borderRadius={6}
          />
          <View>
            <Text className="text-text-primary text-lg font-medium text-center">
              {data.name}
            </Text>
            <Text className="text-text-secondary text-center">
              {formatter.format(new Date(data.createdAt))}
            </Text>
          </View>
        </View>
        <View className="my-3">
          <Button>
            <View className="flex flex-row items-center gap-2">
              <Text className="text-black text-lg font-semibold">Practice</Text>
              <Ionicons name="school" size={20} />
            </View>
          </Button>
          <TouchableOpacity>
            <View className="flex flex-row items-center justify-center gap-2 mt-3 opacity-80">
              <Text className="text-white text-lg">Listen</Text>
              <Ionicons name="play" color="#fff" size={20} />
            </View>
          </TouchableOpacity>
        </View>
        <View className="flex mt-6" style={{ gap: 32 }}>
          <Form title="Sheet Information">
            <FormItem
              title="Key"
              value={data.key?.replace("_", " ") || "Not Specified"}
            />
            <FormItem
              title="Difficulty"
              value={data.difficulty || "Not Specified"}
            />
            <FormItem
              title="Tempo"
              capitalized={false}
              value={data.tempo + " BPM" || "Not Specified"}
            />
            <FormItem
              title="Composer"
              value={data.composer || "Not Specified"}
            />
            <FormItem title="Date" value={data.date || "Not Specified"} />
          </Form>
          <Form title="Metadata">
            <FormItem title="Conversion Status" value={data.status} />
            <FormItem
              title="Scanned At"
              value={new Date(data.createdAt).toLocaleDateString()}
            />
          </Form>
        </View>

        <Text className="text-white opacity-40 mt-6 text-sm pl-2">
          The captured image is discarded right after the conversion for privacy
          reasons.
        </Text>
      </ScrollView>
    </View>
  )
}
