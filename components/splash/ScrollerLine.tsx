import {
  ImageBackground,
  ImageSourcePropType,
  LayoutChangeEvent,
  Text,
  View,
} from "react-native";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from "react-native-reanimated";

export enum ScrollerDirection {
  DOWN,
  UP,
}

type ScrollerLineProps = {
  images?: Array<NodeRequire | null>;
  duration?: number;
  direction?: ScrollerDirection;
};

const easing = Easing.linear;

const ScrollerLine = ({
  images = [] as Array<NodeRequire>,
  duration = 12000,
  direction = ScrollerDirection.UP,
}: ScrollerLineProps) => {
  const sv = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: -sv.value }],
  }));

  const onLayout = (e: LayoutChangeEvent) => {
    sv.value = withRepeat(
      withTiming(e.nativeEvent.layout.height + 12, { duration, easing }),
      -1
    );
  };

  return (
    <View className="flex-grow overflow-hidden h-full flex items-start space-y-3 border-white/30">
      <Animated.View
        onLayout={onLayout}
        style={[{ gap: 12 }, animatedStyle]}
        className="w-full space-y-3"
      >
        {images.map((src, i) => (
          <ScrollerItem {...{ src }} key={`${src}-${i}`} />
        ))}
      </Animated.View>
      <Animated.View
        style={[{ gap: 12 }, animatedStyle]}
        className="w-full space-y-3"
      >
        {images.map((src, i) => (
          <ScrollerItem {...{ src }} key={`${src}-secondary-${i}`} />
        ))}
      </Animated.View>
    </View>
  );
};

const ScrollerItem = ({ src }: { src: any }) => (
  <View
    className={"w-full h-44 border rounded-full overflow-hidden"}
    style={{
      borderColor: src === null ? "white" : "transparent",
    }}
  >
    {src !== null ? (
      <ImageBackground resizeMode="cover" source={src} className="flex-1" />
    ) : null}
  </View>
);

export default ScrollerLine;
