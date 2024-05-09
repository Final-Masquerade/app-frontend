import { useAuth, useClerk } from "@clerk/clerk-expo"
import { useMutation } from "@tanstack/react-query"

export const useDeleteSheet = () => {
  const { getToken } = useAuth()

  const mutator = useMutation({
    mutationFn: async (id: string) => {
      const token = await getToken()

      await fetch(`${process.env.EXPO_PUBLIC_GATEWAY_HOST}/user/sheet/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
    },
  })

  return mutator
}
