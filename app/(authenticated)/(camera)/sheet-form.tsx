import { Ionicons } from "@expo/vector-icons"
import { Link, useLocalSearchParams, useRouter } from "expo-router"
import {
  Alert,
  Button,
  ImageBackground,
  KeyboardAvoidingView,
  Modal,
  Platform,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native"
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context"
import { BlurView } from "expo-blur"
import { Controller, useForm } from "react-hook-form"

import { Picker, PickerIOS } from "@react-native-picker/picker"
import { useState } from "react"

type FormValues = {
  title: string
  tempo?: number
  composer?: string
  date?: number
  key?: string
  difficulty: "easy" | "medium" | "hard"
}

export default function SheetForm() {
  const [modalOpen, setModalOpen] = useState<boolean>(false)
  const [selectedLanguage, setSelectedLanguage] = useState()
  const { bottom } = useSafeAreaInsets()

  const { jobId } = useLocalSearchParams()
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
    watch,
    setValue,
  } = useForm<FormValues>({
    reValidateMode: "onSubmit",
  })

  const title = watch("title")
  const composer = watch("composer")

  // if (!jobId) return <Redirect href="/(authenticated)/(home)/" />

  return (
    <SafeAreaView className="flex-1 bg-background-primary">
      <View className="absolute top-0 left-[-8px] right-0 h-64">
        <ImageBackground
          source={require("@/assets/images/shapes.png")}
          resizeMode="cover"
          className="flex-1"
          tintColor="#d7fc6e"
        />
      </View>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView showsVerticalScrollIndicator={false} className="px-8 py-4">
          {/* HEADER */}
          <View className="w-full flex items-center">
            <BlurView
              tint="prominent"
              className="flex items-center justify-center p-4 rounded-full overflow-hidden bg-white/5"
            >
              <Ionicons name="musical-note" size={64} color="#d7fc6e" />
            </BlurView>
            <Text className="text-white mt-4 text-3xl font-gilroy-bold text-center">
              Create Your Sheet
            </Text>
            <Text className="text-text-secondary mb-12 mt-2 text-center">
              While we are processing your sheet, fill in the necessary
              informations for your sheet.
            </Text>
          </View>

          {/* FORM */}
          <View className="space-y-6 w-full">
            {/* Sheet Title */}
            <View className="flex w-full">
              <Text className="mb-2 pl-2 text-sm text-text-secondary font-gilroy-semibold">
                Sheet Title
              </Text>
              <View className="rounded-lg bg-black/40 flex flex-row items-center pr-3">
                <Controller
                  control={control}
                  name="title"
                  render={({ field: { onChange, value, onBlur } }) => (
                    <TextInput
                      placeholder="The Four Seasons"
                      className="w-full h-12 px-4 flex-1 text-white font-medium"
                      autoCorrect={false}
                      autoCapitalize="words"
                      autoComplete="off"
                      keyboardType="default"
                      textContentType="none"
                      // onSubmitEditing={() => passwordRef.current?.focus()}
                      returnKeyLabel="next"
                      returnKeyType="next"
                      onBlur={onBlur}
                      value={value}
                      onChangeText={(value) => onChange(value)}
                    />
                  )}
                  rules={{
                    required: {
                      value: true,
                      message: "Sheet title cannot be empty!",
                    },
                    minLength: {
                      value: 3,
                      message: "Sheet title should be at least 3 characters.",
                    },
                    maxLength: {
                      value: 255,
                      message: "Sheet title should be at most 255 characters.",
                    },
                  }}
                />
                {!!title && (
                  <TouchableOpacity onPress={() => setValue("title", "")}>
                    <Ionicons
                      name="close-circle"
                      size={24}
                      color="rgba(255, 255, 255, 0.5)"
                    />
                  </TouchableOpacity>
                )}
              </View>
            </View>
            {/* Composer */}
            <View className="flex w-full">
              <Text className="mb-2 pl-2 text-sm text-text-secondary font-gilroy-semibold">
                Composer
              </Text>
              <View className="rounded-lg bg-black/40 flex flex-row items-center pr-3">
                <Controller
                  control={control}
                  name="composer"
                  render={({ field: { onChange, value, onBlur } }) => (
                    <TextInput
                      placeholder="Antonio Lucio Vivaldi"
                      className="w-full h-12 px-4 flex-1 text-white font-medium"
                      autoCorrect={false}
                      autoCapitalize="words"
                      autoComplete="off"
                      keyboardType="default"
                      textContentType="none"
                      // onSubmitEditing={() => passwordRef.current?.focus()}
                      returnKeyLabel="next"
                      returnKeyType="next"
                      onBlur={onBlur}
                      value={value}
                      onChangeText={(value) => onChange(value)}
                    />
                  )}
                  rules={{
                    required: {
                      value: true,
                      message: "Sheet title cannot be empty!",
                    },
                    minLength: {
                      value: 3,
                      message: "Sheet title should be at least 3 characters.",
                    },
                    maxLength: {
                      value: 255,
                      message: "Sheet title should be at most 255 characters.",
                    },
                  }}
                />
                {!!composer && (
                  <TouchableOpacity onPress={() => setValue("composer", "")}>
                    <Ionicons
                      name="close-circle"
                      size={24}
                      color="rgba(255, 255, 255, 0.5)"
                    />
                  </TouchableOpacity>
                )}
              </View>
            </View>
            {/* Date & Difficulty */}
            <View className="flex flex-row" style={{ gap: 16 }}>
              <View className="flex">
                <Text className="mb-2 pl-2 w-20 text-sm text-text-secondary font-gilroy-semibold">
                  Year
                </Text>
                <View className="rounded-lg bg-black/40 flex flex-row items-center pr-3">
                  <Controller
                    control={control}
                    name="date"
                    render={({ field: { onChange, value, onBlur } }) => (
                      <TextInput
                        inputMode="numeric"
                        placeholder="1723"
                        className="w-full h-12 px-4 flex-1 text-white font-medium"
                        autoCorrect={false}
                        autoComplete="off"
                        textContentType="none"
                        // onSubmitEditing={() => passwordRef.current?.focus()}
                        returnKeyLabel="next"
                        returnKeyType="next"
                        onBlur={onBlur}
                        value={value?.toString()}
                        maxLength={4}
                        onChangeText={(value) =>
                          onChange(value.replace(/[^0-9]/g, ""))
                        }
                      />
                    )}
                    rules={{}}
                  />
                </View>
              </View>
              <View className="flex flex-grow">
                <Text className="mb-2 pl-2 text-sm text-text-secondary font-gilroy-semibold">
                  Difficulty
                </Text>
                <View className="rounded-lg bg-black/40 flex flex-row items-center flex-1">
                  <Pressable
                    onPress={() => setModalOpen(true)}
                    className="px-4 flex-1 h-full flex justify-center"
                  >
                    <Text className="text-accent">
                      {selectedLanguage ?? "Not selected."}
                    </Text>
                  </Pressable>
                </View>
              </View>
            </View>
            <Modal
              animationType="slide"
              transparent
              hardwareAccelerated
              visible={modalOpen}
              onRequestClose={() => {
                Alert.alert("Modal has been closed.")
                setModalOpen(!modalOpen)
              }}
            >
              <View
                className="w-full mt-auto px-2 space-y-2"
                style={{
                  marginBottom: bottom,
                }}
              >
                <BlurView
                  tint="prominent"
                  className="overflow-hidden rounded-2xl bg-black/80"
                >
                  <View className="border-b border-white/5">
                    <Text className="text-center text-accent/80 pt-3 pb-2">
                      Select a difficulty
                    </Text>
                  </View>
                  <Picker
                    selectedValue={selectedLanguage}
                    onValueChange={(itemValue, itemIndex) =>
                      setSelectedLanguage(itemValue)
                    }
                  >
                    <Picker.Item color="white" label="Easy" value="Easy" />
                    <Picker.Item color="white" label="Medium" value="Medium" />
                    <Picker.Item color="white" label="Hard" value="Hard" />
                    <Picker.Item
                      color="white"
                      label="Extreme"
                      value="Extreme"
                    />
                  </Picker>
                  <View className="border-t border-white/5">
                    <TouchableOpacity
                      onPress={() => setModalOpen(false)}
                      className="w-full  h-16 flex items-center justify-center"
                    >
                      <Text className="text-accent text-lg font-light">
                        Confirm
                      </Text>
                    </TouchableOpacity>
                  </View>
                </BlurView>
                <BlurView className="overflow-hidden rounded-2xl bg-black/80">
                  <TouchableOpacity
                    onPress={() => {
                      setSelectedLanguage(undefined)
                      setModalOpen(false)
                    }}
                    className="h-16 flex items-center justify-center"
                  >
                    <Text className="text-accent font-semibold text-lg">
                      Cancel
                    </Text>
                  </TouchableOpacity>
                </BlurView>
              </View>
            </Modal>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}
