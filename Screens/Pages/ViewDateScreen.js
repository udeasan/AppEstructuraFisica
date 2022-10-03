import AsyncStorage from "@react-native-community/async-storage";
import React, { useEffect, useState } from "react";
import { View, Text, Button, Alert } from "react-native";

const ViewDateScreen = ({ navigation }) => {

    const [dates, setDates] = useState([])
    
    useEffect(() => {
        AsyncStorage.getItem('token').then((value) => {
            if(value === null){
                navigation.replace('Auth');
            };
            let auth = "Bearer " + value;
            fetch('https://proyecto-estr-fisica.vercel.app/api/date', {
            method: 'GET',
            headers: {
                'Authorization' : auth,
            },
        })
            .then((response) => response.json())
            .then((responseJson) => {
                responseJson.forEach(date => {
                    var addDate = dates.push(date.tipoCita);
                    setDates(addDate);
                });
                console.log(dates);
            }).catch((error) => {
                console.log(error)
                console.error("Ocurrio un error al consultar las citas del Usuario")
            })
        })
    }, [])

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>

            <Text style={{ color: 'black', }}>Viendo mis Citas</Text>
            {dates.map( keyValue => {
                return (
                    <Text style={{ color: 'black', }}></Text>
                );
            })}
            <Text style={{ color: 'black', }}></Text>
            <Button title="Regresar al Inicio" onPress={() => navigation.navigate('Home')} />
            <Button title="Agregar una nueva Cita" onPress={() => navigation.navigate('NewDate')} />
        </View>
    );
}

export default ViewDateScreen;