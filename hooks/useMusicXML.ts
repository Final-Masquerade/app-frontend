import { Bar, Note } from "@/components/renderer/tokens"
import { useEffect, useState } from "react"
import XMLParser from "react-xml-parser"

const parser = new XMLParser()

export default function useMusicXML(data: string) {
  const [barCount, setBarCount] = useState<number>(0)
  const [bars, setBars] = useState<Array<Bar>>([])

  useEffect(() => {
    if (!data) return

    const xml = parser.parseFromString(data)

    const firstPart = xml.getElementsByTagName("part").at(0)

    const measures: Array<any> = firstPart.getElementsByTagName("measure")
    setBarCount(measures.length)

    const nonEmptyBars = []

    for (let i = 0; i < measures.length; i++) {
      const getClefType = (measure: any) => {
        const clefs = measure.getElementsByTagName("clef")

        if (clefs.length === 0) return "G"

        return clefs.at(0).getElementsByTagName("sign").at(0).value
      }

      const getTime = (measure: any) => {
        if (measure.getElementsByTagName("time").length == 0) return undefined

        const time = measure.getElementsByTagName("time").at(0)
        const beats = time.getElementsByTagName("beats").at(0).value
        const beatType = time.getElementsByTagName("beat-type").at(0).value

        return `${beats}/${beatType}`
      }

      const getNotes = (measure: any) => {
        const notes = measure.getElementsByTagName("note")

        return notes.map((tag: any) => {
          const note = {} as Note

          const rest = tag.getElementsByTagName("rest")
          const pitch = tag.getElementsByTagName("pitch")

          note.isRest = rest.length > 0 ? true : false
          note.time = tag.getElementsByTagName("type").at(0).value

          note.pitch = pitch.at(0)?.getElementsByTagName("step")?.at(0)?.value
          note.octave = pitch
            ?.at(0)
            ?.getElementsByTagName("octave")
            ?.at(0)?.value

          // Add alter and key

          return note
        }) as Note[]
      }

      const bar: Bar = {
        index: i,
        hasClef:
          i == 0 || measures.at(i).getElementsByTagName("clef").length > 0,
        time: i == 0 ? getTime(measures.at(i)) : undefined,
        clefType: getClefType(measures.at(i)),
        notes: getNotes(measures.at(i)),
      }

      if (bar.notes.length > 0) nonEmptyBars.push(bar)
    }

    setBars(nonEmptyBars)
  }, [data])

  return { barCount, bars }
}
