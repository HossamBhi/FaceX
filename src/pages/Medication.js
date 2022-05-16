import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";

const Medication = (props) => {
  return (
    <ScrollView style={{ flex: 1 }}>
      <View style={styles.container}>
        <Text>Medication</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {},
});

export default Medication;
