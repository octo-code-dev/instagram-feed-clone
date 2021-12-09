import React, { Component } from 'react';
import io from 'socket.io-client';
import api from '../services/api';

import { View, FlatList, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

import more from '../assets/more.png';
import like from '../assets/like.png';
import comment from '../assets/comment.png';
import send from '../assets/send.png';

export default class Feed extends Component {

    state = {
        feed: [],
    };

    async componentDidMount(){
        this.registerToSocket();

        const response = await api.get('posts');

        /*
        Testar se está funcionando a requisição dos posts para o servidor.
        No app, abra o menu de desenvolvimento do React Native. 
        Você consegue abrir pressionando e segurando o botão de menu ou acionando o “Shake Gesture” (sacudir o device).
        Na janela que será aberta marque as opções "Dark Theme" e "Maintain Priority".
        Tecle F12 para abrir as ferramentas de desenvolvedor e clique na aba "Console".
        Se forem retornados os dados dos posts no Console, é porque está funcionando.
        */
        //console.log(response.data);

        this.setState({ feed: response.data });
    }
    
    registerToSocket = () => {
        const socket = io('http://10.0.2.2:3333');

        socket.on('post', newPost => {
            this.setState({ feed: [newPost, ...this.state.feed] });
        })

        socket.on('like', likedPost => {
            this.setState({
                feed: this.state.feed.map(post => 
                  post._id === likedPost._id ? likedPost : post
                )
            });
        })
    }
    
    handleLike = id => {
        api.post(`/posts/${id}/like`);
    }   
    
    /*
    FlatList é um elemento de lista pronto do React Native. 
    
    A propriedade keyExtractor receberá cada post da aplicação e
    retornará a chave única, neste caso, o ID do post. 
    
    A propriedade renderItem recebe uma função que tem por objeto retornar um conteúdo JSX.
    */
    render() {
        return (
            <View style={styles.container}>
                <FlatList
                    data={this.state.feed}
                    keyExtractor={post => post._id}
                    renderItem={({ item }) => (
                        <View style={styles.feedItem}>

                            <View style={styles.feedItemHeader}>
                                <View style={styles.userInfo}>
                                    <Text style={styles.name}>{item.author}</ Text>
                                    <Text style={styles.name}>{item.place}</ Text>
                                </ View>

                                <Image source={more} />
                            </ View>

                            <Image style={styles.feedImage} source={{ uri: `http://10.0.2.2:3333/files/${item.image}` }} />

                            <View style={styles.feedItemFooter}>
                                <View style={styles.actions}>
                                    <TouchableOpacity style={styles.action} onPress={() => this.handleLike(item._id)}>
                                        <Image source={like} />
                                    </ TouchableOpacity>
                                    <TouchableOpacity style={styles.action} onPress={() => {}}>
                                        <Image source={comment} />
                                    </ TouchableOpacity>
                                    <TouchableOpacity style={styles.action} onPress={() => {}}>
                                        <Image source={send} />
                                    </ TouchableOpacity>
                                </ View>
                            </ View>

                            <Text style={styles.likes}>{item.likes} curtidas</ Text>
                            <Text style={styles.description}>{item.description}</ Text>
                            <Text style={styles.hashtags}>{item.hashtags}</ Text>
                        </ View>
                    )}
                />
            </ View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

    feedItem: {
        marginTop: 20
},

    feedItemHeader: {
        paddingHorizontal: 25,

        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },

    name: {
        fontSize: 14,
        color: '#000'
    },


    place: {
        fontSize: 12,
        color: '#666',
        marginTop: 2
    },

    feedImage: {
        width: '100%',
        height: 400,
        marginVertical: 15,
    },

    feedItemFooter: {
        paddingHorizontal: 15,
    },

    actions: {
        flexDirection: 'row'
    },

    action: {
        marginRight: 8,
    },

    likes: {
        marginTop: 15,
        paddingLeft: 15,
        fontWeight: 'bold',
        color: '#000',
    },

    description: {
        paddingLeft: 15,
        lineHeight: 18,
        color: '#000'
    },

    hashtags: {
        paddingLeft: 15,
        color: '#7159c1'
    },
});
