import React, { useState, useEffect } from 'react';
import { Text, Image, StyleSheet, TextInput, SafeAreaView, Pressable, View, StatusBar, FlatList} from 'react-native';
import {
    createTable,
    getFilteredMenuItems,
    getMenuItems,
    saveMenuItems,
} from '../database';
import Filters from '../components/Filters';

const API_URL = 'https://raw.githubusercontent.com/Meta-Mobile-Developer-PC/Working-With-Data-API/main/capstone.json';
const FILTERS = ['starters','main','desserts','drinks','specials'];

const fetchData = async() => {
    return fetch(API_URL)
        .then(response => response.json())
        .then(apiData => {
            return apiData.menu;
        });
}

const HomeScreen = ({navigation}) => {

    const [menuItems, setMenuItems] = React.useState([]);
    const [activeFilters, setActiveFilters] = useState(
        FILTERS.map(() => false)
    );
    const [filteredItems, setFilteredItems] = React.useState([]);
    const [filterText, setFilterText] = React.useState('');

    useEffect(() => {
        (async () => {
            try {
            await createTable();
            console.log('table was created');
            let menuItems = await getMenuItems();
            // The application only fetches the menu data once from a remote URL
            // and then stores it into a SQLite database.
            // After that, every application restart loads the menu from the database
            if (!menuItems || !menuItems.length) {
                menuItems = await fetchData();
                console.log('fetched menu items', menuItems);
                saveMenuItems(menuItems);
            }
            setMenuItems(menuItems);
            setFilteredItems(menuItems);
            } catch (e) {
            // Handle error
            Alert.alert(e.message);
            }
        })();
    }, []);

    const handleFiltersChange = async (index) => {
        const arrayCopy = [...activeFilters];
        arrayCopy[index] = !activeFilters[index];
        setActiveFilters(arrayCopy);
    };

    React.useEffect(()=>{
        // filter by category
        if(!activeFilters.includes(true)){
            console.log('no filters selected')
            setFilteredItems(menuItems);
        }
        else {
            const newFilteredItems = menuItems.filter(item=>{
                return activeFilters[FILTERS.indexOf(item.category.toLowerCase())]
            });
            console.log('result of filtering', newFilteredItems);
            setFilteredItems(newFilteredItems);
        }
        // filter by text
        if(!!filterText){
            const newFilteredItems = filteredItems.filter(item=>item.name.toLowerCase().indexOf(filterText.toLowerCase())>=0);
            setFilteredItems(newFilteredItems);
        }
    },[activeFilters,filterText]);

    useEffect(() => {
        (async () => {
            try {
                console.log('filter text', filterText);
                const categories = [];
                for(let i =0;i<FILTERS.length;i++){
                    if(activeFilters[i]) categories.push(FILTERS[i]);
                }
                let menuItems = await getFilteredMenuItems(filterText, categories);
                console.log('filtered menu items', menuItems);
            } catch (e) {
                // Handle error
                Alert.alert(e.message);
            }
        })();
    }, [filterText]);

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
        <SafeAreaView>
            <View style={styles.heroSection}>
                <Text style={styles.heroTitle}>Little Lemon</Text>
                <View style={styles.inline}>
                    <View style={{flex:1}}>
                        <Text style={styles.heroSubtitle}>Chicago</Text>
                        <Text style={styles.heroText}>We are a family owned Mediterranean restaurant, focused on traditional recipes served with a modern twist.</Text>
                        <TextInput
                            style={styles.input}
                            onChangeText={(text) => setFilterText(text)}
                            value={filterText}
                            placeholder="Search..."
                            keyboardType="text"
                        />
                    </View>
                    <Image source={require('../assets/hero.jpg')} style={styles.heroImage} />
                </View>
            </View>
            <Text style={{...styles.title,...styles.firstTitle}}>ORDER FOR DELIVERY!</Text>
            <Filters filters={FILTERS} onChange={handleFiltersChange} activeFilters={activeFilters}/>
            <FlatList
                data={filteredItems}
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
    heroSection:{
        backgroundColor: '#51614a',
        padding:10
    },
    heroTitle:{
        fontSize:30,
        color:'#F4CE14'
    },
    heroSubtitle:{
        fontSize:24,
        color:'white'
    },
    heroText:{
        color:'white',
    },
    heroImage:{
        height:120,
        width:120,
        resizeMode:'cover',
        borderRadius:10,
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
    },
    firstTitle: {
        paddingLeft:15,
        paddingTop:10,
    },
    input: {
        borderBottomColor:'#F4CE14',
        borderBottomWidth : 1,
        padding: 10,
        paddingLeft:0,
        color: 'white',
    },
});

export default HomeScreen;
