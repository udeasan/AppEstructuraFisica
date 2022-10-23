import AsyncStorage from '@react-native-community/async-storage';
import React, { useEffect, useState } from 'react';
import { View, Text, Button, Image, Alert } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { styles } from '../../styles/PageStyle';

const HomeScreen = ({ navigation }) => {
    const [userName, setUserName] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const [userAdmin, setUserAdmin] = useState(false);
    const Separator = () => <View style={styles.separator} />;

    useEffect(() => {
        AsyncStorage.getItem('token').then(value => {
            if (value === null) {
                navigation.replace('Auth');
            }
            let auth = 'Bearer ' + value;
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
                .then(response => response.json())
                .then(responseJson => {
                    setUserName(responseJson.name);
                    setUserEmail(responseJson.email);
                    setUserAdmin(responseJson.isAdmin);
                })
                .catch(error => {
                    console.log(error);
                    console.error('Ocurrio un error al consultar el usuario');
                });
        });
    }, []);

    return (
        <View style={styles.container}>
            <View style={styles.viewSecundary}>
                <View style={styles.viewCabezera}>
                    <View style={styles.viewImage}>
                        <Image
                            style={styles.image}
                            source={require('../../static/imgs/logo-Agenda.jpg')}
                        />
                    </View>

                    <Animatable.View animation="fadeInDownBig" style={styles.viewTitle}>
                        <Text style={styles.textTitle}>BIENVENIDO</Text>
                        <Separator />
                    </Animatable.View>
                </View>

                <View>
                    <View>
                        <Text style={styles.textSecundaryItem}>Usuario(a): </Text>
                        <Text style={styles.textPrincipalItem}>{userName}</Text>
                        <Text style={styles.texTertiaryItem}>Email: {userEmail}</Text>
                    </View>
                </View>
            </View>
            <View style={styles.viewButtom}>
                        <Button
                            title="Cerrar Sesión"
                            onPress={() => {
                                Alert.alert(
                                    'Log Out',
                                    'Estás seguro de que deseas cerrar sesión?',
                                    [
                                        {
                                            text: 'Cancel',
                                            onPress: () => {
                                                return null;
                                            },
                                        },
                                        {
                                            text: 'Confirm',
                                            onPress: () => {
                                                AsyncStorage.clear();
                                                navigation.replace('Auth');
                                            },
                                        },
                                    ],
                                    { cancelable: false },
                                );
                            }}
                        />
                </View>
        </View>
    );
};

export default HomeScreen;
