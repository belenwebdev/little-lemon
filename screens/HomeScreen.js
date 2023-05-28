import React, { useState, useEffect } from 'react';
import { Text, Image, StyleSheet, TextInput, SafeAreaView, Pressable, View, StatusBar, FlatList} from 'react-native';

const HomeScreen = ({navigation}) => {

    const [menuItems, setMenuItems] = React.useState([]);

    useEffect(()=>{
        fetch('https://raw.githubusercontent.com/Meta-Mobile-Developer-PC/Working-With-Data-API/main/capstone.json')
            .then(res=>res.json())
            .then(res=>{
                console.log('fetched menu',res);
                setMenuItems(res.menu);
            });
    },[]);

    const Item = ({item}) => (
        <View style={styles.item}>
            <View style={styles.inline}>
                <View style={styles.itemDetails}>
                    <Text style={styles.title}>{item.name}</Text>
                    <Text style={{color:'grey'}} numberOfLines={2}>{item.description}</Text>
                    <Text style={{fontWeight:'bold'}}>${item.price}</Text>
                </View>
                <Image style={styles.image} source={{uri:`https://github.com/Meta-Mobile-Developer-PC/Working-With-Data-API/blob/main/images/${item.image}?raw=true`}}/>
            </View>
        </View>
    );

    return (
        <SafeAreaView style={styles.container}>
            <FlatList
                data={menuItems}
                renderItem={({item}) => <Item item={item} />}
                keyExtractor={item => item.name}
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: StatusBar.currentHeight || 0,
    },
    item: {
        backgroundColor: 'white',
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#fefefe',
    },
    itemDetails: {
        flexDirection: 'column',
        justifyContent:'space-between',
        flex:1,
        paddingRight:10,
    },
    title: {
        fontWeight: 'bold',
        fontSize: 16,
    },
    inline: {
        flexDirection: 'row',
    },
    image:{
        width:80,
        height:80,
        resizeMode: 'cover'
    }
});

export default HomeScreen;
