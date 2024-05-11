import BarRenderer, {
  CANVAS_HEIGHT,
  NEGATIVE_MARGIN,
} from "@/components/renderer/bar-renderer"
import { forwardRef, useImperativeHandle, useRef } from "react"
import { Dimensions, FlatList, StyleSheet, View, Animated } from "react-native"
import { BlurView } from "@candlefinance/blur-view"

type MusicXMLRendererProps = {}

const MusicXMLRenderer = forwardRef<View, MusicXMLRendererProps>(({}, ref) => {
  const offsetY = useRef(new Animated.Value(0)).current

  return (
    <Animated.FlatList
      data={new Array(10).fill(null)}
      snapToInterval={CANVAS_HEIGHT + 2 * NEGATIVE_MARGIN}
      showsVerticalScrollIndicator={false}
      decelerationRate={0}
      contentContainerStyle={{
        alignItems: "center",
      }}
      keyExtractor={(_, i) => `item-${i}`}
      renderItem={({ item, index }) => {
        const itemSize = CANVAS_HEIGHT + 2 * NEGATIVE_MARGIN

        if (index == 0 || index == 9)
          return (
            <View
              style={{
                height: itemSize,
              }}
            ></View>
          )

        const inputRange = [
          (index - 3) * itemSize,
          (index - 2) * itemSize,
          (index - 1) * itemSize,
          index * itemSize,
          (index + 1) * itemSize,
        ]

        const opacity = offsetY.interpolate({
          inputRange,
          outputRange: [0, 0.5, 1, 0.2, 0],
        })

        const scale = offsetY.interpolate({
          inputRange,
          outputRange: [0.9, 0.95, 1, 0.95, 0.9],
        })

        const translateY = offsetY.interpolate({
          inputRange,
          outputRange: [10, 0, 0, 0, -10],
        })

        return (
          <Animated.View
            style={{
              opacity,
              transform: [{ scale }, { translateY }],
            }}
          >
            <BarRenderer />
          </Animated.View>
        )
      }}
      scrollEventThrottle={16}
      onScroll={Animated.event(
        [
          {
            nativeEvent: {
              contentOffset: { y: offsetY },
            },
          },
        ],
        { useNativeDriver: true }
      )}
    ></Animated.FlatList>
  )
})

export default MusicXMLRenderer
