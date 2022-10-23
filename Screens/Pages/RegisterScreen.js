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

    const handleSubmitPress = () => {
        setErrorText('');
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
                navigation.replace('BottomTabs');
            })
            .catch(error => {
                setErrorText('No fue posible Registrarse');
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
