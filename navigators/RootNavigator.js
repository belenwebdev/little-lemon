import React, { useState } from 'react';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Header from '../components/Header'
import OnboardingScreen from "../screens/OnboardingScreen";
import SplashScreen from '../screens/SplashScreen';
import ProfileScreen from '../screens/ProfileScreen';

const Stack = createNativeStackNavigator();

// const[isLoading, setIsLoading] = React.useState(true);

const RootNavigator = () => {
    // if (isLoading) {
    //     // We haven't finished reading from AsyncStorage yet
    //     return <SplashScreen />;
    // }
    return (
        <Stack.Navigator initialRouteName="Onboarding">
            <Stack.Screen name="Onboarding" component={OnboardingScreen} options={{ headerTitle: (props) => <Header {...props}/>}} />
            <Stack.Screen name="Profile" component={ProfileScreen} options={{ headerTitle: (props) => <Header {...props}/>}} />
        </Stack.Navigator>
    );
};

export default RootNavigator;