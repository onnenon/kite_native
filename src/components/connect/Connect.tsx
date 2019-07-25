import { string } from "prop-types";
import React, { Component } from "react";
import { Button, StyleSheet, Text, TextInput, View } from "react-native";

import Colors from "../../assets/Colors";

export default class Connect extends Component {
  public constructor(props: any) {
    super(props);
    this.state = {
      host: string,
      port: string,
    };
  }

  public updateHost = (host: string): void => {
    this.setState({ host });
  }

  public updatePort = (port: string): void => {
    this.setState({ port });
  }

  public render() {
    return (
      <View style={styles.body}>
        <Text style={styles.heading}>Kite</Text>
        <Text style={styles.info}>Enter Server Hostname or IP</Text>
        <TextInput
          style={styles.input}
          placeholder="Hostname"
          onChangeText={(host) => this.updateHost(host)}
          keyboardType={"url"}
        />
        <TextInput
          style={styles.input}
          placeholder="Port Number"
          onChangeText={(port) => this.updatePort(port)}
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
    width: "60%",
  },
  heading: {
    color: Colors.offWhite,
    fontSize: 30,
    fontWeight: "bold",
    paddingBottom: 20,
  },
  info: {
    color: Colors.offWhite,
    fontSize: 12,
    paddingBottom: 10,
  },
  input: {
    backgroundColor: Colors.offWhite,
    borderRadius: 4,
    fontSize: 14,
    marginBottom: 10,
    padding: 5,
  },
});
