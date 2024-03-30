import { Picker as RNPicker } from "@react-native-picker/picker"
import { useState } from "react"
import { Alert, Modal, Pressable, Text, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"

export default function Picker() {
  const [selectedLanguage, setSelectedLanguage] = useState()
  const [modalVisible, setModalVisible] = useState(false)

  return (
    <SafeAreaView className="flex-1 flex items-center justify-center bg-white">
      <Text>AMK</Text>
      <Pressable onPress={() => setModalVisible((state) => !state)}>
        <Text>Show Modal</Text>
      </Pressable>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.")
          setModalVisible(!modalVisible)
        }}
      >
        <View className="w-full mt-auto bg-red-100">
          <Pressable onPress={() => setModalVisible((state) => !state)}>
            <Text>Show Modal</Text>
          </Pressable>
          <RNPicker
            selectedValue={selectedLanguage}
            onValueChange={(itemValue, itemIndex) =>
              setSelectedLanguage(itemValue)
            }
            placeholder="Hello World"
            mode="dropdown"
            collapsable
            prompt="Hello World"
          >
            <RNPicker.Item label="Java" value="java" />
            <RNPicker.Item label="JavaScript" value="js" />
            <RNPicker.Item label="C++" value="cpp" />
            <RNPicker.Item label="HTML" value="html" />
          </RNPicker>
        </View>
      </Modal>
    </SafeAreaView>
  )
}
