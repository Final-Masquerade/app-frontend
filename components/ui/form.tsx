import { Children, ReactNode, cloneElement } from "react"
import { Text, View } from "react-native"

type FormProps = {
  title?: string
  children: ReactNode
}

export default function Form({ title, children }: FormProps) {
  return (
    <View className="w-full">
      {!!title && (
        <Text className="text-text-secondary uppercase font-medium mb-2 pl-2 opacity-80 text-xs">
          {title}
        </Text>
      )}
      <View className="bg-background-secondary w-full h-auto overflow-hidden rounded-xl pl-4">
        {Children.toArray(children).map((child, i, arr) =>
          // @ts-ignore
          cloneElement(child, { index: arr.length - i - 1 })
        )}
      </View>
    </View>
  )
}

type FormItemProps = {
  title: string
  value: string
  index?: number
  capitalized?: boolean
}

export function FormItem({
  title,
  value,
  index,
  capitalized = true,
}: FormItemProps) {
  return (
    <View
      className="w-full h-12 flex items-center justify-between flex-row pr-4 border-white/10"
      style={{
        borderBottomWidth: index == 0 ? 0 : 1,
      }}
    >
      <Text className="text-text-primary">{title}</Text>
      <Text
        className={`text-text-secondary ${capitalized ? "capitalize" : ""}`}
      >
        {value}
      </Text>
    </View>
  )
}
