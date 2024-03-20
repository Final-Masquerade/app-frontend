import { useRouter } from "expo-router"
import {
  Button,
  Image,
  Platform,
  Text,
  View,
  TouchableOpacity,
} from "react-native"

import { SafeAreaView } from "react-native-safe-area-context"
import {
  CameraView,
  useCameraPermissions,
  CameraType,
  CameraCapturedPicture,
} from "expo-camera/next"
import { useEffect, useRef, useState } from "react"
import { Ionicons } from "@expo/vector-icons"

export default function Cameras() {
  const router = useRouter()
  const camera = useRef<CameraView>(null)
  const [facing, setFacing] = useState<CameraType>("back")
  const [permission, requestPermission] = useCameraPermissions()

  useEffect(() => {
    ;(async () => {
      if (!permission?.granted) await requestPermission()
    })()
  }, [])

  if (!permission?.granted)
    return (
      <SafeAreaView className="flex-1">
        <Text className="text-text-primary text-center text-xl">Ayip.</Text>
      </SafeAreaView>
    )

  const onImageCapture = async () => {
    const pic: CameraCapturedPicture | undefined =
      await camera.current?.takePictureAsync({
        base64: true,
        imageType: "png",
        skipProcessing: true,
      })

    try {
      const res = await fetch(
        `http://${process.env.EXPO_PUBLIC_GATEWAY_HOST}:3000/capture`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            file: pic?.base64,
          }),
        }
      )
      console.log(await res.text())
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <SafeAreaView className="flex-1">
      <View className="flex items-center justify-center mt-4 mb-6">
        <TouchableOpacity
          className="absolute right-4"
          onPress={() => router.back()}
        >
          <Ionicons name="chevron-down" color={"#fff"} size={24} />
        </TouchableOpacity>
        <Text className=" text-text-primary font-gilroy-bold text-xl">
          Camera
        </Text>
        <Text className="text-center text-text-primary">
          Scan your sheet music to digitalise it.
        </Text>
      </View>
      <View className="aspect-[0.7072136] mx-2 border overflow-hidden border-background-secondary rounded-3xl bg-background-secondary/30">
        <CameraView ref={camera} facing={facing} mode="picture" flash="off">
          <View className="h-full"></View>
        </CameraView>
      </View>

      <View className="flex flex-1 items-center justify-center mb-6 mt-12">
        <TouchableOpacity
          onPress={onImageCapture}
          className="w-20 aspect-square rounded-full bg-white"
        ></TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}
