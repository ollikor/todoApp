/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    StatusBar,
    AsyncStorage
} from 'react-native';

import NewTodo from './src/components/NewTodo';
import ShowTodo from './src/components/ShowTodo';

/*const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});*/

export default class App extends Component {
    state = {
        items: []
    }

    handleValue = (item) => {
        this.setState(prevState => ({
            items: prevState.items.concat(item)
        }));
    }
    delete = (id) => {
        const items = this.state.items;
        const index = items.findIndex(x => x.id === id);
        items.splice(index, 1);
        this.setState({items: items});
    }
  render() {
    return (
      <View style={styles.container}>
        <StatusBar
        backgroundColor="#ffa31a"
      />
        <View style={styles.header}>
            <Text style={styles.headerText}>Awesome Todo App</Text>
        </View>
        <ShowTodo handleDelete={this.delete} item={this.state.items}/>
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
    }
});
