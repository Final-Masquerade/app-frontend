import BarRenderer, {
  CANVAS_HEIGHT,
  NEGATIVE_MARGIN,
} from "@/components/renderer/bar-renderer"
import { Bar } from "@/components/renderer/tokens"
import { Fragment, forwardRef, useImperativeHandle, useRef } from "react"
import { FlatList, View, Animated, Text } from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"

export type RendererRefHandle = {
  previousBar: () => void
  nextBar: () => void
  toTop: () => void
}

export type MusicXMLRendererProps = {
  bars: Bar[]
  onIndexChange: (index: number) => void
  currentBar: number
  barProgress: number
  wrongAttempt: boolean
}

const itemSize = CANVAS_HEIGHT + 2 * NEGATIVE_MARGIN

const MusicXMLRenderer = forwardRef<RendererRefHandle, MusicXMLRendererProps>(
  ({ bars, onIndexChange, barProgress, currentBar, wrongAttempt }, ref) => {
    const flatlist = useRef<FlatList>(null)

    const { top } = useSafeAreaInsets()
    const tip = useRef(
      tips[Math.round(Math.random() * (tips.length - 1))]
    ).current

    useImperativeHandle(ref, () => {
      return {
        nextBar: () => {
          // @ts-ignore
          const offset = flatlist.current?._listRef?._scrollMetrics?.offset
          const elementHeight = CANVAS_HEIGHT + 2 * NEGATIVE_MARGIN

          if (offset % elementHeight !== 0) return

          let scrollPosition = offset + elementHeight

          scrollPosition =
            Math.round(scrollPosition / elementHeight) * elementHeight

          flatlist.current?.scrollToOffset({
            offset: scrollPosition,
          })
        },
        previousBar: () => {
          // @ts-ignore
          const offset = flatlist.current?._listRef?._scrollMetrics?.offset
          const elementHeight = CANVAS_HEIGHT + 2 * NEGATIVE_MARGIN

          let scrollPosition = offset - elementHeight
          scrollPosition =
            Math.round(scrollPosition / elementHeight) * elementHeight

          flatlist.current?.scrollToOffset({
            offset: scrollPosition,
          })
        },
        toTop: () => {
          flatlist.current?.scrollToIndex({ index: 0 })
        },
      }
    })

    const offsetY = useRef(new Animated.Value(0)).current

    return (
      <Fragment>
        {/* Tip */}
        <Animated.Text
          className="text-text-primary text-center absolute"
          style={{
            top: top + 84,
            left: 0,
            right: 0,
            opacity: offsetY.interpolate({
              inputRange: [0, 50],
              outputRange: [1, 0],
              extrapolate: "clamp",
            }),
            transform: [
              {
                scale: offsetY.interpolate({
                  inputRange: [0, 50],
                  outputRange: [1, 0.95],
                  extrapolate: "clamp",
                }),
              },
            ],
          }}
        >
          <Text className="font-semibold text-accent">Tip: </Text>
          <Text>{tip}</Text>
        </Animated.Text>

        {/* Renderer */}
        <Animated.FlatList
          ref={flatlist}
          data={[null, ...bars, null]}
          snapToInterval={CANVAS_HEIGHT + 2 * NEGATIVE_MARGIN}
          showsVerticalScrollIndicator={false}
          decelerationRate={0}
          contentContainerStyle={{
            alignItems: "center",
          }}
          keyExtractor={(_, i) => `item-${i}`}
          renderItem={({ item, index }) => {
            if (index == 0 || index == bars.length + 1)
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
              outputRange: [0, 0.4, 1, 0.2, 0],
              extrapolate: "clamp",
            })

            const scale = offsetY.interpolate({
              inputRange,
              outputRange: [0.9, 0.95, 1, 0.95, 0.9],
              extrapolate: "clamp",
            })

            const translateY = offsetY.interpolate({
              inputRange,
              outputRange: [10, 0, 0, 0, -10],
              extrapolate: "clamp",
            })

            return (
              <Animated.View
                style={{
                  height: itemSize,
                  opacity,
                  transform: [{ scale }, { translateY }],
                }}
              >
                <BarRenderer
                  focused={index - 1 == currentBar}
                  complete={index - 1 < currentBar}
                  progress={barProgress}
                  bar={item}
                  hasWrongAttempt={wrongAttempt}
                />
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
            {
              useNativeDriver: true,
              listener(event) {
                let index = Math.floor(
                  // @ts-ignore
                  event.nativeEvent.contentOffset.y / itemSize
                )

                if (index < 0) index = 0
                if (index >= bars.length) index = bars.length - 1

                onIndexChange(index)
              },
            }
          )}
        />
      </Fragment>
    )
  }
)

const tips = [
  "Use piano to practice on mobile.",
  "Toggle on note labels to ease things up.",
]

export default MusicXMLRenderer
