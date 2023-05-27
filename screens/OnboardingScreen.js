import * as React from 'react';
import { Text, Image, StyleSheet, TextInput, SafeAreaView, Pressable } from 'react-native';
import {validateEmail} from '../utils/index';

const OnboardingScreen = ({navigation, onCompleteOnboarding}) => {

  const [name, onChangeName] = React.useState('');
  const [email, onChangeEmail] = React.useState('');

  const isFormValid = ()=>{
    return !!name && !!email && validateEmail(email);
  }

  const continueOnboarding = ()=>{
    if(isFormValid()){
      onCompleteOnboarding(name, email);
      navigation.navigate('Home');
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={{...styles.text, fontWeight: 'bold', marginBottom:40}}>Let us get to know you</Text>
      <Text style={styles.text}>First Name</Text>
      <TextInput
        style={styles.input}
        onChangeText={onChangeName}
        value={name}
        placeholder="Your first name"
        keyboardType="text"
      />
      <Text style={styles.text}>E-mail</Text>
      <TextInput
        style={styles.input}
        onChangeText={onChangeEmail}
        value={email}
        placeholder="Your e-mail"
        keyboardType="email-address"
      />
      <Pressable onPress={continueOnboarding} style={isFormValid() ? styles.button : styles.buttonDisabled}>
        <Text style={styles.buttonText}>Next</Text>
      </Pressable>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 20,
    resizeMode: 'contain',
  },
  text: {
    width: 300,
    textAlign: 'center',
    fontSize: 20,
  },
  input: {
    borderColor: '#51614a',
    width:300,
    marginTop: 20,
    marginBottom: 20,
    fontSize: 20,
    textAlign: 'center',
    borderWidth : 1,
    padding: 10,
    borderRadius: 10,
  },
  button: {
    backgroundColor: '#51614a',
    width: 300,
    padding: 10,
    borderRadius: 10,
    marginBottom: 40,
    marginTop: 10,
  },
  buttonText: {
    textAlign: 'center',
    color: 'white',
    fontSize: 20,
  },
  buttonDisabled : {
    backgroundColor : '#B7B7B7',
    width: 300,
    padding: 10,
    borderRadius: 10,
    marginBottom: 40,
    marginTop: 10,
  },
});

export default OnboardingScreen;
