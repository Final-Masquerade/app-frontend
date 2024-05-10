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
    <View className="flex-1 flex items-center justify-center px-6">
      <BarRenderer
        tokens={[
          { grouping: "single", timing: "quarter", value: "A" },
          { grouping: "single", timing: "quarter", value: "B" },
          { grouping: "single", timing: "quarter", value: "C" },
          { grouping: "single", timing: "quarter", value: "D" },
        ]}
      />
    </View>
  )
})

export default MusicXMLRenderer
