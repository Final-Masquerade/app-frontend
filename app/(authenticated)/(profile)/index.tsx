import { useUser } from "@clerk/clerk-expo"
import {
  Image,
  ScrollView,
  Text,
  View,
  Animated as A,
  Animated,
  NativeSyntheticEvent,
  NativeScrollEvent,
  ImageComponent,
} from "react-native"
import { BlurView } from "expo-blur"
import { LinearGradient } from "expo-linear-gradient"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { useEffect, useRef } from "react"
import { useNavigation } from "expo-router"
import { interpolate } from "react-native-reanimated"

const HEADER_HEIGHT = 56

const Header = ({ opacity = 0 }: { opacity?: number }) => (
  <Animated.View
    style={{
      height: HEADER_HEIGHT,
    }}
    className="flex justify-center relative"
  >
    <BlurView
      className="w-full h-full absolute border-b border-b-white/5"
      style={{
        opacity,
      }}
      tint="prominent"
    />
    <Text className="text-[#e5e5e7] text-center font-semibold text-[17px]">
      Profile
    </Text>
  </Animated.View>
)

export default function Profile() {
  const { user } = useUser()
  const navigation = useNavigation()

  const background = useRef(null)
  const yOffset = useRef(new Animated.Value(0)).current

  const handleScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const headerOpacity = interpolate(
      e.nativeEvent.contentOffset.y,
      [0, 200],
      [0, 1],
      "clamp"
    )

    // @ts-ignore
    background.current.setNativeProps({ opacity: 1 - headerOpacity })

    navigation.setOptions({
      headerStyle: {
        opacity: headerOpacity,
      },
      headerBackground: () => <Header opacity={headerOpacity} />,
      headerTransparent: true,
    })
  }

  useEffect(() => {
    navigation.setOptions({
      headerStyle: {
        opacity: 1,
      },
      headerBackground: () => <Header />,

      headerTransparent: true,
    })
  }, [])

  return (
    <View className="flex-1 bg-background-primary">
      <Image
        ref={background}
        source={{ uri: user?.imageUrl }}
        resizeMode="cover"
        className="absolute top-0 left-0 right-0 w-full aspect-square"
      />
      <BlurView className="absolute top-0 left-0 right-0 w-full aspect-square" />
      <LinearGradient
        colors={["rgba(7,7,7, 0.9)", "#070707"]}
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
        contentInsetAdjustmentBehavior="automatic"
      >
        {new Array(100).fill(null).map((_, i) => (
          <Text
            key={`line-${i}`}
            className="text-text-secondary font-medium mb-4 text-center"
          >
            Line {i}
          </Text>
        ))}
      </Animated.ScrollView>
    </View>
  )
}
