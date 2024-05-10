import { LinearGradient } from "expo-linear-gradient"
import { useEffect, useState } from "react"
import { Text, TouchableOpacity, View } from "react-native"

const NOTES: {
  white: Array<Note | null>
  black: Array<Note | null>
} = {
  white: ["F", "G", "A", "B", "C", "D", "E"],
  black: ["F#", "G#", "A#", null, "C#", "D#"],
}

type KeyboardProps = {
  onKeyPress: (key: Note) => void
  helperOpen?: boolean
}

export default function Keyboard({ onKeyPress, helperOpen }: KeyboardProps) {
  const [keyboardWidth, setKeyboardWidth] = useState<number>(0)

  return (
    <View className="mx-6 pt-4 relative">
      <View
        className="w-full flex-row justify-between"
        style={{
          gap: 4,
        }}
      >
        {new Array(7).fill(null).map((_, i) => (
          <TouchableOpacity
            onPress={() => onKeyPress(NOTES.white.at(i) as Note)}
            key={`white-key${i}`}
            onLayout={(e) => setKeyboardWidth(e.nativeEvent.layout.width)}
            className="flex-grow aspect-[0.315] bg-white/95 rounded-lg flex items-center justify-end pb-3"
            style={{
              ...(i === 0 && {
                borderBottomLeftRadius: 16,
                borderTopLeftRadius: 12,
              }),
              ...(i === 6 && {
                borderBottomRightRadius: 16,
                borderTopRightRadius: 12,
              }),
            }}
          >
            <Text
              className="font-bold text-xs transition-opacity"
              style={{
                opacity: helperOpen ? 0 : 1,
              }}
            >
              {NOTES.white.at(i) as string}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      {new Array(6).fill(null).map((_, i) =>
        i !== 3 ? (
          <TouchableOpacity
            onPress={() => onKeyPress(NOTES.black.at(i) as Note)}
            key={`black-key${i}`}
            className="rounded-lg shadow-md shadow-black/20 absolute aspect-[0.5] overflow-hidden border-black bg-black flex items-center justify-end pb-3"
            style={{
              width: keyboardWidth,
              top: 8,
              left: keyboardWidth / 2 + i * (keyboardWidth + 4),
            }}
          >
            <LinearGradient
              colors={["rgb(20,20,20)", "black"]}
              className="absolute top-0 w-full h-full"
            />
            <Text
              className="font-semibold text-xs text-accent/75 transition-opacity"
              style={{
                opacity: helperOpen ? 0 : 1,
              }}
            >
              {NOTES.black.at(i) as string}
            </Text>
          </TouchableOpacity>
        ) : null
      )}
    </View>
  )
}
