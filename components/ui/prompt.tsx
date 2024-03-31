import { BlurView } from "expo-blur"
import { Fragment, ReactElement, ReactNode } from "react"
import {
  Alert,
  Modal,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
} from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { FullWindowOverlay } from "react-native-screens"

type PromptProps = {
  open: boolean
  setOpen: (state: boolean) => void
  children: ReactNode
  confirmText?: string
  onConfirmPress: () => void
  title?: string | (() => JSX.Element)
  dim?: boolean
} & (
  | {
      withCancel?: true
      onCancelPress: () => void
      cancelText?: string
    }
  | {
      withCancel?: false
      onCancelPress?: () => void
      cancelText?: string
    }
)

export default function Prompt({
  open,
  setOpen,
  children,
  confirmText = "Confirm",
  onConfirmPress,
  withCancel = false,
  onCancelPress,
  cancelText = "Cancel",
  title: Title,
  dim = true,
}: PromptProps) {
  const { bottom } = useSafeAreaInsets()

  return (
    <Modal
      animationType="slide"
      transparent
      hardwareAccelerated
      visible={open}
      onRequestClose={() => setOpen(!open)}
    >
      <View
        className="w-full mt-auto px-2 space-y-2"
        style={{
          marginBottom: bottom,
        }}
      >
        <BlurView
          tint="prominent"
          className="overflow-hidden rounded-2xl bg-black/90"
        >
          {!!Title && (
            <View className="border-b border-white/5">
              {typeof Title === "string" ? (
                <Text className="text-center font-medium text-accent/80 py-3">
                  {Title}
                </Text>
              ) : (
                <Title />
              )}
            </View>
          )}
          {children}
          <View className="border-t border-white/5">
            <TouchableOpacity
              onPress={onConfirmPress}
              className="w-full  h-16 flex items-center justify-center"
            >
              <Text className="text-accent text-lg">{confirmText}</Text>
            </TouchableOpacity>
          </View>
        </BlurView>
        {withCancel && (
          <BlurView className="overflow-hidden rounded-2xl bg-black/80">
            <TouchableOpacity
              onPress={onCancelPress}
              className="h-16 flex items-center justify-center"
            >
              <Text className="text-accent font-semibold text-lg">
                {cancelText}
              </Text>
            </TouchableOpacity>
          </BlurView>
        )}
      </View>
    </Modal>
  )
}
