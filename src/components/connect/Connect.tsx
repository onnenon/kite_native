import React, { Component } from 'react';
import {
  Button,
  StyleSheet,
  Text,
  TextInput,
  View
  } from 'react-native';
import { string } from 'prop-types';

export default class Connect extends Component {
  public constructor(props: any) {
    super(props);
    this.state = {
      host: string,
      port: string
    };
  }

  public updateHost = (host: string): void => {
    this.setState({ host });
  };

  public updatePort = (port: string): void => {};

  render() {
    return (
      <View>
        <Text style={styles.heading}>Kite</Text>
        <Text>Enter Server Hostname or IP</Text>
        <TextInput keyboardType={"url"} onChangeText={host => this.updateHost(host)} placeholder="Hostname" />
        <TextInput keyboardType={"number-pad"} onChangeText={port => this.updatePort(port)} placeholder="Port Number" />
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
