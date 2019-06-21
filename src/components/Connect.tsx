import React, { Component } from "react";
import { Text, View, TextInput, Button } from "react-native";

export default class Connect extends Component {
  state = {
    host: "" as String,
    port: 0 as Number
  };

  render() {
    return (
      <View>
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
