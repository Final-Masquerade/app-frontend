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
import { Bar } from "@/hooks/useMusicXML"

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
  bar: Bar
}

export default function BarRenderer({ bar }: BarRendererProps) {
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

    if (bar.hasClef) stave.addClef(bar.clefType === "G" ? "treble" : "bass")

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

    const notes: StaveNote[] = []

    bar.notes.forEach((e) => {
      const getDuration = () => {
        switch (e.duration) {
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
      let n
      if (e.isRest)
        n = new StaveNote({
          keys: ["c/5"],
          duration: getDuration(),
          type: "r",
        })
      else
        n = new StaveNote({
          keys: [`${e.pitch?.toLowerCase() || "c"}/${e.octave}`],
          duration: getDuration(),
          auto_stem: true,
        })

      notes.push(n)
    })

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
