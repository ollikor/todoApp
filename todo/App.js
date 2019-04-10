/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    StatusBar,
} from 'react-native';

import NewTodo from './src/components/NewTodo';
import ShowTodo from './src/components/ShowTodo';

export default class App extends Component {
    state = {
        items: [],
        refreshing: false
    }

    handleValue = (value) => {
        this.setState({
            refreshing: value
        });
    }

  render() {
    return (
      <View style={styles.container}>
        <StatusBar
        backgroundColor="#ffa31a"
      />
        <View style={styles.header}>
            <Text style={styles.headerText}>Todo</Text>
        </View>
        <ShowTodo/>
        <NewTodo handleValue={this.handleValue}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#e6e6e6',
    },
    header: {
        alignItems: 'center',
        backgroundColor: '#ff9900',
        padding: 20,
        elevation: 2
    },
    headerText: {
        fontSize: 25,
        color: '#ffffff'
    }
});