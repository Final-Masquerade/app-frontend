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
    <View className="flex-1 flex items-center justify-center">
      <BarRenderer />
    </View>
  )
})

export default MusicXMLRenderer
