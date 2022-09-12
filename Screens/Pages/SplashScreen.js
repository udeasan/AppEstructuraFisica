import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

const SplashScreen = ({ navigation }) => {

    useEffect(() => {
        setTimeout(() => {
            AsyncStorage.getItem('token').then((value) => {
                navigation.replace( value === null ? "Auth" : "Home")
            });
        }, 5000);
    }, []);

    return (
        <View style={styles.container}>
            <Text style={{ color: 'blue', }}>Verificando usuario existente</Text>
            <Text>---</Text>
            <Text style={{ color: 'black', }}>Gestión de citas</Text>
            <Text style={{ color: 'black', }}>UdeA - 2022</Text>
        </View>
    );
}

export default SplashScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'gray'
    },
});