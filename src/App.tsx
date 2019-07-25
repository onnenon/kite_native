import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';

import Colors from './styles/colors';
import Connect from './components/connect/Connect';

interface Props {}
export default class App extends Component<Props> {
  render() {
    return (
      <View style={styles.container}>
        <Connect />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.darkGrey,
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
