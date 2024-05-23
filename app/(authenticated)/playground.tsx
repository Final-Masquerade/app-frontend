import { useLocalSearchParams, useRouter } from "expo-router"
import {
  ActivityIndicator,
  Button,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from "react-native"
import { useCallback, useEffect, useRef, useState } from "react"
import Avatar from "@/components/ui/avatar"
import { LinearGradient } from "expo-linear-gradient"
import { Ionicons } from "@expo/vector-icons"
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context"
import Keyboard from "@/components/renderer/keyboard"
import MusicXMLRenderer, {
  RendererRefHandle,
} from "@/components/renderer/musicxml-renderer"
import { BlurView } from "expo-blur"
import { useAuth } from "@clerk/clerk-expo"
import { useQuery } from "@tanstack/react-query"
import useMusicXML from "@/hooks/useMusicXML"
import usePlaygroundProgress from "@/hooks/usePlaygroundProgress"

export default function Playground() {
  const { sheetId, title } = useLocalSearchParams()
  const { width } = useWindowDimensions()
  const { top } = useSafeAreaInsets()
  const router = useRouter()
  const { getToken } = useAuth()

  const [volumeOpen, setVolumeOpen] = useState<boolean>(false)
  const [helpOpen, setHelpOpen] = useState<boolean>(true)
  const [playing, setPlaying] = useState<boolean>(false)
  const rendererRef = useRef<RendererRefHandle>(null)

  if (!sheetId) router.navigate("/(authenticated)/(tabs)/(library)/")

  const { data, isPending, isError, refetch, isRefetching, isSuccess } =
    useQuery({
      queryKey: [`playground-${sheetId}`],
      queryFn: async () => {
        const token = await getToken()

        const data = await (
          await fetch(
            `${process.env.EXPO_PUBLIC_GATEWAY_HOST}/user/sheet/${sheetId}/xml`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          )
        ).json()

        return data
      },
    })

  const { bars, barCount } = useMusicXML(data?.xml)

  const { attempt, currentBar, setBar, barProgress, wrongAttempt } =
    usePlaygroundProgress({
      bars,
      barCount,
      onBarFinished: (curr, next) => {
        rendererRef.current?.nextBar()
      },
      onFinished: () => {
        router.back()
      },
    })

  const onHelpClick = useCallback(() => setHelpOpen((state) => !state), [])
  const onPlayClick = () => setPlaying((state) => !state)
  const onBackClick = () => rendererRef.current?.previousBar()
  const onForwardClick = () => rendererRef.current?.nextBar()
  const onUpClick = () => rendererRef.current?.toTop()

  return (
    <SafeAreaView className="flex-1 relative flex pt-6 pb-8 bg-background-primary">
      {/* Background */}
      <View
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: 0,
          bottom: 0,
        }}
      >
        <Avatar
          title={title as string}
          size={width * 1.5}
          borderRadius={0}
          tint="dark"
          fill
        />
        <LinearGradient
          colors={["rgba(0,0,0,0.4)", "#070707"]}
          className="absolute inset-0 aspect-square"
          style={{
            width: width * 1.5,
          }}
        />
      </View>

      {/* Close Handle */}
      <View
        className="flex items-center justify-center w-48 z-10 absolute"
        style={{
          top: top + 8,
          left: (width - 192) / 2,
        }}
      >
        <TouchableOpacity onPress={() => router.back()}>
          <BlurView
            tint="light"
            className="py-2 px-4 rounded-full flex-row items-center overflow-hidden opacity-95"
            style={{
              gap: 6,
            }}
          >
            <Text className="text-text-primary">End Playground</Text>
            <Ionicons name="stop" color="#fff" size={16} />
          </BlurView>
          {/* <View className="h-1 w-8 bg-white/40 rounded-full"></View> */}
          {/* <Ionicons name="chevron-down" color="#fff" size={20} /> */}
        </TouchableOpacity>
      </View>

      {/* Renderer */}

      {isSuccess ? (
        <MusicXMLRenderer
          onIndexChange={(index) => {
            if (currentBar != index) setBar(index)
          }}
          bars={bars}
          {...{ currentBar, barProgress, wrongAttempt }}
          ref={rendererRef}
        />
      ) : isError ? (
        <View className="flex-grow flex items-center justify-center">
          <Ionicons
            name="alert-circle-outline"
            color="rgb(239, 68, 68)"
            size={32}
          />
          <Text className="mt-3 text-red-500">Error loading the sheet.</Text>
        </View>
      ) : (
        <View className="flex-grow flex items-center justify-center">
          <ActivityIndicator />
          <Text className="mt-3 text-text-secondary">Loading the sheet...</Text>
        </View>
      )}

      {/* Title */}
      <View className="px-6 my-8 flex-row justify-between items-center">
        <View className="flex-row items-center" style={{ gap: 12 }}>
          <Avatar size={40} withTitleMark title={title as string} />
          <View className="flex">
            <Text className="text-xs mb-0.5 text-text-secondary">
              On Playground
            </Text>
            <Text className="font-medium text-text-primary">{title}</Text>
          </View>
        </View>
        <View
          className="flex-row items-center"
          style={{
            gap: 12,
          }}
        >
          <TouchableOpacity onPress={() => setVolumeOpen((state) => !state)}>
            <Ionicons
              name={volumeOpen ? "volume-high" : "volume-mute"}
              size={24}
              color={volumeOpen ? "#D7FC6E" : "#c0c0c0"}
            />
          </TouchableOpacity>
        </View>
      </View>

      {/* Modifiers */}

      <View className="px-6 mb-4 flex-row justify-between items-center">
        <TouchableOpacity className="opacity-75" onPress={onHelpClick}>
          <Ionicons
            name={helpOpen ? "musical-note-outline" : "musical-note"}
            size={24}
            color={helpOpen ? "#fff" : "#D7FC6E"}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={onBackClick}>
          <Ionicons name="play-back" size={28} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity onPress={onPlayClick}>
          <Ionicons name={playing ? "pause" : "play"} size={36} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity onPress={onForwardClick}>
          <Ionicons name="play-forward" size={28} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity onPress={onUpClick}>
          <Ionicons name="arrow-up" size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* Keyboard */}

      <View>
        <Keyboard helperOpen={helpOpen} onKeyPress={(key) => attempt(key)} />
      </View>
    </SafeAreaView>
  )
}
