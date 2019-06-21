import React, { Component } from "react";
import { Text, View, TextInput, Button } from "react-native";

export default class Connect extends Component {
  render() {
    return (
      <View>
        <Text>Enter Server Hostname or IP</Text>
        <TextInput value="Hostname" />
        <TextInput value="Port" />
        <Button onPress={() => this.forceUpdate} title="Connect" />
      </View>
    );
  }
}
