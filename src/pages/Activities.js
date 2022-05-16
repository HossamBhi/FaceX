import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";

const Activities = (props) => {
  return (
    <ScrollView style={{ flex: 1 }}>
      <View style={styles.container}>
        <Text>Activities</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {},
});

export default Activities;
