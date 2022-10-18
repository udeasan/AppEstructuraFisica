import React, { useState } from "react";
import { Button, TextInput, View, Text } from "react-native";
import AsyncStorage from "@react-native-community/async-storage";
import { styles } from "../../styles/FormStyle";

const LoginScreen = ({ navigation }) => {
    const [userEmail, setUserEmail] = useState('');
    const [userPassword, setUserPassword] = useState('');
    const [errorText, setErrorText] = useState('');

    const Separator = () => <View style={styles.separator} />;

    const handleSubmitPress = () => {
        setErrorText('');
        if (!userEmail) {
            alert('Por favor ingrese su correo electronico');
            return;
        }
        if (!userPassword) {
            alert('Por favor ingrese su contraseña');
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
                navigation.replace("BottomTabs")
            }).catch((error) => {
                setErrorText('No fue posible iniciar sesión');
            })

    }

    return (
        <View style={styles.containerStyle}>
            <View style={styles.viewTitle}>
                <Text style={styles.textTitle}>LOGIN</Text>
                <Separator />
            </View>

            <View style={styles.formulario}>
                <TextInput
                    style={styles.textoInput}
                    onChangeText={userEmail => {setUserEmail(userEmail);}}
                    placeholder="Ingrese su email"
                    keyboardType="email-address"
                />
                <TextInput
                    style={styles.textoInput}
                    onChangeText={userPassword => {
                    setUserPassword(userPassword);
                    }}
                    placeholder="Enter your password"
                    keyboardType="default"
                    secureTextEntry={true}
                />
                {errorText != '' ? (
                    <Text style={styles.errorTextStyle}>{errorText}</Text>
                ) : null}
            </View>
            <View style={styles.buttonAlingRow}>
                <Button
                    borderRadius= '30'
                    title="Iniciar Sesión"
                    onPress={handleSubmitPress}
                />
                <Button
                    title="Registrarse"
                    onPress={() => navigation.navigate('Register')}
                />
            </View>
        </View>
    );
};

export default LoginScreen;

