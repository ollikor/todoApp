import React, { Component } from 'react';
import { ScrollView, RefreshControl, View, Text, Alert, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

export default class NewTodo extends Component {

    state = {
        item: [],
        refreshing: false
    }

    componentDidMount(){
        this.onRefresh();
        this.setState({refreshing: true});
    }

    onRefresh = () => {
        this.setState({refreshing: true});
        this.getTodos().then(() => {
            this.setState({refreshing: false});
        });
    }

    getTodos = async () => {
        try {
            const todos = await AsyncStorage.getItem('todos');
            if(todos !== null) {
                let value = JSON.parse(todos);
                this.setState({item: value});
            }
        }catch (error) {
            this.setState({item: []})
        }
    }

    handleDelete = (id, i) => {
        Alert.alert(
            'Delete todo',
            'Are you sure that you want delete this todo?',
            [
              {text: 'OK', onPress: () => this.delete(i)},
            ],

          )
        }

        delete = async (i) => {
            try {
              const value = await AsyncStorage.getItem('todos');
              let allTodos = JSON.parse(value);
              if(i > -1) {
                  allTodos.splice(i, 1);
              }
              await AsyncStorage.setItem('todos', JSON.stringify(allTodos));
              this.onRefresh();
            } catch(e) {
            }
          }

    render(){
        return(
            <ScrollView refreshControl={
                <RefreshControl
                    refreshing={this.state.refreshing}
                    onRefresh={this.onRefresh}
                />
            }>
                <View style={styles.scroll}>
                {this.state.item.length > 0 ?
                    this.state.item.map((item, i) => (
                        <TouchableOpacity key={i} style={styles.view}  onPress={()=> this.handleDelete(i)}>
                            <Text style={styles.title}>{item.title}</Text>
                            <Text style={styles.content}>{item.content}</Text>
                        </TouchableOpacity>
                    ))
                :null
                }
                </View>
            </ScrollView>
        );
    }
}

const styles = {
    scroll: {
        paddingTop: 20,
        paddingBottom: 100
    },
    view: {
        backgroundColor: '#ffffff',
        padding: 10,
        marginBottom: 10,
        marginLeft: 20,
        marginRight: 20,
        elevation: 5

    },
    title: {
        fontSize: 18,
        textDecorationLine: 'underline',
        marginBottom: 5
    },
    content: {
        fontSize: 16
    }
}