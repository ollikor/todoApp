import React, { Component } from 'react';
import { View, Button, TextInput, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
import AsyncStorage from '@react-native-community/async-storage';

const uuidv3 = require('uuid/v3');

export default class NewTodo extends Component {
    state = {
        showInput: false,
        title: '',
        content: ''
    }

    showInput = () => {
        this.setState({
            showInput: !this.state.showInput
        });
    }

    newtodo = async () => {
        let array = [];
        const newItem = {
            title: this.state.title,
            content: this.state.content,
        };
        const existingTodos = await AsyncStorage.getItem('todos');

        if(existingTodos !== null) {
            let allTodos = JSON.parse(existingTodos);
            if(allTodos.length > 0){
                for(let i = 0; i < allTodos.length; i++){
                    array.push(allTodos[i]);
                }
            }
        }

        array.push(newItem);
        await AsyncStorage.setItem('todos', JSON.stringify(array));
        this.props.handleValue(true);
        this.setState({showInput: !this.state.showInput, title: '', content: ''})
    }

    render(){
        return(
            <View style={styles.content}>
                <TouchableOpacity
                    onPress={() => this.showInput()}
                    style={styles.addTodo}
                >
                    <Icon  style={styles.icon} name='plus' />
                </TouchableOpacity>
                {
                    this.state.showInput ?
                    <View style={styles.view}>
                        <TextInput
                            placeholder='Title'
                            onChangeText={(title) => this.setState({title})}
                        />
                        <TextInput
                        placeholder='Content'
                        onChangeText={(content) => this.setState({content})}
                        />
                        <TouchableOpacity
                            onPress={() => this.newtodo()}
                            style={styles.add}
                        >
                        <Text style={styles.addText}>Add</Text>
                        </TouchableOpacity>
                    </View>
                : null
                }
            </View>
        );
    }
}

const styles = {
    view: {
        padding: 20,
        backgroundColor: '#ffffff',
        elevation: 10
    },
    addTodo: {
        zIndex: 1,
        position: 'absolute',
        width: 65,
        height: 65,
        bottom: 10,
        right: 10,
        padding: 10,
        backgroundColor: '#ff9900',
        borderRadius: 32.5,
        elevation: 10,
        justifyContent: 'center'
    },
    icon: {
        color: '#ffffff',
        fontSize: 40,
        textAlign: 'center',
        elevation: 50
    },
    add: {
        marginTop: 10,
        width: 100,
        padding: 10,
        backgroundColor: '#ff9900',
        borderRadius: 10,
        elevation: 10
    },
    addText: {
        fontSize: 20,
        textAlign: 'center',
        color: 'white'
    }
}