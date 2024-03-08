import { Link, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import {
  Button,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useForm } from "react-hook-form";

export default function ModalScreen() {
  const router = useRouter();
  const { control } = useForm();

  return (
    <SafeAreaView className="relative flex-1 flex px-8 items-stretch bg-background-secondary">
      <Pressable
        onPress={() => router.back()}
        className="absolute right-4 top-4"
      >
        <Ionicons name="close" size={32} color="rgba(255, 255, 255, 0.75)" />
      </Pressable>
      {/* HEADER */}
      <View className="w-full">
        <Text className="text-white text-3xl font-gilroy-bold">Sign In</Text>
        <Text className="text-text-secondary mb-12 mt-2">
          Sign in with your credentials to continue to{" "}
          <Text className="font-gilroy-bold text-accent">Sonata</Text>.
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
              <TextInput
                placeholder="email@gmail.com"
                className="w-full h-12 px-4 flex-1 text-white font-medium"
                autoCorrect={false}
                autoCapitalize="none"
                autoComplete="email"
                keyboardType="email-address"
                textContentType="emailAddress"
              />
              <Ionicons
                name="close-circle"
                size={24}
                color="rgba(255, 255, 255, 0.75)"
              />
            </View>
          </View>
          <View className="flex w-full">
            <Text className="mb-2 pl-2 text-sm text-text-secondary font-gilroy-semibold">
              PASSWORD
            </Text>
            <TextInput
              placeholder="123456"
              secureTextEntry
              autoComplete="password"
              autoCorrect={false}
              autoCapitalize="none"
              className="w-full h-12 px-4 rounded-lg bg-black/40 text-white"
            />
          </View>
        </View>

        <View className="space-y-6">
          <Text className="px-2 text-center text-text-secondary text-xs pt-4">
            By submitting this form, you agree with the end-user agreement.
          </Text>
          <TouchableOpacity className="bg-accent w-full rounded-full flex flex-row items-center justify-center h-14">
            <Text className="font-gilroy-semibold text-lg">Login</Text>
          </TouchableOpacity>
        </View>
      </View>
      {/* OTHER STRATEGIES */}
      <View className="w-full mt-4 space-y-4">
        <Text className="mx-auto text-text-secondary">or</Text>
        <View className="space-y-2">
          <TouchableOpacity className="border relative border-white w-full rounded-full flex flex-row items-center justify-center h-14">
            <View className="absolute left-4">
              <Ionicons
                name="logo-google"
                size={24}
                color="rgb(255, 255, 255)"
              />
            </View>

            <Text className="font-gilroy-semibold text-lg text-text-primary">
              Login with Google
            </Text>
          </TouchableOpacity>
          <TouchableOpacity className="border relative border-white w-full rounded-full flex flex-row items-center justify-center h-14">
            <View className="absolute left-4 top-[11px]">
              <Ionicons
                name="logo-apple"
                size={28}
                color="rgb(255, 255, 255)"
              />
            </View>

            <Text className="font-gilroy-semibold text-lg text-text-primary">
              Continue with Apple
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}
