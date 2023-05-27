import * as React from 'react';
import { Text, Image, StyleSheet, TextInput, SafeAreaView, Pressable, View } from 'react-native';

const HomeScreen = ({navigation}) => {
    return (
        <View>
            <Text>home screen</Text>
            <Pressable onPress={()=>{navigation.navigate('Profile')}}><Text>view profile</Text></Pressable>
        </View>
    );
};

export default HomeScreen;
