import React, { useState } from 'react';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Header from '../components/Header'
import OnboardingScreen from "../screens/OnboardingScreen";
import SplashScreen from '../screens/SplashScreen';
import ProfileScreen from '../screens/ProfileScreen';

const Stack = createNativeStackNavigator();

const RootNavigator = () => {

    const[state, setState] = React.useState({isLoading:false, isOnboardingCompleted: false});

    if (state.isLoading) {
        // We haven't finished reading from AsyncStorage yet
        return <SplashScreen />;
    }
    return (
        <Stack.Navigator initialRouteName={ state.isOnboardingCompleted ? 'Profile' : 'Onboarding'}>
            <Stack.Screen name="Profile" component={ProfileScreen} options={{ headerTitle: (props) => <Header {...props}/>}}/>
            <Stack.Screen name="Onboarding" component={OnboardingScreen} options={{ headerTitle: (props) => <Header {...props}/>}} />
        </Stack.Navigator>
    );
};

export default RootNavigator;