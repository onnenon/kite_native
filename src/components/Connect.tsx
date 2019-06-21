import React, { Component } from "react";
import { Text, View, TextInput, Button } from "react-native";

export default class Connect extends Component {
  state = {
    host: "Hostname",
    port: "Port"
  };

  render() {
    return (
      <View>
        <Text>Enter Server Hostname or IP</Text>
        <TextInput
          value={this.state.host}
          onChangeText={host => this.setState({ host })}
          clearTextOnFocus={true}
        />
        <TextInput
          value={this.state.port}
          onChangeText={port => this.setState({ port })}
          clearTextOnFocus={true}
        />
        <Button onPress={() => this.forceUpdate} title="Connect" />
      </View>
    );
  }
}
