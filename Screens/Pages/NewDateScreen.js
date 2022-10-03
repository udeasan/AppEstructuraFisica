import AsyncStorage from "@react-native-community/async-storage";
import React, { useEffect, useState } from "react";
import { View, Text, Button, Alert, TextInput } from "react-native";

const NewDateScreen = ({ navigation }) => {

    const [date, setDate] = useState('');
    const [hour, setHour] = useState('');
    const [type, setType] = useState('');
    const [businessName, setBusinessName] = useState('');
    const [errorText, setErrorText] = useState('');

    const handleSubmitPress = () => {
        setErrorText('');

        if (!date) {
            alert('Por favor ingrese la fecha');
            return;
        }
        if (!hour) {
            alert('Por favor ingrese la fecha');
            return;
        }
        if (!type) {
            alert('Por favor ingrese el tipo');
            return;
        }
        if (!businessName) {
            alert('Por favor ingrese el negocio');
            return;
        }

        let dataToSend = { fecha: date, hora: hour, tipoCita: type, businessDate: businessName };

        console.log(dataToSend)

        AsyncStorage.getItem('token').then((value) => {
            if(value === null){
                navigation.replace('Auth');
            };
            let auth = "Bearer " + value;
            fetch('https://proyecto-estr-fisica.vercel.app/api/date', {
            method: 'POST',
            body: JSON.stringify(dataToSend),
            headers: {
                'Authorization' : auth,
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
        })
            .then((response) => response.json())
            .then((responseJson) => {
                console.log(responseJson);
                setDate("");
                setHour("");
                setType("");
                setBusinessName("");
                navigation.navigate("ViewDate");
            }).catch((error) => {
                console.log(error)
                console.error("Ocurrio un error al consultar las citas del Usuario")
            })
        })
    }

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text style={{ color: 'black', }}>Agregar una nueva Cita</Text>
            <TextInput
                style={{ color: 'black', }}
                onChangeText={(dateInput) => {
                    setDate(dateInput);
                }}
                placeholder="Fecha de la Cita"
                keyboardType="default"
            />
            <TextInput
                style={{ color: 'white', }}
                onChangeText={(hourInput) => {
                    setHour(hourInput);
                }}
                placeholder="Hora de la Cita"
                keyboardType="default"
            />
            <TextInput
                style={{ color: 'black', }}
                onChangeText={(typeInput) => {
                    setType(typeInput);
                }}
                placeholder="Tipo de la Cita"
                keyboardType="default"
            />
            <TextInput
                style={{ color: 'black', }}
                onChangeText={(BusinessName) => {
                    setBusinessName(BusinessName);
                }}
                placeholder="Nombre del Negocio"
                keyboardType="default"
            />
            {errorText != '' ? (
                <Text style={styles.errorTextStyle}>{errorText}</Text>
            ) : null}
            <Button title="Añadir cita" onPress={handleSubmitPress} />
            <Button title="Ver mis Citas" onPress={() => navigation.navigate('ViewDate')} />
            <Button title="Regresar al Inicio" onPress={() => navigation.navigate('Home')} />
        </View>
    );
}

export default NewDateScreen;
