import React, { useState } from "react";
import { StyleSheet, Button, ScrollView, TextInput, View, Text } from "react-native";
import AsyncStorage from "@react-native-community/async-storage";


const LoginScreen = ({ navigation }) => {
    const [userEmail, setUserEmail] = useState('');
    const [userPassword, setUserPassword] = useState('');
    const [errorText, setErrorText] = useState('');

    const handleSubmitPress = () => {
        setErrorText('');
        if (!userEmail) {
            alert('Please enter your email');
            return;
        }
        if (!userPassword) {
            alert('Please enter your password');
            return;
        }

        let dataToSend = { email: userEmail, password: userPassword };

        fetch('https://proyecto-estr-fisica.vercel.app/api/login', {
            method: 'POST',
            body: JSON.stringify(dataToSend),
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
        })
            .then((response) => response.json())
            .then((responseJson) => {
                AsyncStorage.setItem('token', responseJson.token);
                navigation.replace("Home")
            }).catch((error) => {
                setErrorText('No fue posible iniciar sesión');
            })
            
    }

    return (
        <View style={styles.containerStyle}>
            <TextInput
                onChangeText={(userEmail) => {
                    setUserEmail(userEmail);
                }}
                placeholder="Enter your email"
                keyboardType="email-address"
            />
            <TextInput
                onChangeText={(userPassword) => {
                    setUserPassword(userPassword);
                }}
                placeholder="Enter your password"
                keyboardType="default"
                secureTextEntry={true}
            />
            {errorText != '' ? (
                <Text style={styles.errorTextStyle}>{errorText}</Text>
            ) : null}
            <Button title="Iniciar Sesión" onPress={handleSubmitPress} />
            <Button title="Registrarse" onPress={() => navigation.navigate('Register')} />
        </View>
    );
};

export default LoginScreen;

const styles = StyleSheet.create({
    containerStyle: {
        flex: 1,
        justifyContent: 'center',
        alignContent: 'center',
        backgroundColor: 'gray',
    },
    errorTextStyle: {
        color: 'red',
        textAlign: 'center',
        fontSize: 14,
    },
});