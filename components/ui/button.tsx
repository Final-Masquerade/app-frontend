import {
  ActivityIndicator,
  Text,
  ButtonProps as RNButtonProps,
  TouchableOpacityProps,
  TouchableOpacity,
} from "react-native"

type ButtonProps = {
  loading?: boolean
  title: string
} & TouchableOpacityProps

export default function Button({
  loading = false,
  title,
  ...rest
}: ButtonProps) {
  return (
    <TouchableOpacity
      {...rest}
      className="bg-accent w-full rounded-full flex flex-row items-center justify-center h-14"
    >
      {loading ? (
        <ActivityIndicator color="#000" />
      ) : (
        <Text className="font-gilroy-semibold text-lg">{title}</Text>
      )}
    </TouchableOpacity>
  )
}
