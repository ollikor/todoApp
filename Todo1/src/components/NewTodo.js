import React, { Component } from 'react';
import { View, Button, TextInput, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';

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

    newtodo = () => {
        const newItem = {
            title: this.state.title,
            content: this.state.content,
            id: Date.now()
        };
        this.props.handleValue(newItem);
        this.setState({showInput: !this.state.showInput})
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
        width: 80,
        bottom: 10,
        right: 10,
        padding: 10,
        backgroundColor: '#ff9900',
        borderRadius: 100,
        elevation: 10
    },
    icon: {
        color: '#ffffff',
        fontSize: 60,
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