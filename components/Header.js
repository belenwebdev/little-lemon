import * as React from 'react';
import { Image, View, StyleSheet } from 'react-native';

const Header = () => {

    return (
        <View style={styles.container}>
            <Image source={require('../assets/logo_navbar.png')} style={styles.logo}/>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
    },
    logo: {
        resizeMode:'contain',
        width: 150,
        height: 50,
    }
});

export default Header;
