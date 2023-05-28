import React, { useState, useEffect } from 'react';
import { Image, View, StyleSheet, Pressable, Text } from 'react-native';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Header from '../components/Header'
import OnboardingScreen from "../screens/OnboardingScreen";
import SplashScreen from '../screens/SplashScreen';
import ProfileScreen from '../screens/ProfileScreen';
import HomeScreen from '../screens/HomeScreen';

const Stack = createNativeStackNavigator();

import AsyncStorage from '@react-native-async-storage/async-storage';

const RootNavigator = () => {

    const initialState = {
        isOnboardingCompleted: false,
        userData:{
            firstName: '',
            lastName:'',
            email: '',
            phone: '',
            avatar: '',
            notifications: {
                orderStatus: true,
                passwordChanges: true,
                specialOrders: true,
                newsletter: true,
            }
        }
    }

    const[state, setState] = React.useState({...initialState});
    const[isLoading, setIsLoding] = React.useState(true);

    useEffect(()=>{
        (async ()=>{
            try{
                const storedState = await AsyncStorage.getItem('state');
                console.log('stored state', storedState);
                setState(storedState == null ? initialState : JSON.parse(storedState));
                setIsLoding(false);
            }
            catch(e){}
        })();
    }, []);

    useEffect(()=>{
        (async ()=>{
            try{
                console.log('store new state', state);
                await AsyncStorage.setItem('state', JSON.stringify(state));
            } catch(e) {}
        })();
    }, [state]);

    function completeOnboarding(name, email){
        console.log('completeOnboarding', name, email);
        const newUserData = {...state.userData, firstName: name, email: email, avatar:'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'};
        setState(prevState=>{return {...prevState, isOnboardingCompleted: true, userData: newUserData}});
    }

    function signOut(){
        console.log('sign out');
        setState(prevState=>{return {...prevState, isOnboardingCompleted: false, userData: initialState.userData}});
    }

    function onSaveChanges(userData){
        console.log('save user data', userData);
        setState(prevState=>{return {...prevState, userData: userData}});
    }

    const headerTitle = (props) => <Header {...props}/>;

    const headerOptions = ({ navigation }) => ({
        headerTitle: headerTitle,
        headerRight: () => (
            <Pressable
                onPress={() => navigation.navigate('Profile')}
            ><Image source={{uri: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'}} style={{width:40, height:40, borderRadius:20, marginRight: 10}}/></Pressable>
        ),
    });

    if (isLoading) {
        // We haven't finished reading from AsyncStorage yet
        return <SplashScreen />;
    }
    return (
        <Stack.Navigator initialRouteName={ state.isOnboardingCompleted ? 'Home' : 'Onboarding'}>
            <Stack.Screen name="Onboarding" options={{ headerTitle: headerTitle, headerBackVisible: false, headerLeft: () => <></> }}>
                {props => <OnboardingScreen {...props} onCompleteOnboarding={completeOnboarding} />}
            </Stack.Screen>
            <Stack.Screen name="Profile" options={headerOptions}>
                {props => <ProfileScreen {...props} onSignOut={signOut} onSaveChanges={onSaveChanges} initialState={state.userData} />}
            </Stack.Screen>
            <Stack.Screen name="Home" component={HomeScreen} options={headerOptions} />
        </Stack.Navigator>
    );
};

export default RootNavigator;