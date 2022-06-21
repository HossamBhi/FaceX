import React from "react";
import {
  View,
  TouchableWithoutFeedback,
  Modal,
  ScrollView,
  Pressable,
  useWindowDimensions,
} from "react-native";

const ModalContainer = ({ child, hideModal, isVisible }) => {
  const { height } = useWindowDimensions();
  return (
    <Modal visible={isVisible} transparent={true} animationType="slide">
      <ScrollView>
        <TouchableWithoutFeedback onPress={hideModal}>
          <View
            style={{
              backgroundColor: "#00000065",
              flex: 1,
              justifyContent: "center",
              minHeight: height,
            }}
          >
            <Pressable onPress={() => console.log("stop event")}>
              {child}
            </Pressable>
          </View>
        </TouchableWithoutFeedback>
      </ScrollView>
    </Modal>
  );
};

export default ModalContainer;
