import FontAwesome from "@expo/vector-icons/FontAwesome"
import { DarkTheme, ThemeProvider } from "@react-navigation/native"
import { useFonts } from "expo-font"
import { Slot, Stack, useRouter, useSegments } from "expo-router"
import * as SplashScreen from "expo-splash-screen"
import { useEffect } from "react"
import { ClerkProvider, useAuth } from "@clerk/clerk-expo"
import * as SecureStore from "expo-secure-store"
import { theme } from "@/tailwind.config"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

const CLERK_PUBLISHABLE_KEY = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY

const tokenCache = {
  async getToken(key: string) {
    try {
      return SecureStore.getItemAsync(key)
    } catch (error) {
      return null
    }
  },
  async saveToken(key: string, value: string) {
    try {
      return SecureStore.setItemAsync(key, value)
    } catch (error) {
      return
    }
  },
}

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router"

export const unstable_settings = {
  initialRouteName: "(public)/index",
}

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync()

const queryClient = new QueryClient()

const Theme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    background: "#070707",
    text: "#fff",
    // @ts-ignore
    primary: theme?.extend?.colors?.accent || "#fff",
  },
}

export default function RootLayout() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider value={Theme}>
        {/* @ts-ignore */}
        <ClerkProvider
          publishableKey={CLERK_PUBLISHABLE_KEY}
          tokenCache={tokenCache}
        >
          <InitialLayout />
        </ClerkProvider>
      </ThemeProvider>
    </QueryClientProvider>
  )
}

const InitialLayout = () => {
  const [loaded, error] = useFonts({
    Gilroy: require("../assets/fonts/Gilroy-Regular.ttf"),
    GilroyBlack: require("../assets/fonts/Gilroy-Black.ttf"),
    GilroyBold: require("../assets/fonts/Gilroy-Bold.ttf"),
    GilroyExtraBold: require("../assets/fonts/Gilroy-ExtraBold.ttf"),
    GilroyHeavy: require("../assets/fonts/Gilroy-Heavy.ttf"),
    GilroyLight: require("../assets/fonts/Gilroy-Light.ttf"),
    GilroyMedium: require("../assets/fonts/Gilroy-Medium.ttf"),
    GilroySemiBold: require("../assets/fonts/Gilroy-SemiBold.ttf"),
    GilroyThin: require("../assets/fonts/Gilroy-Thin.ttf"),
    ...FontAwesome.font,
  })

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error
  }, [error])

  const { isLoaded, isSignedIn } = useAuth()
  const segments = useSegments()
  const router = useRouter()

  useEffect(() => {
    if (!isLoaded) return

    const inAuthGroup = segments[0] === "(authenticated)"

    if (isSignedIn && !inAuthGroup) {
      router.replace("/(authenticated)/(tabs)/(home)/")
    } else if (!isSignedIn && inAuthGroup) {
      router.replace("/(public)/")
    }
  }, [isSignedIn])

  useEffect(() => {
    if (loaded && isLoaded) {
      setTimeout(() => {
        SplashScreen.hideAsync()
      }, 700)
    }
  }, [loaded, isLoaded])

  useEffect(() => {
    queryClient.prefetchQuery({
      queryKey: ["library"],
    })
  }, [])

  if (!loaded) return <Slot />

  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="(authenticated)" />
      <Stack.Screen name="(public)" />
    </Stack>
  )
}
