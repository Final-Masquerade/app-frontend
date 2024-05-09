import { Children, ReactNode, forwardRef } from "react"
import {
  ActivityIndicator,
  Text,
  ButtonProps as RNButtonProps,
  TouchableOpacityProps,
  TouchableOpacity,
} from "react-native"

type ButtonProps = {
  loading?: boolean
  title?: string
  children?: ReactNode
} & TouchableOpacityProps

function Button(
  { loading = false, title, children, ...rest }: ButtonProps,
  ref: React.LegacyRef<TouchableOpacity>
) {
  return (
    <TouchableOpacity
      {...rest}
      ref={ref}
      className="bg-accent w-full rounded-full flex flex-row items-center justify-center h-14"
    >
      {loading ? (
        <ActivityIndicator color="#000" />
      ) : title != null ? (
        <Text className="font-gilroy-semibold text-lg">{title}</Text>
      ) : (
        children
      )}
    </TouchableOpacity>
  )
}

export default forwardRef(Button)
