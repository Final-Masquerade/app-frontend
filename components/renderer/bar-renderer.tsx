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
import { Bar } from "@/components/renderer/tokens"

export const CANVAS_HEIGHT = 256
export const NEGATIVE_MARGIN = -64

const successStyle = {
  fillStyle: "rgb(60, 255, 60)",
  strokeStyle: "rgb(60, 255, 60)",
} as ElementStyle

const failStyle = {
  fillStyle: "rgb(255, 60, 60)",
  strokeStyle: "rgb(255, 60, 60)",
} as ElementStyle

const baseStyle = {
  strokeStyle: "white",
  fillStyle: "white",
} as ElementStyle

type BarRendererProps = {
  bar: Bar
  complete: boolean
  focused: boolean
  progress: number
  hasWrongAttempt: boolean
}

export default function BarRenderer({
  bar,
  complete,
  focused,
  hasWrongAttempt,
  progress,
}: BarRendererProps) {
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

    if (bar.hasClef) {
      stave.addClef(bar.clefType === "G" ? "treble" : "bass")
      // stave.setTempo({ bpm: 120, duration: "q" }, 0)
    }
    if (bar.time) {
      try {
        stave.addTimeSignature(bar.time)
      } catch (e) {
        console.log(e)
      }
    }

    stave.applyStyle(context, {
      fillStyle: "white",
    })

    stave.setContext(context)
    stave.draw()

    const notes: StaveNote[] = bar.notes.map((e, i) => {
      const getDuration = () => {
        switch (e.time) {
          case "64th":
            return "64"
          case "32nd":
            return "32"
          case "16th":
            return "16"
          case "eighth":
            return "8"
          case "quarter":
            return "q"
          case "half":
            return "h"
          case "whole":
            return "w"
          default:
            return "q"
        }
      }

      if (e.isRest) {
        const n = new StaveNote({
          keys: ["c/5"],
          duration: getDuration(),
          type: "r",
        })

        return n
      } else {
        const n = new StaveNote({
          keys: [`${e.pitch?.toLowerCase() || "c"}/${e.octave}`],
          duration: getDuration(),
          auto_stem: true,
        })

        if (complete || (focused && progress === bar.notes.length))
          return n.setStyle(successStyle)

        n.setStyle(baseStyle)

        if (focused && i < progress) n.setStyle(successStyle)

        if (focused && hasWrongAttempt && i == progress) n.setStyle(failStyle)
        return n
      }
    })

    const voice: Voice = new Voice({ num_beats: 4, beat_value: 4 }).setMode(
      VoiceMode.SOFT
    )
    voice.addTickables(notes)

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
