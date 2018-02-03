import React, { Component } from 'react';
import { ScrollView, View, Text, Alert, TouchableOpacity } from 'react-native';

export default class NewTodo extends Component {
    handleDelete = (id) => {
        Alert.alert(
            'Delete todo',
            'Are you sure that you want delete this todo?',
            [
              {text: 'OK', onPress: () => this.props.handleDelete(id)},
            ],

          )
        }
    render(){
        return(
            <ScrollView>
                <View style={styles.scroll}>
                    {this.props.item.map((item, i) => (
                        <TouchableOpacity key={i} style={styles.view}  onPress={()=> this.handleDelete(item.id)}>
                            <Text style={styles.title}>{item.title}</Text>
                            <Text style={styles.content}>{item.content}</Text>
                        </TouchableOpacity>
                    ))}
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
        fontSize: 30
    },
    content: {
        fontSize: 20,
        margin: 10
    }
}