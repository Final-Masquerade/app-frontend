import { Bar, Key } from "@/components/renderer/tokens"
import { useCallback, useEffect, useState } from "react"

type usePlaygroundProgressProps = {
  barCount: number
  bars: Bar[]
  onBarFinished: (current: number, next: number) => void
  onFinished: () => void
}

export default function usePlaygroundProgress({
  barCount,
  bars,
  onBarFinished,
  onFinished,
}: usePlaygroundProgressProps) {
  const [currentBar, setCurrentBar] = useState<number>(0)
  const [barProgress, setBarProgress] = useState<number>(0)
  const [hasFinished, setFinished] = useState<boolean>(false)
  const [wrongAttempt, setWrongAttempt] = useState(false)

  useEffect(() => {
    if (barProgress == bars.at(currentBar)?.notes.length) {
      if (currentBar === barCount - 1) onFinished()
      else {
        onBarFinished(currentBar, currentBar + 1)
        setCurrentBar((b) => b + 1)
        setBarProgress(0)
      }
    }
  }, [barProgress])

  const attempt = (key: Key) => {
    const expectedKey = bars.at(currentBar)?.notes?.at(barProgress)

    if (expectedKey) {
      if (expectedKey.pitch?.toLowerCase() === key.toLowerCase()) {
        setWrongAttempt(false)
        setBarProgress((progress) => progress + 1)
        console.log(`Congrats! You played ${key}.`)
      } else {
        setWrongAttempt(true)
        console.log(`Expected ${expectedKey.pitch} but got ${key} aq!`)
      }
    }
  }

  const setBar = (bar: number) => {
    setCurrentBar(bar)
    setBarProgress(0)
    setWrongAttempt(false)
    setFinished(false)
  }

  return {
    hasFinished,
    currentBar,
    barProgress,
    wrongAttempt,
    attempt,
    setBar,
  }
}
