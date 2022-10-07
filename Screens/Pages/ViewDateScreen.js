import AsyncStorage from "@react-native-community/async-storage";
import React, { useEffect, useState } from "react";
import { View, Text, Button, Alert, FlatList, StyleSheet, ScrollView } from "react-native";

const ViewDateScreen = ({ navigation }) => {

    const [dateList, setDateList] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    
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
                setDateList(responseJson);
                setIsLoading(true);
            }).catch((error) => {
                console.log(error)
                console.error("Ocurrio un error al consultar las citas del Usuario")
            })
        })
    }, []);

    return (
        <ScrollView style={ styles.container }>
            {
                !isLoading &&
                <Text>Cargando tus Citas</Text>
            }
            <Text style={styles.textoTitle}>Estas son tus Citas</Text>
            {isLoading &&
                dateList.map((item, key)=>(
                    <Text key={key} style={styles.containerItem}>{item.fecha}{item.hora}{item.businessDate}{item.tipoCita}</Text>
                ))
            }
            <Text style={styles.containerItemEmpty}></Text>
        </ScrollView>
    );
}

export default ViewDateScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#009688',
        paddingLeft: 25,
        paddingTop: 50,
        paddingBottom: 50
    },
    textoGeneral: {
        color: 'white',
        fontSize: 25,
        fontFamily: 'Geneva'
    },
    textoTitle: {
        color: 'white',
        fontSize: 40,
        textAlign: 'center',
        fontWeight: 'bold',
        fontFamily: 'Geneva',
        marginBottom: 25,
        marginLeft: -20
    },
    containerItem: {
        backgroundColor: '#B2DFDB',
        padding: 20,
        width: "90%",
        margin: 5,
        color: 'black',
        fontSize: 25,
        fontFamily: 'Geneva'
    },
    containerItemEmpty: {
        backgroundColor: '#009688',
        padding: 20,
        width: "90%",
        margin: 5
    }
});