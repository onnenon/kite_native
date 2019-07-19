import React, { Component } from "react";
import { Text, View, TextInput, Button, StyleSheet } from "react-native";

import Colors from "../../colors";

export default class Connect extends Component {
  state = {
    host: String,
    port: Number
  };

  public updatePort(port: string) {
    this.setState({ port });
  }

  public updateHost(host: string) {
    this.setState({ host });
  }

  render() {
    return (
      <View style={styles.body}>
        <Text style={styles.heading}>Kite</Text>
        <Text style={styles.info}>Enter Server Hostname or IP</Text>
        <TextInput
          style={styles.input}
          placeholder="Hostname"
          onChangeText={host => this.updateHost(host)}
          keyboardType={"url"}
        />
        <TextInput
          style={styles.input}
          placeholder="Port Number"
          onChangeText={port => this.updatePort(port)}
          keyboardType={"number-pad"}
        />
        <Button onPress={() => this.forceUpdate} title="Connect" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  body: {
    backgroundColor: Colors.darkGrey,
    width: "60%"
  },
  heading: {
    fontSize: 30,
    fontWeight: "bold",
    paddingBottom: 20,
    color: Colors.offWhite
  },
  input: {
    borderRadius: 4,
    padding: 5,
    marginBottom: 10,
    backgroundColor: Colors.offWhite,
    fontSize: 14
  },
  info: {
    fontSize: 12,
    paddingBottom: 10,
    color: Colors.offWhite
  }
});
