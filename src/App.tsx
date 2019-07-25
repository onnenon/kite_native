import React, { Component } from "react";
import { Platform, StyleSheet, Text, View } from "react-native";

import Colors from "./assets/Colors";
import Connect from "./components/connect/Connect";

export default class App extends Component {
  public render() {
    return (
      <View style={styles.container}>
        <Connect />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: Colors.darkGrey,
    flex: 1,
    justifyContent: "center",
  },
  instructions: {
    color: "#333333",
    marginBottom: 5,
    textAlign: "center",
  },
  welcome: {
    fontSize: 20,
    margin: 10,
    textAlign: "center",
  },
});
