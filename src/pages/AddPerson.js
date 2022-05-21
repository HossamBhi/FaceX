import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  useWindowDimensions,
  Image,
  ScrollView,
} from "react-native";
import { primary_color, primary_color_light } from "../utils/colors";
import LinearGradient from "react-native-linear-gradient";
import PageHeader from "../components/common/PageHeader";
import { Entypo } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import CustomeButton from "../components/common/CustomeButton";
import CustomeTextInput from "../components/common/CustomeTextInput";
import { useDispatch } from "react-redux";
import { FONT_MEDIUM } from "../utils/fonts";
import {
  reinitialPersonsAction,
  savePersonAction,
  removePersonAction,
} from "../redux/reducers/persons";
import { getUniqueId } from "../utils/helper";
import { launchImageLibrary } from "react-native-image-picker";
import FaceSDK from "@regulaforensics/react-native-face-api";

const AddPerson = ({ route, navigation }) => {
  const person = route.params?.person;
  const { height } = useWindowDimensions();
  const dispatch = useDispatch();
  const [name, setName] = useState(person?.name || "");
  const [isEName, setIsEName] = useState(""); // is Error Name
  const [relation, setRelation] = useState(person?.relation || "");
  const [age, setAge] = useState(person?.age || "");
  const [personImage, setPersonImage] = useState(null);

  useEffect(() => {
    if (person) {
      setName(person.name);
      setRelation(person.relation);
      setAge(person.age);
      setPersonImage(person.image);
    } else {
      setName("");
      setRelation("");
      setAge("");
      setPersonImage(null);
    }
  }, [navigation]);

  const handleSubmitPerson = async () => {
    // dispatch(reinitialPersonsAction());
    if (name.trim() === "") return setIsEName(true);
    else setIsEName(false);
    handleFaceCapture();
  };

  const handleDeletePerson = () => {
    dispatch(removePersonAction(person.id));
    navigation.replace("PersonsPage");
  };

  const handlePickImage = async () => {
    const result = await launchImageLibrary({ mediaType: "photo" });
    // console.log("result: ", result);
    if (result.assets) setPersonImage(result.assets);
  };

  const handleFaceCapture = () => {
    FaceSDK.presentFaceCaptureActivity(
      (faceCaptureResponse) => {
        console.log("faceCaptureResponse: ", faceCaptureResponse)
        const bitmap = JSON.parse(faceCaptureResponse)?.image?.bitmap;
        if (bitmap) {
          dispatch(
            savePersonAction({
              id: person?.id || getUniqueId(),
              name,
              relation,
              age,
              image: personImage,
              identifyPerson: bitmap,
            })
          );
          navigation.replace("PersonsPage");
        }
      },
      (e) => {
        alert("Error while recognise face.");
      }
    );
  };

  return (
    <ScrollView style={{ flex: 1 }}>
      <LinearGradient
        colors={[
          "#ffffff",
          primary_color_light,
          primary_color_light,
          primary_color_light,
          "#8C81F7",
        ]}
        style={{ paddingHorizontal: "5%", flex: 1 }}
      >
        <View style={[styles.container, { minHeight: height - 60 }]}>
          <PageHeader
            style={{ paddingHorizontal: 0, paddingEnd: person ? 0 : 30 }}
            left={
              <CustomeButton
                onPress={() => navigation.replace("PersonsPage")}
                icon={
                  <View style={styles.back}>
                    <Entypo name="chevron-left" size={28} color="#ffffff" />
                  </View>
                }
              />
            }
            right={
              person && (
                <CustomeButton
                  onPress={handleDeletePerson}
                  icon={
                    <FontAwesome name="trash-o" size={28} color="#E53935" />
                  }
                />
              )
            }
            text="Add People"
          />
          <CustomeButton
            onPress={handlePickImage}
            icon={
              <View style={{ justifyContent: "center", alignItems: "center" }}>
                <View style={styles.pickProfile}>
                  <Image
                    source={
                      personImage === null
                        ? require("../assets/noUser.png")
                        : { uri: personImage[0].uri }
                    }
                    resizeMode="center"
                    style={{ width: 100, height: 100, borderRadius: 100 }}
                  />
                  <Image
                    source={require("../assets/addImage.png")}
                    style={styles.plus}
                  />
                </View>
              </View>
            }
          />
          <CustomeTextInput
            placeholder={"Name"}
            value={name}
            onChangeText={setName}
            style={
              isEName === true
                ? { borderColor: "red" }
                : isEName === false && { borderColor: "green" }
            }
          />
          <CustomeTextInput
            placeholder={"Relationship"}
            value={relation}
            onChangeText={setRelation}
          />
          <CustomeTextInput
            placeholder={"Age"}
            value={age}
            onChangeText={setAge}
            keyBoardType="numeric"
          />
          <CustomeButton
            text={person ? "Edit" : "Add"}
            style={[styles.btn, { marginTop: 40 }]}
            textStyle={styles.btnText}
            onPress={handleSubmitPerson}
          />
        </View>
      </LinearGradient>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
    paddingBottom: 100,
  },
  back: {
    backgroundColor: primary_color,
    borderRadius: 1000,
    width: 34,
    height: 34,
    alignItems: "center",
    justifyContent: "center",
  },
  pickProfile: {
    marginTop: 10,
    marginBottom: 30,
    position: "relative",
    borderRadius: 10000,
  },
  plus: {
    bottom: 5,
    right: 5,
    position: "absolute",
    width: 15,
    height: 15,
    borderRadius: 10000,
  },
  btn: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: primary_color,
    padding: 16,
    borderRadius: 1000,
  },
  btnText: {
    textAlign: "center",
    fontSize: 16,
    fontFamily: FONT_MEDIUM,
    color: "#FFFFFF",
  },
});

export default AddPerson;
