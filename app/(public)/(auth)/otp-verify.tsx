import { useSignUp } from "@clerk/clerk-expo"
import { Ionicons } from "@expo/vector-icons"
import { Link, useRouter } from "expo-router"
import { useEffect, useState } from "react"
import {
  View,
  Text,
  Button,
  Pressable,
  Alert,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
} from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import Logo from "@/assets/svg/logo.svg"
import { LinearGradient } from "expo-linear-gradient"
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from "react-native-confirmation-code-field"

const CELL_COUNT = 6

export default function OTPVerify() {
  const router = useRouter()
  const { isLoaded, signUp, setActive } = useSignUp()
  const [loading, setLoading] = useState(false)

  const [value, setValue] = useState("")
  const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT })
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  })

  const validate = (value: string): 0 | 1 => {
    if (value.trim().length !== 6) {
      Alert.alert("Code Invalid", "Code must have 6 digits.")
      return 1
    }

    if (isNaN(Number(value))) {
      Alert.alert("Code Invalid", "Code must be numeric.")
      return 1
    }
    return 0
  }

  const onSubmit = async () => {
    if (!isLoaded || validate(value) == 1) return

    setLoading(true)

    try {
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code: value,
      })

      await setActive({ session: completeSignUp.createdSessionId })
    } catch (err: any) {
      if (err.errors[0].code === "form_code_incorrect")
        Alert.alert("Failed Verification", "Code is not correct.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <SafeAreaView className="relative flex-1 flex px-8 pt-16 items-stretch bg-background-secondary">
      <View className="flex items-start absolute top-8 left-6">
        <TouchableOpacity
          className="flex flex-row items-center justify-center"
          style={{ gap: 8 }}
          onPress={() => router.replace("/")}
        >
          <Ionicons size={18} name="arrow-back" color="white" />
          <Text className="text-text-primary">Cancel Verification</Text>
        </TouchableOpacity>
      </View>

      {/* HEADER */}
      <View className="w-full flex items-center">
        <Logo width={64} />
        <Text className="text-white mt-4 text-3xl font-gilroy-bold text-center">
          Welcome to Sonata
        </Text>
        <Text className="text-text-secondary mb-12 mt-2 text-center leading-5">
          We've sent a {CELL_COUNT}-digit code to{" "}
          <Text className="font-medium text-accent">
            {signUp?.emailAddress || "not-found@gmail.com"}
          </Text>
          .
        </Text>
      </View>

      <CodeField
        ref={ref}
        {...props}
        value={value}
        onChangeText={setValue}
        cellCount={CELL_COUNT}
        rootStyle={{
          display: "flex",
          height: 64,
          justifyContent: "space-between",
          gap: 8,
        }}
        keyboardType="number-pad"
        textContentType="oneTimeCode"
        renderCell={({ index, symbol, isFocused }) => (
          <View
            key={index + "code-field"}
            onLayout={getCellOnLayoutHandler(index)}
            className="flex-1 bg-black/50 border rounded-lg flex items-center justify-center"
            style={[
              !!symbol
                ? {
                    backgroundColor: "rgba(0,0,0, 0.4)",
                  }
                : {},
              isFocused
                ? {
                    borderColor: "#d6fa6d",
                  }
                : { borderColor: "transparent" },
            ]}
          >
            <Text className="text-xl transition-colors font-gilroy-bold text-text-secondary text-center">
              {symbol || (isFocused ? <Cursor /> : null)}
            </Text>
          </View>
        )}
      />

      <Text className="text-center text-text-secondary mt-8 text-xs">
        We are just making sure there are no bots around.
      </Text>

      <TouchableOpacity
        onPress={() => onSubmit()}
        className="mt-auto bg-accent w-full rounded-full flex flex-row items-center justify-center h-14"
      >
        {loading ? (
          <ActivityIndicator color="#000" />
        ) : (
          <Text className="font-gilroy-semibold text-lg">Verify Account</Text>
        )}
      </TouchableOpacity>

      {/* CREATE ACCOUNT */}
      <Text className="mt-8 text-text-secondary text-sm text-center">
        Didn't get a code?{" "}
        <Link href="/(public)/(auth)/register" replace asChild>
          <Pressable>
            <Text className="font-gilroy-bold text-text-primary">
              Hit me baby one more time.
            </Text>
          </Pressable>
        </Link>
      </Text>
    </SafeAreaView>
  )
}
