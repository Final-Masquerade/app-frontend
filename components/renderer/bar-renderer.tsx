import { Canvas, Group, Circle, Line, vec } from "@shopify/react-native-skia"
import { BlurView } from "expo-blur"
import { View, useWindowDimensions } from "react-native"

const STAFF_WIDTH = 20
const STAFF_STROKE_WIDTH = 1
const PADDING = {
  x: 24,
  y: 24,
} as const

type BarRendererProps = {
  title?: string
  tokens: Token[]
} & ({ withClef?: true; clef: string } | { withClef?: false })

export default function BarRenderer({ tokens, withClef }: BarRendererProps) {
  const { width, height } = useWindowDimensions()
  const canvasWidth = width - 2 * PADDING.x
  const canvasHeight = STAFF_WIDTH * 4 + STAFF_STROKE_WIDTH + 2 * PADDING.y

  return (
    <BlurView
      intensity={50}
      tint="systemMaterial"
      className="rounded-lg overflow-hidden flex items-center justify-center"
    >
      <Canvas
        style={{
          width: canvasWidth,
          height: canvasHeight,
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
              key={`staff-line-${i}`}
              p1={vec(
                PADDING.x,
                STAFF_STROKE_WIDTH / 2 + i * STAFF_WIDTH + PADDING.y
              )}
              p2={vec(
                canvasWidth - PADDING.x,
                STAFF_STROKE_WIDTH / 2 + i * STAFF_WIDTH + PADDING.y
              )}
              color="rgba(255, 255, 255, 0.5)"
              style="stroke"
              strokeWidth={STAFF_STROKE_WIDTH}
            />
          ))}
        </Group>
        {tokens.map((token, i) => {
          const { x, y } = calculateStaffLayout(tokens, 100, i)

          if (token.grouping === "single") {
            return <Circle cx={10} cy={10} r={8} color="white" />
          }
          return null
        })}
      </Canvas>
    </BlurView>
  )
}

const calculateStaffLayout = (
  tokens: Token[],
  staffWidth: number,
  index: number
) => {
  return {
    x: null,
    y: null,
  }
}
