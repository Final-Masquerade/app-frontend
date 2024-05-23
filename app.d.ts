/// <reference types="nativewind/types" />

declare module "react-xml-parser"
declare module "react-native-midi-playback"

declare module "*.svg" {
  import React from "react"
  import { SvgProps } from "react-native-svg"
  const content: React.FC<SvgProps>
  export default content
}
