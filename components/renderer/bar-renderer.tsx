import { Canvas, Group, Circle, Line, vec } from "@shopify/react-native-skia"
import { View, useWindowDimensions } from "react-native"

const STAFF_WIDTH = 24
const STAFF_STROKE_WIDTH = 1

type BarRendererProps = {
  withClef?: boolean
}

export default function BarRenderer({}: BarRendererProps) {
  const { width, height } = useWindowDimensions()
  const canvasWidth = width - 2 * (24 + 16)
  const canvasHeight = STAFF_WIDTH * 4 + STAFF_STROKE_WIDTH

  return (
    <View className="bg-white/0 px-4 py-6 rounded-lg flex items-center justify-center">
      <Canvas
        style={{
          width: canvasWidth,
          height: canvasHeight,
          // borderColor: "white",
          // borderWidth: 1,
        }}
      >
        <Group
          transform={[{ scale: 1 }]}
          origin={{
            x: canvasWidth / 2,
            y: canvasHeight / 2,
          }}
        >
          {new Array(5).fill(null).map((_, i) => (
            <Line
              p1={vec(0, STAFF_STROKE_WIDTH / 2 + i * STAFF_WIDTH)}
              p2={vec(canvasWidth, STAFF_STROKE_WIDTH / 2 + i * STAFF_WIDTH)}
              color="white"
              style="stroke"
              strokeWidth={STAFF_STROKE_WIDTH}
            />
          ))}
        </Group>
      </Canvas>
    </View>
  )
}
