import { useDeleteSheet } from "@/services/actions"
import { MenuView, NativeActionEvent } from "@react-native-menu/menu"
import { useQueryClient } from "@tanstack/react-query"
import { useRouter } from "expo-router"
import { ReactNode, useCallback } from "react"
import { Platform } from "react-native"

type ContextMenuProps = {
  children: ReactNode
  id: string
  status: string
}

export default function ItemContextMenu({
  children,
  id,
  status,
}: ContextMenuProps) {
  const deleteMutator = useDeleteSheet()
  const queryClient = useQueryClient()
  const router = useRouter()

  const onPress = useCallback(({ nativeEvent }: NativeActionEvent) => {
    switch (nativeEvent.event) {
      case "delete-sheet": {
        deleteMutator.mutate(id, {
          onSuccess: () => {
            queryClient.refetchQueries({
              queryKey: ["library"],
            })
            router.navigate("/(authenticated)/(tabs)/(library)/")
          },
        })

        break
      }

      // case "share": {
      //   Share.share(
      //     {
      //       url: Linking.createURL(
      //         `/(authenticated)/(tabs)/(library)/(sheet)/${id}`
      //       ),
      //       title: "Share This Sheet",
      //       message: title,
      //     },
      //     {
      //       anchor: 10,
      //     }
      //   )
      //   break
      // }
    }
  }, [])

  return (
    <MenuView
      onPressAction={onPress}
      // @ts-ignore
      actions={actions[status]}
    >
      {children}
    </MenuView>
  )
}

const actions = {
  SUCCESS: [
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
  ],
  FAILED: [
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
  ],
}
