import { Ionicons } from "@expo/vector-icons"
import { Platform, Text, TouchableOpacity, View, Share } from "react-native"
// @ts-ignore
import Avatar from "@/components/ui/avatar"
import TimeAgo from "javascript-time-ago"
import en from "javascript-time-ago/locale/en"
import TextTicker from "react-native-text-ticker"
import { MenuView, NativeActionEvent } from "@react-native-menu/menu"
import { Link } from "expo-router"
import { useMutation, useQueryClient } from "@tanstack/react-query"
// import { shareAsync } from "expo-sharing"
import { useCallback } from "react"
import * as Linking from "expo-linking"

type LibraryItemProps = {
  state?: "error" | "processing" | "success"
  title: string
  createdAt: Date
  id: string
}

TimeAgo.addLocale(en)

const formatter = new TimeAgo("en-US")

export default function LibraryItem({
  state = "error",
  title,
  createdAt,
  id,
}: LibraryItemProps) {
  const queryClient = useQueryClient()

  const deleteMutator = useMutation({
    mutationFn: (id: string) =>
      fetch(`${process.env.EXPO_PUBLIC_GATEWAY_HOST}/user/sheet/${id}`, {
        method: "DELETE",
      }),
  })

  const onContextPress = useCallback(
    async ({ nativeEvent }: NativeActionEvent) => {
      console.log(JSON.stringify(nativeEvent.event))

      switch (nativeEvent.event) {
        case "delete-sheet": {
          deleteMutator.mutate(id, {
            onSuccess: () =>
              queryClient.refetchQueries({
                queryKey: ["library"],
              }),
          })
          break
        }

        case "share": {
          Share.share(
            {
              url: Linking.createURL(
                `/(authenticated)/(tabs)/(library)/(sheet)/${id}`
              ),
              title: "Share This Sheet",
              message: title,
            },
            {
              anchor: 10,
            }
          )
          break
        }
      }
    },
    []
  )

  return (
    <View className="w-full h-24 flex flex-row" style={{ gap: 16 }}>
      <View
        className="h-full py-2 pl-4"
        style={{ opacity: state === "processing" ? 0.4 : 1 }}
      >
        <View className="h-full aspect-square rounded-lg flex items-center justify-center">
          <Avatar size={72} title={title} withTitleMark />
        </View>
      </View>
      <View className="flex-1 border-b border-background-secondary flex flex-row justify-between items-center">
        <Link
          asChild
          href={{
            pathname: "/(authenticated)/(tabs)/(library)/(sheet)/[sheet]",
            params: {
              sheet: id,
              title: title,
            },
          }}
        >
          <TouchableOpacity
            className="flex-1 h-full flex justify-center pl-1"
            style={{ opacity: state === "processing" ? 0.4 : 1 }}
          >
            <TextTicker
              duration={10000}
              loop
              bounce
              useNativeDriver
              repeatSpacer={50}
              marqueeDelay={1000}
              className={`text-text-primary font-medium text-base ${
                state === "error" ? "text-red-500" : ""
              }`}
            >
              {title}
            </TextTicker>

            <Text className="text-text-secondary text-xs">
              {state === "processing"
                ? "Processing..."
                : state === "error"
                ? "Couldn't process this sheet."
                : formatter.format(createdAt)}
            </Text>
          </TouchableOpacity>
        </Link>

        {state !== "processing" && (
          <MenuView
            onPressAction={onContextPress}
            actions={[
              {
                title: "Listen",
                id: "play",
                titleColor: "#2367A2",
                image: Platform.select({
                  ios: "music.quarternote.3",
                }),
                imageColor: "#d7fc6e",
              },
              {
                title: "Practice",
                subtitle: "Play along with your instrument",
                displayInline: true,
                id: "practice",

                titleColor: "#2367A2",
                image: Platform.select({
                  ios: "graduationcap.fill",
                }),
                imageColor: "#d7fc6e",
              },
              {
                id: "share",
                title: "Share",
                titleColor: "#46F289",
                image: Platform.select({
                  ios: "square.and.arrow.up",
                }),
                imageColor: "#46F289",
              },
              {
                id: "delete-sheet",
                title: "Delete Sheet",
                attributes: {
                  destructive: true,
                },
                image: Platform.select({
                  ios: "trash",
                }),
              },
            ]}
            shouldOpenOnLongPress={false}
            themeVariant="dark"
          >
            <View className="px-4 flex items-center justify-center">
              <Ionicons name="ellipsis-horizontal" color="#fff" size={20} />
            </View>
          </MenuView>
        )}
      </View>
    </View>
  )
}
