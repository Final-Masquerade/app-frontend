import { Canvas, Group, Circle, Line, vec } from "@shopify/react-native-skia"
import { BlurView } from "expo-blur"
import { View, useWindowDimensions } from "react-native"
import VexCanvas from "@/components/renderer/VexCanvas.jsx"
import {
  Stave,
  StaveNote,
  Note,
  NoteStruct,
  Voice,
  Formatter,
  StaveModifier,
  ElementStyle,
  StemmableNote,
  VoiceMode,
  Beam,
} from "vexflow"

export const CANVAS_HEIGHT = 256
export const NEGATIVE_MARGIN = -64

const successStyle = {
  fillStyle: "rgb(100, 255, 100)",
  strokeStyle: "rgb(100, 255, 100)",
} as ElementStyle

const failStyle = {
  fillStyle: "rgb(255, 100, 100)",
  strokeStyle: "rgb(255, 100, 100)",
} as ElementStyle

type BarRendererProps = {
  noClef?: boolean
}

export default function BarRenderer({ noClef }: BarRendererProps) {
  const { width, height } = useWindowDimensions()

  const canvasWidth = width - 24 * 2

  const draw = (ref: any) => {
    const context = ref.getContext() // get the context from the canvas.
    context.clear() // To have a clean canvas in every render.

    const stave = new Stave(0, 0, canvasWidth * 0.95, {
      spacing_between_lines_px: 16,
      fill_style: "rgba(255,255,255,0.5)",
      left_bar: false,
      right_bar: false,
    })
    stave.setX((canvasWidth - stave.getWidth()) / 2).setY(24)

    if (!noClef)
      stave.addClef("treble").addTimeSignature("9/4").addKeySignature("A")

    stave.applyStyle(context, {
      fillStyle: "white",
    })

    stave.setContext(context)
    stave.draw()

    const notes = [
      new StaveNote({ keys: ["e/5"], duration: "q", auto_stem: true }),
      new StaveNote({ keys: ["c/4"], duration: "q", auto_stem: true }),
      new StaveNote({ keys: ["e/5"], duration: "16", auto_stem: true }),
      new StaveNote({ keys: ["c/5"], duration: "16", auto_stem: true }),
      new StaveNote({ keys: ["d/5"], duration: "8", auto_stem: true }),
      new StaveNote({
        keys: ["b/4"],
        duration: "q",
        auto_stem: true,
        type: "r",
      }),
      new StaveNote({
        keys: ["c/4", "e/4"],
        duration: "16",
        auto_stem: true,
      }),
    ]

    const voice: Voice = new Voice({ num_beats: 4, beat_value: 4 }).setMode(
      VoiceMode.SOFT
    )
    voice.addTickables(notes)

    voice.applyStyle(context, {
      strokeStyle: "white",
    })

    new Formatter()
      .joinVoices([voice])
      .format([voice], stave.getWidth() - stave.getModifierXShift() - 10)

    const beams = Beam.applyAndGetBeams(voice)

    voice.draw(context, stave)
    beams.forEach((beam) => {
      beam.setContext(context)
      beam.draw()
    })
  }

  return (
    <View
      className="rounded-lg overflow-hidden flex items-center justify-center"
      style={{
        marginVertical: NEGATIVE_MARGIN,
      }}
    >
      <VexCanvas
        width={canvasWidth}
        height={CANVAS_HEIGHT}
        draw={draw}
      ></VexCanvas>
    </View>
  )
}
