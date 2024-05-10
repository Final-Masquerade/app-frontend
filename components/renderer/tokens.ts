type NoteTime = "whole" | "half" | "quarter" | "eighth" | "sixteenth"

type Note =
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
  | "Ch"
  | "C#h"
  | "Dh"
  | "D#h"
  | "Eh"
  | "Fh"
  | "F#h"
  | "Gh"
  | "G#h"

type SingleToken = {
  grouping: "single"
  timing: NoteTime
  value: Note
}

type GroupToken = {
  grouping: "multiple"
  timing: Exclude<NoteTime, "whole" | "half" | "quarter">
  tokens: Array<{ value: Note }>
}

type Token = SingleToken | GroupToken
