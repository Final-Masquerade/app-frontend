export type NoteTime =
  | "64th"
  | "32nd"
  | "16th"
  | "eighth"
  | "quarter"
  | "half"
  | "whole"

export type Clef = "G" | "F" | "C"

export type Key =
  | "C"
  | "C#"
  | "D"
  | "D#"
  | "E"
  | "F"
  | "F#"
  | "G"
  | "G#"
  | "A"
  | "A#"
  | "B"

export type Note = {
  isRest: boolean
  time: NoteTime
  pitch?: string
  octave?: string
}

export type Bar = {
  index: number
  hasClef: boolean
  clefType?: Clef
  time?: string
  notes: Note[]
}
