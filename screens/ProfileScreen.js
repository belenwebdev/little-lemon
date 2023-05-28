import React, { useState, useEffect } from 'react';
import { Text, Image, StyleSheet, TextInput, Platform, Pressable, View, CheckBox } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

const MOCK_IMAGE = 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png';
const ProfileScreen = ({navigation, onSignOut, onSaveChanges, initialState}) => {

    console.log('initialState', initialState);

    const [userData, setUserData] = React.useState({...initialState});
    // const [image, setImage] = useState(MOCK_IMAGE);

    function removeAvatar(){
        setUserData(prevData=>{ return{...prevData, avatar: MOCK_IMAGE}});
        // setImage(MOCK_IMAGE);
    }

    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        console.log(result);

        if (!result.canceled) {
            console.log('result', result);
            const newImageUri = !!result.assets ? result.assets[0].uri : result.uri;
            console.log(newImageUri);
            setUserData(prevData=>{ return{...prevData, avatar: newImageUri}});
            // setImage(result.assets[0].uri);
        }
    };

    function handleChange(event, name) {
        const {value, type, checked} = event.target;
        console.log('handleChange', name, value);
        setUserData(prevFormData => ({
            ...prevFormData,
            [name]: type === "checkbox" ? checked : value
        }))
    }

    function handleNotificationsChange(event, name) {
        const {value, type, checked} = event.target;
        console.log('handleNotificationsChange', name, checked);
        const newNotifications = {...userData.notifications, [name]: checked};
        setUserData(prevFormData => ({
            ...prevFormData,
            notifications: newNotifications
        }))
    }

    useEffect(()=>{
        console.log('user data changed', userData);
    },[userData]);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Personal information</Text>
            <Text style={styles.text}>Avatar</Text>
            <View style={styles.inline}>
                <Image
                    style={styles.avatar}
                    source={{
                        uri: userData.avatar,
                    }}/>
                <Pressable onPress={pickImage} style={styles.buttonPrimary}>
                    <Text style={styles.buttonPrimaryText}>Change</Text>
                </Pressable>
                <Pressable onPress={removeAvatar} style={userData.avatar == MOCK_IMAGE ? styles.buttonSecondary : styles.buttonDisabled}>
                    <Text style={styles.buttonSecondaryText}>Remove</Text>
                </Pressable>
            </View>
            <Text style={styles.text}>First name</Text>
            <TextInput
                style={styles.input}
                onChange={(event) => handleChange(event, 'firstName')}
                value={userData.firstName}
                placeholder="First name"
                keyboardType="text"
            />
            <Text style={styles.text}>Last name</Text>
            <TextInput
                style={styles.input}
                onChange={(event) => handleChange(event, 'lastName')}
                value={userData.lastName}
                placeholder="Last name"
                keyboardType="text"
            />
            <Text style={styles.text}>E-mail</Text>
            <TextInput
                style={styles.input}
                onChange={(event) => handleChange(event, 'email')}
                value={userData.email}
                placeholder="Your e-mail"
                keyboardType="email-address"
            />
            <Text style={styles.text}>Phone number</Text>
            <TextInput
                style={styles.input}
                onChange={(event) => handleChange(event, 'phone')}
                value={userData.phone}
                placeholder="Your phone number"
                keyboardType="phone-pad"
            />
            <Text style={styles.title2}>E-mail notifications</Text>
            <View style={styles.checkboxContainer}>
                <CheckBox
                    value={userData.notifications?.orderStatus}
                    onChange={(event)=>handleNotificationsChange(event,'orderStatus')}
                    style={styles.checkbox}
                />
                <Text style={styles.label}>Order statuses</Text>
            </View>
            <View style={styles.checkboxContainer}>
                <CheckBox
                    value={userData.notifications?.passwordChanges}
                    onChange={(event)=>handleNotificationsChange(event,'passwordChanges')}
                    style={styles.checkbox}
                />
                <Text style={styles.label}>Password changes</Text>
            </View>
            <View style={styles.checkboxContainer}>
                <CheckBox
                    value={userData.notifications?.specialOrders}
                    onChange={(event)=>handleNotificationsChange(event,'specialOrders')}
                    style={styles.checkbox}
                />
                <Text style={styles.label}>Special Orders</Text>
            </View>
            <View style={styles.checkboxContainer}>
                <CheckBox
                    value={userData.notifications?.newsletter}
                    onChange={(event)=>handleNotificationsChange(event,'newsletter')}
                    style={styles.checkbox}
                />
                <Text style={styles.label}>Newsletter</Text>
            </View>
            <Pressable onPress={()=>{onSignOut(); navigation.navigate('Onboarding')}} style={styles.buttonYellow}>
                <Text style={styles.buttonSecondaryText}>Sign out</Text>
            </Pressable>
            <View style={styles.inline}>
                <Pressable onPress={()=>{setUserData(initialState)}} style={{...styles.buttonSecondary, flex:1}}>
                    <Text style={styles.buttonSecondaryText}>Discard changes</Text>
                </Pressable>
                <Pressable onPress={()=>{onSaveChanges(userData)}} style={{...styles.buttonPrimary, flex:1}}>
                    <Text style={styles.buttonPrimaryText}>Save changes</Text>
                </Pressable>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 10,
        paddingRight: 20,
        paddingLeft: 20,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom:0,
    },
    inline: {
        flexDirection: 'row',
        alignItems:'center',
        gap: 10,
        height:50,
    },
    text:{
        marginBottom:10,
        marginTop:10,
    },
    avatar: {
        width: 50,
        height: 50,
        resizeMode: 'contain',
        borderRadius: 50,
    },
    buttonPrimary: {
        backgroundColor: '#51614a',
        padding: 10,
        width: 100,
        borderRadius: 10,
    },
    buttonSecondary: {
        borderColor: '#51614a',
        borderWidth:1,
        padding: 10,
        width: 100,
    },
    buttonPrimaryText: {
        textAlign: 'center',
        color: 'white',
    },
    buttonSecondaryText: {
        textAlign: 'center',
        color: '#51614a'
    },
    buttonDisabled : {
        backgroundColor : '#B7B7B7',
        width: 100,
        padding: 10,
        borderRadius: 10,
    },
    input: {
        borderColor: '#51614a',
        width:300,
        borderWidth : 1,
        padding: 10,
        borderRadius: 10,
    },
    title2: {
        fontSize: 20,
        fontWeight: 'bold',
        marginTop:10,
        marginBottom:10,
    },
    checkboxContainer: {
        flexDirection: 'row',
        marginBottom: 20,
    },
    checkbox: {
        alignSelf: 'center',
        marginRight: 10,
    },
    buttonYellow: {
        backgroundColor: '#F4CE14',
        borderRadius:10,
        padding:10,
        marginBottom:10,
    }
});

export default ProfileScreen;
