import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  useWindowDimensions,
  ImageBackground,
  Image,
  Pressable,
  ActivityIndicator,
} from "react-native";
import { bg_color, primary_color, primary_color_light } from "../utils/colors";
import LinearGradient from "react-native-linear-gradient";
import PageHeader from "../components/common/PageHeader";
import { Octicons, FontAwesome } from "@expo/vector-icons";
import { useSelector } from "react-redux";
import { FONT_REGULAR } from "../utils/fonts";
import FaceSDK, {
  ImageType,
  MatchFacesImage,
  MatchFacesRequest,
} from "@regulaforensics/react-native-face-api";

const Homepage = ({ navigation }) => {
  const { height, width } = useWindowDimensions();
  const { logedUser } = useSelector((state) => state.users);
  const { persons } = useSelector((state) => state.persons);
  const [isLoad, setIsLoad] = useState(false);

  const handleFaceCapture = () => {
    if (Object.values(persons).length === 0) {
      alert("No Persons. Add one First.");
    } else {
      FaceSDK.presentFaceCaptureActivity(
        (faceCaptureResponse) =>
          handleCompareFaces(JSON.parse(faceCaptureResponse).image.bitmap),
        (e) => {
          alert("Error while recognise face." + e);
        }
      );
    }
  };

  const handleCompareFaces = async (currentImage) => {
    const currImage = new MatchFacesImage();
    currImage.imageType = ImageType["PRINTED"];
    currImage.bitmap = currentImage;

    setIsLoad(true);
    let isLoad = true;

    let imagesLenght = 0;
    Object.values(persons).map((person) => {
      const image = new MatchFacesImage();
      image.imageType = ImageType["PRINTED"];
      image.bitmap = person.identifyPerson;
      const request = new MatchFacesRequest();
      request.images = [currImage, image];

      FaceSDK.matchFaces(
        JSON.stringify(request), // convert object to string
        (matchFacesResponse) => {
          // console.log("matchFacesResponse: ", matchFacesResponse);
          const response = JSON.parse(matchFacesResponse);
          if (response?.exception?.message) {
            isLoad = false;
            setIsLoad(false);
            alert("Error Internet Is Required.");
          } else {
            const similarity = response.results[0]?.similarity; // from 1 to 0.0 => .5 .11111111111
            if (similarity > 0.5 && isLoad) {
              navigation.navigate("PersonsStack", {
                screen: "PersonDetails",
                params: person,
              });
              isLoad = false;
              setIsLoad(false);
            }
            imagesLenght++;
            if (imagesLenght === Object.keys(persons).length) {
              isLoad = false;
              setIsLoad(false);
              alert("Unknown person.");
            }
          }
        },
        (e) => {
          console.log("error: ", error);
          alert("Error Internet Is Required.");
          imagesLenght++;
        }
      );
    });
  };

  return (
    <ScrollView style={{ flex: 1, backgroundColor: bg_color }}>
      <LinearGradient
        colors={["#ffffff", primary_color_light, "#8C81F7"]}
        style={{ flex: 1, height: height - 60 }}
      >
        <PageHeader
          style={{ paddingHorizontal: "10%" }}
          left={<Octicons name="three-bars" size={28} color={primary_color} />}
          right={<FontAwesome name="bell" size={30} color={primary_color} />}
        />
        <View style={styles.container}>
          <Text style={styles.headerText}>
            Good afternoon,
            {logedUser?.name}
          </Text>

          <View style={styles.center}>
            <ImageBackground
              source={require("../assets/circle.png")}
              resizeMode="center"
              style={[styles.image, { height: height / 2, width: width / 1.5 }]}
            >
              {isLoad ? (
                <ActivityIndicator color="#ffffff" size={50} />
              ) : (
                <Pressable onPress={handleFaceCapture} style={styles.btn}>
                  <Image
                    source={require("../assets/recognise.png")}
                    style={{ height: 90, width: 90 }}
                    resizeMode="center"
                  />
                  <Text style={styles.text}>Identify Person</Text>
                </Pressable>
              )}
            </ImageBackground>
          </View>
        </View>
      </LinearGradient>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, paddingHorizontal: "10%" },
  headerText: {
    fontSize: 24,
    color: "#242334",
    fontWeight: "700",
    fontFamily: FONT_REGULAR,
  },
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
  image: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 40,
    borderRadius: 10000,
  },
  btn: {
    width: "100%",
    height: "60%",
    alignItems: "center", // if flexDirection => column working on X . if flexDirection => row working on Y
    justifyContent: "center", // if flexDirection => column working on Y . if flexDirection => row working on X
    borderRadius: 10000,
  },
  text: {
    fontSize: 15,
    fontFamily: FONT_REGULAR,
    color: "#FFFFFF",
    paddingTop: 14,
  },
});

export default Homepage;
