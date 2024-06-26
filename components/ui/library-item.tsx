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
import { useDeleteSheet } from "@/services/actions"
import ItemContextMenu from "@/components/layout/item-context-menu"

type LibraryItemProps = {
  state?: "FAILED" | "PROCESSING" | "SUCCESS"
  title: string
  createdAt: Date
  id: string
}

TimeAgo.addLocale(en)

const formatter = new TimeAgo("en-US")

export default function LibraryItem({
  state = "FAILED",
  title,
  createdAt,
  id,
}: LibraryItemProps) {
  const queryClient = useQueryClient()

  const deleteMutator = useDeleteSheet()

  const onContextPress = useCallback(
    async ({ nativeEvent }: NativeActionEvent) => {
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
        style={{ opacity: state === "PROCESSING" ? 0.4 : 1 }}
      >
        <View className="h-full aspect-square rounded-lg flex items-center justify-center">
          <Avatar size={72} title={title} withTitleMark />
        </View>
      </View>
      <View className="flex-1 border-b border-background-secondary flex flex-row justify-between items-center">
        <Link
          asChild
          disabled={state === "PROCESSING"}
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
            style={{ opacity: state === "PROCESSING" ? 0.4 : 1 }}
          >
            <TextTicker
              duration={10000}
              loop
              bounce
              useNativeDriver
              repeatSpacer={50}
              marqueeDelay={1000}
              className={`text-text-primary font-medium text-base ${
                state === "FAILED" ? "text-red-500" : ""
              }`}
            >
              {title}
            </TextTicker>

            <Text className="text-text-secondary text-xs">
              {state === "PROCESSING"
                ? "Processing..."
                : state === "FAILED"
                ? "Couldn't process this sheet."
                : formatter.format(createdAt)}
            </Text>
          </TouchableOpacity>
        </Link>

        {state !== "PROCESSING" && (
          <ItemContextMenu id={id} status={state}>
            <View className="px-4 flex items-center justify-center">
              <Ionicons name="ellipsis-horizontal" color="#fff" size={20} />
            </View>
          </ItemContextMenu>
        )}
      </View>
    </View>
  )
}
