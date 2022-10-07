import React, { useState } from "react";
import { Button, ScrollView, Switch, TextInput, View, StyleSheet, Text } from "react-native";
import AsyncStorage from "@react-native-community/async-storage";

const RegisterScreen = ({ navigation }) => {
    const [userEmail, setUserEmail] = useState('');
    const [userName, setUserName] = useState('');
    const [userPassword, setUserPassword] = useState('');
    const [userAdmin, setUserAdmin] = useState(false);
    const [userBusiness, setUserBusiness] = useState('');
    const [errorText, setErrorText] = useState('');

    const handleSubmitPress = () => {
        setErrorText("");
        if (!userEmail) {
            alert('Please enter your email');
            return;
        }
        if (!userName) {
            alert('Please enter your name');
            return;
        }
        if (!userPassword) {
            alert('Please enter your password');
            return;
        }
        if (userAdmin && !userBusiness) {
            alert('Please enter the name of your business');
            return;
        }

        let dataToSend = {
            email: userEmail,
            name: userName,
            password: userPassword,
            telephone: '',
            address: '',
            isAdmin: userAdmin,
            profilePicture: '',
            businessName: userBusiness
        };

        fetch('https://proyecto-estr-fisica.vercel.app/api/register', {
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
                navigation.replace("BottomTabs")
            }).catch((error) => {
                setErrorText('No fue posible Registrarse');
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
                onChangeText={(userName) => {
                    setUserName(userName);
                }}
                placeholder="Enter your name"
                keyboardType="default"
            />
            <TextInput
                onChangeText={(userPassword) => {
                    setUserPassword(userPassword);
                }}
                placeholder="Enter your password"
                keyboardType="default"
                secureTextEntry={true}
            />
            <View>
                <Text>¿Es un negocio?</Text>
                <Switch value={userAdmin} onValueChange={(userAdmin) => setUserAdmin(userAdmin)}></Switch>
            </View>
            {userAdmin ? (
                <TextInput
                    onChangeText={(userBusiness) => setUserBusiness(userBusiness)}
                    placeholder="Enter the name of your business"
                    keyboardType="default"
                />
            ) : null}
            {errorText != '' ? (
                <Text style={styles.errorTextStyle}>{errorText}</Text>
            ) : null}
            <Button title="Registrarse" onPress={handleSubmitPress} />
            <Button title="Iniciar Sesión" onPress={() => navigation.navigate('Login')} />
        </View>
    );
}

export default RegisterScreen;

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