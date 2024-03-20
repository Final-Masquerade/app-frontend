import { Link, useRouter } from "expo-router"
import {
  Pressable,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Alert,
  ActivityIndicator,
  ImageBackground,
} from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { Ionicons } from "@expo/vector-icons"
import { Controller, SubmitHandler, useForm } from "react-hook-form"
import { useEffect, useRef, useState } from "react"
import { useSignUp } from "@clerk/clerk-expo"
import Logo from "@/assets/svg/logo.svg"
import useOAuth from "@/hooks/useOAuth"

type FormValues = {
  email: string
  password: string
}

export default function Register() {
  const router = useRouter()
  let passwordRef = useRef<TextInput>(null)
  const { authenticate } = useOAuth()

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
    watch,
    setValue,
  } = useForm<FormValues>({
    reValidateMode: "onSubmit",
  })
  const email = watch("email")

  const { isLoaded, signUp } = useSignUp()
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  useEffect(() => {
    if (errors.email) return Alert.alert("Email Invalid", errors.email.message)
    if (errors.password)
      return Alert.alert("Password Invalid", errors.password.message)
  }, [errors.email, errors.password])

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    if (!isLoaded) return
    setLoading(true)

    try {
      const completeSignUp = await signUp.create({
        emailAddress: data.email,
        password: data.password,
      })
      await completeSignUp.prepareEmailAddressVerification({
        strategy: "email_code",
      })

      router.replace("/(public)/(auth)/otp-verify")
    } catch (err: any) {
      alert(err.errors[0].message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <SafeAreaView className="relative flex-1 flex px-8 items-stretch bg-background-secondary">
      <Pressable
        onPress={() => router.back()}
        className="absolute right-4 top-4 bg-white/10 rounded-full p-1"
      >
        <Ionicons name="close" size={24} color="rgba(255, 255, 255, 0.75)" />
      </Pressable>
      {/* HEADER */}
      <View className="w-full flex items-center">
        <Logo width={64} />
        <Text className="text-white mt-4 text-3xl font-gilroy-bold text-center">
          Create Account
        </Text>
        <Text className="text-text-secondary mb-12 mt-2 text-center">
          Create an account to use{" "}
          <Text className="font-gilroy-bold text-accent">Nota</Text>.
        </Text>
      </View>
      {/* FORM */}
      <View className="w-full space-y-4">
        <View className="space-y-6">
          <View className="flex w-full">
            <Text className="mb-2 pl-2 text-sm text-text-secondary font-gilroy-semibold">
              EMAIL ADDRESS
            </Text>
            <View className="rounded-lg bg-black/40 flex flex-row items-center pr-3">
              <Controller
                control={control}
                name="email"
                render={({ field: { onChange, value, onBlur } }) => (
                  <TextInput
                    placeholder="email@gmail.com"
                    className="w-full h-12 px-4 flex-1 text-white font-medium"
                    autoCorrect={false}
                    autoCapitalize="none"
                    autoComplete="email"
                    keyboardType="email-address"
                    textContentType="emailAddress"
                    onSubmitEditing={() => passwordRef.current?.focus()}
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
                    message: "Email field cannot be empty!",
                  },
                  pattern: {
                    value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g,
                    message: "Please enter a valid email.",
                  },
                }}
              />
              {!!email && (
                <TouchableOpacity onPress={() => setValue("email", "")}>
                  <Ionicons
                    name="close-circle"
                    size={24}
                    color="rgba(255, 255, 255, 0.5)"
                  />
                </TouchableOpacity>
              )}
            </View>
          </View>
          <View className="flex w-full">
            <Text className="mb-2 pl-2 text-sm text-text-secondary font-gilroy-semibold">
              PASSWORD
            </Text>
            <View className="rounded-lg bg-black/40 flex flex-row items-center pr-3">
              <Controller
                control={control}
                name="password"
                render={({ field: { onChange, value, onBlur } }) => (
                  <TextInput
                    ref={passwordRef}
                    className="w-full h-12 px-4 rounded-lg text-white flex-1"
                    placeholder="123456"
                    secureTextEntry={!showPassword}
                    autoComplete="password"
                    autoCorrect={false}
                    autoCapitalize="none"
                    onBlur={onBlur}
                    value={value}
                    onChangeText={(value) => onChange(value)}
                  />
                )}
                rules={{
                  required: {
                    value: true,
                    message: "Password field cannot be empty!",
                  },
                }}
              />
              <TouchableOpacity
                onPress={() => setShowPassword((state) => !state)}
              >
                {showPassword ? (
                  <Ionicons
                    name="eye"
                    size={24}
                    color="rgba(255, 255, 255, 0.5)"
                  />
                ) : (
                  <Ionicons
                    name="eye-off"
                    size={24}
                    color="rgba(255, 255, 255, 0.5)"
                  />
                )}
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <View className="space-y-6">
          <Text className="px-2 text-center text-text-secondary text-xs pt-4">
            By submitting this form, you agree with the end-user agreement.
          </Text>
          <TouchableOpacity
            onPress={handleSubmit(onSubmit)}
            className="bg-accent w-full rounded-full flex flex-row items-center justify-center h-14"
          >
            {loading ? (
              <ActivityIndicator color="#000" />
            ) : (
              <Text className="font-gilroy-semibold text-lg">
                Create Account
              </Text>
            )}
          </TouchableOpacity>
        </View>
      </View>
      {/* OTHER STRATEGIES */}
      <View className="w-full mt-4 space-y-4">
        <Text className="mx-auto text-text-secondary">or</Text>
        <View className="flex flex-row justify-center" style={{ gap: 24 }}>
          <TouchableOpacity
            onPress={() => authenticate("google")}
            className="border border-white w-14 rounded-full flex flex-row items-center justify-center h-14"
          >
            <View>
              <Ionicons
                name="logo-google"
                size={24}
                color="rgb(255, 255, 255)"
              />
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => authenticate("apple")}
            className="border relative border-white w-14 rounded-full flex flex-row items-center justify-center h-14"
          >
            <View>
              <Ionicons
                name="logo-apple"
                size={28}
                color="rgb(255, 255, 255)"
              />
            </View>
          </TouchableOpacity>
        </View>
      </View>
      {/* CREATE ACCOUNT */}

      <Text className="mt-auto mb-2 text-text-secondary text-sm text-center">
        Already have an account?{" "}
        <Link href="/(public)/(auth)/login" replace asChild>
          <Pressable>
            <Text className="font-gilroy-bold text-text-primary">Login</Text>
          </Pressable>
        </Link>
      </Text>
    </SafeAreaView>
  )
}
