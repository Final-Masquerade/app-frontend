import BarRenderer from "@/components/renderer/bar-renderer"
import { forwardRef, useImperativeHandle } from "react"
import { View } from "react-native"

type MusicXMLRendererProps = {}

const MusicXMLRenderer = forwardRef<View, MusicXMLRendererProps>(({}, ref) => {
  //   useImperativeHandle(ref, () => {
  //     return {
  //       close: () => {},
  //     }
  //   })

  return (
    <View className="flex-1 flex items-center justify-center px-6" style={{}}>
      <View className="opacity-30 scale-95">
        <BarRenderer noClef />
      </View>

      <BarRenderer />
      <View className="opacity-50 scale-95">
        <BarRenderer noClef />
      </View>
    </View>
  )
})

export default MusicXMLRenderer
