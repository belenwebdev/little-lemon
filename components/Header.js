import * as React from 'react';
import { Image, View, StyleSheet, Pressable } from 'react-native';

const Header = () => {
    return (
        <Image source={require('../assets/logo_navbar.png')} style={styles.logo}/>
    );
};

const styles = StyleSheet.create({
    logo: {
        resizeMode:'contain',
        height: 50,
        width:120,
    }
});

export default Header;
