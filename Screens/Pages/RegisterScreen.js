import React, { useState } from 'react';
import {
    Button,
    Switch,
    TextInput,
    View,
    Text,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { styles } from '../../styles/FormStyle';

const RegisterScreen = ({ navigation }) => {
    const [userEmail, setUserEmail] = useState('');
    const [userName, setUserName] = useState('');
    const [userPassword, setUserPassword] = useState('');
    const [userAdmin, setUserAdmin] = useState(false);
    const [userBusiness, setUserBusiness] = useState('');
    const [errorText, setErrorText] = useState('');

    const Separator = () => <View style={styles.separator} />;

    const checkUser = () => {
        AsyncStorage.getItem('token').then(value => {
            if (value === null) {
                navigation.replace('Auth');
            }
            let auth = 'Bearer ' + value;
            fetch('https://proyecto-estr-fisica.vercel.app/api/me', {
                method: 'GET',
                headers: {
                    'Authorization': auth,
                },
            })
                .then((response) => response.json())
                .then((responseJson) => {
                    AsyncStorage.setItem('isAdmin', responseJson.isAdmin.toString());
                }).catch((error) => {
                    console.log(error)
                    console.error("Ocurrio un error al validar el tipo de usuario")
                })
        });
    }

    const handleSubmitPress = () => {
        setErrorText('');
        if (!userEmail) {
            alert('Por favor ingrese su correo electrónico');
            return;
        }
        if (!userName) {
            alert('Por favor ingrese su nombre');
            return;
        }
        if (!userPassword) {
            alert('Por favor ingrese una contraseña');
            return;
        }
        if (userAdmin && !userBusiness) {
            alert('Por favor ingrese el nombre de su negocio');
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
            businessName: userBusiness,
        };

        fetch('https://proyecto-estr-fisica.vercel.app/api/register', {
            method: 'POST',
            body: JSON.stringify(dataToSend),
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
            },
        })
            .then(response => response.json())
            .then(responseJson => {
                AsyncStorage.setItem('token', responseJson.token);
                checkUser()
                navigation.replace('BottomTabs');
            })
            .catch(error => {
                setErrorText('No fue posible registrarse en este momento');
            });
    };

    return (
        <View style={styles.containerStyle}>

            <View style={styles.viewTitle}>
                <Text style={styles.textTitle}>REGISTRO</Text>
                <Separator />
            </View>

            <View style={styles.formulario}>
                <TextInput
                    style={styles.textoInput}
                    onChangeText={userEmail => { setUserEmail(userEmail); }}
                    placeholder="Correo Electrónico"
                    keyboardType="email-address"
                    placeholderTextColor={'gray'}
                />
                <TextInput
                    style={styles.textoInput}
                    onChangeText={userName => { setUserName(userName); }}
                    placeholder="Tu nombre"
                    keyboardType="default"
                    placeholderTextColor={'gray'}
                />
                <TextInput
                    style={styles.textoInput}
                    onChangeText={userPassword => { setUserPassword(userPassword); }}
                    placeholder="Contraseña"
                    keyboardType="default"
                    placeholderTextColor={'gray'}
                    secureTextEntry={true}
                />

                <View style={styles.switch}>
                    <Text
                        style={styles.switchText}
                    >¿Es un negocio?</Text>
                    <Switch
                        value={userAdmin}
                        onValueChange={userAdmin => setUserAdmin(userAdmin)}></Switch>
                </View>

                {userAdmin ? (
                    <TextInput
                        style={styles.textoInput}
                        onChangeText={userBusiness => setUserBusiness(userBusiness)}
                        placeholder="Nombre del negocio"
                        keyboardType="default"
                        placeholderTextColor={'gray'}
                    />
                ) : null}

            </View>

            <View style={styles.switchContainer}>
                {errorText != '' ? (
                    <Text style={styles.errorTextStyle}>{errorText}</Text>
                ) : null}
            </View>

            <View style={styles.buttonAlingRow}>
                <Button title="Registrarse" onPress={handleSubmitPress} />

                <Button
                    title="Iniciar Sesión"
                    onPress={() => navigation.navigate('Login')}
                />
            </View>
        </View>
    );
};

export default RegisterScreen;
