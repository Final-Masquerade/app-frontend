import { useEffect } from "react";
import { ImageBackground, Text, View } from "react-native";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from "react-native-reanimated";

type ScrollerLineProps = {
  images?: Array<string>;
  duration?: number;
};

const easing = Easing.linear;

const ScrollerLine = ({
  images = [] as Array<string>,
  duration = 12000,
}: ScrollerLineProps) => {
  const sv = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: -sv.value }],
  }));

  return (
    <View className="flex-grow overflow-hidden h-full flex items-start space-y-3 border-white/30">
      <Animated.View
        onLayout={(e) => {
          console.log(e.nativeEvent.layout.width);
          sv.value = withRepeat(
            withTiming(e.nativeEvent.layout.height + 12, { duration, easing }),
            -1
          );
        }}
        style={animatedStyle}
        className="w-full space-y-3"
      >
        {images.map((src, i) => (
          <View
            key={`${src}-${i}`}
            className="w-full h-44 border border-background-secondary rounded-full overflow-hidden"
          >
            <ImageBackground
              resizeMode="cover"
              source={require("@/assets/images/vinyl.png")}
              className="flex-1"
            />
          </View>
        ))}
      </Animated.View>
      <Animated.View style={animatedStyle} className="w-full space-y-3">
        {images.map((src, i) => (
          <View
            key={`${src}-secondary-${i}`}
            className="w-full h-44 border border-background-secondary rounded-full overflow-hidden"
          >
            <ImageBackground
              resizeMode="cover"
              source={require("@/assets/images/vinyl.png")}
              className="flex-1"
            />
          </View>
        ))}
      </Animated.View>
    </View>
  );
};

export default ScrollerLine;
