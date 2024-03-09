import useWarmUpBrowser from "@/hooks/useWarmUpBrowser"
import { useOAuth as useClerkOAuth } from "@clerk/clerk-expo"
import { useCallback } from "react"
import { Alert } from "react-native"

const useOAuth = () => {
  useWarmUpBrowser()

  const { startOAuthFlow: startGoogleAuth } = useClerkOAuth({
    strategy: "oauth_google",
  })

  const { startOAuthFlow: startAppleAuth } = useClerkOAuth({
    strategy: "oauth_apple",
  })

  const authenticate = useCallback(async (provider: "apple" | "google") => {
    try {
      const { createdSessionId, signIn, signUp, setActive } = await (provider ==
        "apple"
        ? startAppleAuth
        : startGoogleAuth)()

      if (createdSessionId) {
        setActive?.({ session: createdSessionId })!
      } else {
        Alert.alert(
          "Authentication Failed",
          `Failed to sign in with ${provider === "apple" ? "Apple" : "Google"}.`
        )
      }
    } catch (err) {
      Alert.alert(
        "Authentication Failed",
        `Failed to sign in with ${provider === "apple" ? "Apple" : "Google"}.`
      )
    }
  }, [])

  return { authenticate }
}

export default useOAuth
