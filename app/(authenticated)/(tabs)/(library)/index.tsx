import LibraryItem from "@/components/ui/library-item"
import { useAuth, useUser } from "@clerk/clerk-expo"
import { useQuery } from "@tanstack/react-query"
import { Fragment } from "react"
import {
  ActivityIndicator,
  RefreshControl,
  ScrollView,
  Text,
  View,
} from "react-native"

export default function Library() {
  const { getToken } = useAuth()

  const { data, isPending, isError, refetch, isRefetching } = useQuery({
    queryKey: ["library"],
    queryFn: async () => {
      const token = await getToken()

      const data = await (
        await fetch(`${process.env.EXPO_PUBLIC_GATEWAY_HOST}/user/sheets`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
      ).json()

      return data
    },
  })

  return isPending || isError ? (
    <Fragment>
      <View className="my-auto pt-16">
        <ActivityIndicator />
        <Text className="text-text-secondary text-center mt-4">
          Loading your sheets...
        </Text>
      </View>
    </Fragment>
  ) : (
    <ScrollView
      className="flex-1 overflow-hidden rounded-b-2xl"
      contentInsetAdjustmentBehavior="automatic"
      contentContainerStyle={{
        paddingTop: 12,
        paddingBottom: 16,
      }}
      refreshControl={
        <RefreshControl refreshing={false} onRefresh={() => refetch()} />
      }
      showsVerticalScrollIndicator={false}
    >
      <View>
        <Text className="text-center text-text-secondary mb-4">
          Currently have {data.sheetCount} sheet
          {data.sheetCount === 1 ? "" : "s"} in your library.
        </Text>
        {/* @ts-ignore */}
        {data.sheets.map(({ name, status, createdAt, id }, i) => (
          <LibraryItem
            key={`library-item-${i}`}
            title={name}
            createdAt={new Date(createdAt)}
            state={status}
            id={id}
          />
        ))}
      </View>
    </ScrollView>
  )
}
