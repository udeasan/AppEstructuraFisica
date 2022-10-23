import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {styles} from '../../styles/InitStyle';
const SplashScreen = ({ navigation }) => {

    useEffect(() => {
        setTimeout(() => {
            AsyncStorage.getItem('token').then((value) => {
                navigation.replace( value === null ? "Auth" : "BottomTabs")
            });
        }, 5000);
    }, []);

    return (
        <View style={styles.container}>
            <Text style={ styles.textoGeneral }>Gestión de citas</Text>
            <Text style={ styles.textoGeneral }>UdeA - 2022</Text>
            <Text>______________</Text>
            <Text style={ styles.textoGeneral }>Verificando usuario existente</Text>
        </View>
    );
}

export default SplashScreen;

