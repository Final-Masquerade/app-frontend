import { AntDesign, Ionicons } from "@expo/vector-icons"
import {
  Link,
  Redirect,
  router,
  useLocalSearchParams,
  useRouter,
} from "expo-router"
import {
  Alert,
  Button as RNButton,
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
import { Controller, SubmitHandler, useForm } from "react-hook-form"

import { Picker } from "@react-native-picker/picker"
import { useEffect, useState } from "react"
import Prompt from "@/components/ui/prompt"
import Button from "@/components/ui/button"
import { useAuth } from "@clerk/clerk-expo"

const DIFFICULTY = ["Easy", "Medium", "Hard", "Extreme"] as const

const KEY = {
  A_MAJOR: "A MAJOR",
  A_MINOR: "A MINOR",
  B_FLAT_MAJOR: "B FLAT MAJOR",
  B_FLAT_MINOR: "B FLAT MINOR",
  B_MAJOR: "B MAJOR",
  B_MINOR: "B MINOR",
  C_MAJOR: "C MAJOR",
  C_MINOR: "C MINOR",
  D_FLAT_MAJOR: "D FLAT MAJOR",
  D_FLAT_MINOR: "D FLAT MINOR",
  D_MAJOR: "D MAJOR",
  D_MINOR: "D MINOR",
  E_FLAT_MAJOR: "E FLAT MAJOR",
  E_FLAT_MINOR: "E FLAT MINOR",
  E_MAJOR: "E MAJOR",
  E_MINOR: "E MINOR",
  F_MAJOR: "F MAJOR",
  F_MINOR: "F MINOR",
  G_FLAT_MAJOR: "G FLAT MAJOR",
  G_FLAT_MINOR: "G FLAT MINOR",
  G_MAJOR: "G MAJOR",
  G_MINOR: "G MINOR",
  A_FLAT_MAJOR: "A FLAT MAJOR",
  A_FLAT_MINOR: "A FLAT MINOR",
}

type Key = keyof typeof KEY
type Difficulty = (typeof DIFFICULTY)[number]

type FormValues = {
  title: string
  tempo?: number
  composer?: string
  date?: number
  key?: Key
  difficulty?: Difficulty
}

export default function SheetForm() {
  const [difficultyOpen, setDifficultyOpen] = useState<boolean>(false)
  const [keyOpen, setKeyOpen] = useState<boolean>(false)

  const [loading, setLoading] = useState<boolean>(false)

  const { jobId } = useLocalSearchParams()
  const { getToken } = useAuth()

  if (!jobId) return <Redirect href="/(authenticated)/(home)/" />

  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm<FormValues>({
    reValidateMode: "onSubmit",
  })

  const title = watch("title")
  const composer = watch("composer")
  const difficulty = watch("difficulty")
  const key = watch("key")

  useEffect(() => {
    if (errors.title) return Alert.alert("Title Invalid", errors.title.message)
    if (errors.composer)
      return Alert.alert("Composer Invalid", errors.composer.message)
    if (errors.date) return Alert.alert("Date Invalid", errors.date.message)
    if (errors.tempo) return Alert.alert("Tempo Invalid", errors.tempo.message)
  }, [errors.title, errors.composer, errors.date, errors.tempo])

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    setLoading(true)

    try {
      const res = await fetch(
        `${process.env.EXPO_PUBLIC_GATEWAY_HOST}/user/createSheet`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${await getToken()}`,
          },
          body: JSON.stringify({
            id: jobId,
            name: data.title,
            ...(!!data.tempo && { tempo: Number(data.tempo) }),
            ...(!!data.composer && { composer: data.composer }),
            ...(!!data.date && { date: Number(data.date) }),
            ...(!!data.key && { key: data.key }),
            ...(!!data.difficulty && {
              difficulty: data.difficulty.toUpperCase(),
            }),
          }),
        }
      )

      console.log(JSON.stringify(await res.json()))

      router.navigate("/(authenticated)/(home)/")
    } catch (err: any) {
      alert(err.errors[0].message)
    } finally {
      setLoading(false)
    }
  }

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
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentInset={{ bottom: 20 }}
          className="px-8 pb-4"
        >
          {/* HEADER */}
          <View className="w-full flex items-center mt-4">
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
                    minLength: {
                      value: 3,
                      message: "Composer name should be at least 3 characters.",
                    },
                    maxLength: {
                      value: 255,
                      message:
                        "Composer name should be at most 255 characters.",
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
                <View className="rounded-lg bg-black/40 flex flex-row items-center">
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
                    rules={{
                      min: {
                        value: 0,
                        message: "The composing year should be bigger than 0.",
                      },
                      max: {
                        value: new Date().getFullYear(),
                        message: "The composing year cannot be future.",
                      },
                    }}
                  />
                </View>
              </View>
              <View className="flex flex-grow">
                <Text className="mb-2 pl-2 text-sm text-text-secondary font-gilroy-semibold">
                  Difficulty
                </Text>
                <View className="rounded-lg bg-black/40 flex flex-row items-center flex-1">
                  <Pressable
                    onPress={() => setDifficultyOpen(true)}
                    className="px-4 flex-1 h-full flex flex-row items-center justify-between"
                  >
                    <Text
                      className={
                        difficulty ? "text-accent" : "text-text-secondary/50"
                      }
                    >
                      {difficulty ?? "Not selected."}
                    </Text>
                    {difficulty && (
                      <View className="flex flex-row" style={{ gap: 3 }}>
                        {new Array(4)
                          .fill(null)
                          .map((_, index) =>
                            DIFFICULTY.findIndex((val) => val === difficulty) +
                              1 >
                            index ? (
                              <AntDesign
                                key={`star-${index}`}
                                name="star"
                                color="#d7fc6e"
                              />
                            ) : (
                              <AntDesign
                                key={`star-${index}`}
                                name="staro"
                                color="#505050"
                              />
                            )
                          )}
                      </View>
                    )}
                  </Pressable>
                </View>
                <Prompt
                  open={difficultyOpen}
                  onConfirmPress={() => {
                    if (!difficulty)
                      setValue("difficulty", "Easy" as Difficulty)
                    setDifficultyOpen(false)
                  }}
                  setOpen={setDifficultyOpen}
                  title="Select a difficulty"
                >
                  <Controller
                    control={control}
                    name="difficulty"
                    render={({ field: { onChange, value, onBlur } }) => (
                      <Picker
                        selectedValue={value}
                        onValueChange={(itemValue) => onChange(itemValue)}
                        onBlur={onBlur}
                      >
                        <Picker.Item color="white" label="Easy" value="Easy" />
                        <Picker.Item
                          color="white"
                          label="Medium"
                          value="Medium"
                        />
                        <Picker.Item color="white" label="Hard" value="Hard" />
                        <Picker.Item
                          color="white"
                          label="Extreme"
                          value="Extreme"
                        />
                      </Picker>
                    )}
                  />
                </Prompt>
              </View>
            </View>
            {/* Tempo & Key */}
            <View className="flex flex-row" style={{ gap: 16 }}>
              <View className="flex">
                <Text className="mb-2 pl-2 w-16 text-sm text-text-secondary font-gilroy-semibold">
                  Tempo
                </Text>
                <View className="rounded-lg bg-black/40 flex flex-row items-center">
                  <Controller
                    control={control}
                    name="tempo"
                    render={({ field: { onChange, value, onBlur } }) => (
                      <TextInput
                        inputMode="numeric"
                        placeholder="120"
                        className="w-full h-12 px-4 flex-1 text-white font-medium"
                        autoCorrect={false}
                        autoComplete="off"
                        textContentType="none"
                        returnKeyLabel="next"
                        returnKeyType="next"
                        onBlur={onBlur}
                        value={value?.toString()}
                        maxLength={3}
                        onChangeText={(value) =>
                          onChange(value.replace(/[^0-9]/g, ""))
                        }
                      />
                    )}
                    rules={{
                      min: {
                        value: 12,
                        message: "The tempo can be at least 12 BPM.",
                      },
                      max: {
                        value: 256,
                        message: "The tempo cannot be faster than 256 BPM.",
                      },
                    }}
                  />
                </View>
              </View>
              <View className="flex flex-grow">
                <Text className="mb-2 pl-2 text-sm text-text-secondary font-gilroy-semibold">
                  Key
                </Text>
                <View className="rounded-lg bg-black/40 flex flex-row items-center flex-1">
                  <Pressable
                    onPress={() => setKeyOpen(true)}
                    className="px-4 flex-1 h-full flex flex-row items-center justify-between"
                  >
                    <Text
                      className={
                        key
                          ? "text-accent capitalize"
                          : "text-text-secondary/50"
                      }
                    >
                      {KEY[key as Key] ?? "Not selected."}
                    </Text>
                  </Pressable>
                </View>
                <Prompt
                  open={keyOpen}
                  onConfirmPress={() => {
                    if (!key) setValue("key", "A_MAJOR" as Key)
                    setKeyOpen(false)
                  }}
                  setOpen={setKeyOpen}
                  title="Select a Key"
                  withCancel
                  cancelText="Clear"
                  onCancelPress={() => {
                    setValue("key", undefined)
                    setKeyOpen(false)
                  }}
                >
                  <Controller
                    control={control}
                    name="key"
                    render={({ field: { onChange, value, onBlur } }) => (
                      <Picker
                        selectedValue={value}
                        onValueChange={(itemValue) => onChange(itemValue)}
                      >
                        {Object.keys(KEY).map((k) => (
                          <Picker.Item
                            color="white"
                            label={KEY[k as Key]}
                            value={k}
                            key={k}
                          />
                        ))}
                      </Picker>
                    )}
                  />
                </Prompt>
              </View>
            </View>
          </View>

          {/* Footer */}
          <View
            className="mt-8 flex"
            style={{
              gap: 16,
            }}
          >
            <Button
              title="Create"
              onPress={handleSubmit(onSubmit)}
              {...{ loading }}
            />
            <RNButton title="Discard" color="#e5e5e5" />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}
