import { Text, View, ViewProps, ViewStyle } from "react-native"
// @ts-ignore
import BooringAvatars from "@ukashu/boring-avatars-react-native"
import { BlurView } from "expo-blur"
import Animated from "react-native-reanimated"

type AvatarProps = {
  title?: string
  size: number
  withTitleMark?: boolean
  blur?: boolean
  style?: ViewStyle
  borderRadius?: number
  tint?: "dark" | "light"
  fill?: boolean
  sharedTransitionTag?: string
} & ViewProps

export default function Avatar({
  title = "WTF",
  size,
  withTitleMark = false,
  blur = true,
  style,
  borderRadius = 4,
  tint = "light",
  sharedTransitionTag,
  fill,
  className,
  ...rest
}: AvatarProps) {
  return (
    <Animated.View
      {...rest}
      sharedTransitionTag={sharedTransitionTag}
      className="overflow-hidden relative"
      style={{
        width: size,
        height: size,
        borderRadius,
        // @ts-ignore
        ...style,
      }}
    >
      {withTitleMark && (
        <Text
          className="text-black absolute z-10 font-gilroy-bold"
          style={{
            fontSize: size / 6,
            bottom: size / 8,
            right: size / 8,
          }}
        >
          {title.split(" ").reduce((prev, item) => (prev += item.at(0)), "")}
        </Text>
      )}
      <BooringAvatars
        // @ts-ignore
        name={title}
        size={size}
        variant="marble"
        square
        colors={["#49007E", "#FF7D10", "#FF005B", "#FFB238"]}
      />
      <BlurView
        intensity={25 * (size / 72)}
        tint={tint}
        className="inset-0 absolute  w-full h-full"
      />
    </Animated.View>
  )
}
