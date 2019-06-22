import React, { Component } from "react";
import { Text, View, TextInput, Button, StyleSheet } from "react-native";

export default class Connect extends Component {
  state = {
    host: String,
    port: Number
  };

  render() {
    return (
      <View>
        <Text style={styles.heading}>Kite</Text>
        <Text>Enter Server Hostname or IP</Text>
        <TextInput
          placeholder="Hostname"
          onChangeText={host => this.setState({ host })}
          keyboardType={"url"}
        />
        <TextInput
          placeholder="Port Number"
          onChangeText={port => this.setState({ port })}
          keyboardType={"number-pad"}
        />
        <Button onPress={() => this.forceUpdate} title="Connect" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  heading: {
    fontSize: 20,
    fontWeight: "bold",
    paddingBottom: 20
  },
  input: {
    borderColor: "#2d2d2d",
    borderWidth: 0.5,
    borderRadius: 4,
    paddingVertical: 5
  }
});
