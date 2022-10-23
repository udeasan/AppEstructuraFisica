import AsyncStorage from "@react-native-community/async-storage";
import React, { useEffect, useState } from "react";
import { View, Text, Button, Alert } from "react-native";

const HomeScreen = ({ navigation }) => {

    const [userName, setUserName] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const [userAdmin, setUserAdmin] = useState(false);

    useEffect(() => {
        AsyncStorage.getItem('token').then((value) => {
            if(value === null){
                navigation.replace('Auth');
            };
            let auth = "Bearer " + value;
            fetch('https://proyecto-estr-fisica.vercel.app/api/me', {
            method: 'GET',
            headers: {
                'Authorization' : auth,
            },
        })
            .then((response) => response.json())
            .then((responseJson) => {
                AsyncStorage.setItem('isAdmin', responseJson.isAdmin);
                setUserName(responseJson.name);
                setUserEmail(responseJson.email);
                setUserAdmin(responseJson.isAdmin);
            }).catch((error) => {
                console.log(error)
                console.error("Ocurrio un error al consultar el usuario")
            })
        })
    }, [])

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text style={{ color: 'black', }}>Home Screen</Text>
            <Text style={{ color: 'black', }}>User Name: {userName}</Text>
            <Text style={{ color: 'black', }}>User Email: {userEmail}</Text>
            <Button title="Cerrar Sesión"
                onPress={
                    () => {
                        Alert.alert('Log Out',
                            'Estás seguro de que deseas cerrar sesión?',
                            [{
                                text: 'Cancel',
                                onPress: () => {
                                    return null;
                                }
                            }, {
                                text: 'Confirm',
                                onPress: () => {
                                    AsyncStorage.clear();
                                    navigation.replace('Auth');
                                }
                            }],
                            { cancelable: false }
                        );
                    }
                } />
        </View>
    );
}

export default HomeScreen;