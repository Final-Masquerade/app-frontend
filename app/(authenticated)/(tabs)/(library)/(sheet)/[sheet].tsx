import Avatar from "@/components/ui/avatar"
import { useLocalSearchParams, useNavigation } from "expo-router"
import { useEffect, useRef } from "react"
import {
  Dimensions,
  NativeScrollEvent,
  NativeSyntheticEvent,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  Animated,
} from "react-native"
import { LinearGradient } from "expo-linear-gradient"
import { useQuery } from "@tanstack/react-query"
import { useAuth } from "@clerk/clerk-expo"
import Button from "@/components/ui/button"
import { Ionicons } from "@expo/vector-icons"
import TimeAgo from "javascript-time-ago"
import en from "javascript-time-ago/locale/en"
import Form, { FormItem } from "@/components/ui/form"
import { interpolate } from "react-native-reanimated"
import { BlurView } from "expo-blur"

const useAnimatedLatestValueRef = (
  animatedValue: Animated.Value,
  initial?: number
) => {
  //If we're given an initial value then we can pretend we've received a value from the listener already
  const latestValueRef = useRef(initial ?? 0)
  const initialized = useRef(typeof initial == "number")

  useEffect(() => {
    const id = animatedValue.addListener((v) => {
      //Store the latest animated value
      latestValueRef.current = v.value
      //Indicate that we've recieved a value
      initialized.current = true
    })

    //Return a deregister function to clean up
    return () => animatedValue.removeListener(id)

    //Note that the behavior here isn't 100% correct if the animatedValue changes -- the returned ref
    //may refer to the previous animatedValue's latest value until the new listener returns a value
  }, [animatedValue])

  return [latestValueRef, initialized] as const
}

TimeAgo.addLocale(en)

const formatter = new TimeAgo("en-US")

export default function SheetMeta() {
  const { sheet: sheetId }: { sheet: string } = useLocalSearchParams()
  const width = Dimensions.get("window").width
  const { getToken } = useAuth()
  const yOffset = useRef(new Animated.Value(0)).current
  const cover = useRef()
  const background = useRef<View>(null)

  const [value] = useAnimatedLatestValueRef(yOffset, 0)

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

  const handleScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const headerOpacity = interpolate(
      e.nativeEvent.contentOffset.y,
      [0, 400],
      [0, 1],
      "clamp"
    )

    if (background.current) {
      background.current.setNativeProps({ opacity: 1 - headerOpacity })
    }

    console.log(headerOpacity)
  }

  if (isPending) return <View></View>

  return (
    <View className="flex-1 relative">
      <Animated.View
        className="flex justify-center absolute top-0 z-10 left-0 right-0"
        style={{
          opacity: yOffset.interpolate({
            inputRange: [250, 300],
            outputRange: [0, 1],
            extrapolate: "clamp",
          }),
          pointerEvents: "none",
        }}
      >
        <BlurView className="h-14 w-full flex px-6 flex-row items-center justify-between bg-black/50 border-b border-neutral-900">
          <View className="flex flex-row gap-2 items-center">
            <Text className="text-text-primary font-semibold mb-0.5">
              {data.name}
            </Text>
            <Ionicons name="ellipse" color="#fff" size={6} />
            <Text className="text-text-secondary text-xs">
              {formatter.format(new Date(data.createdAt))}
            </Text>
          </View>
          <TouchableOpacity className="h-full flex justify-center">
            <Ionicons name="ellipsis-horizontal" color="#fff" size={20} />
          </TouchableOpacity>
        </BlurView>
      </Animated.View>
      <View ref={background}>
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
      </View>
      <LinearGradient
        colors={["rgba(7,7,7, 0.1)", "#070707"]}
        locations={[0, 0.8]}
        className="absolute top-0 left-0 right-0 w-full aspect-square"
      />
      <Animated.ScrollView
        onScroll={Animated.event(
          [
            {
              nativeEvent: {
                contentOffset: {
                  y: yOffset,
                },
              },
            },
          ],
          {
            useNativeDriver: true,
            listener: (event) => {
              // @ts-ignore
              handleScroll(event)
            },
          }
        )}
        scrollEventThrottle={16}
        contentContainerStyle={{
          marginHorizontal: 16,
          paddingBottom: 64,
        }}
      >
        <Animated.View
          style={{
            transform: [
              {
                translateY: yOffset,
              },
            ],
          }}
          className="w-full flex items-end justify-center h-14 px-2 z-10"
        >
          <TouchableOpacity onPress={() => console.log("clikc")}>
            <Ionicons name="ellipsis-horizontal" color="#fff" size={20} />
          </TouchableOpacity>
        </Animated.View>

        <Animated.View
          className="w-full flex items-center mt-4 mb-8"
          style={{
            gap: 16,
            transform: [
              {
                scale: yOffset.interpolate({
                  inputRange: [-200, 0, 400],
                  outputRange: [1.15, 1, 0.9],
                  extrapolate: "clamp",
                }),
              },
            ],
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
        </Animated.View>
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
      </Animated.ScrollView>
    </View>
  )
}
