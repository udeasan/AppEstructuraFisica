import AsyncStorage from "@react-native-community/async-storage";
import Moment from 'moment';
import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView, Modal, Pressable } from "react-native";
import {styles} from '../../styles/DateStyle';


const ViewDateScreen = ({ navigation }) => {

    const [dateList, setDateList] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [needToReload, setNeedToReload] = useState(false);

    const [idToDelete, setIdToDelete] = useState("");

    Moment.locale('en');
    Moment.updateLocale('en', {
        weekdays : [
            "Domingo", "Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sabado"
        ],
        months : [
            "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio",
            "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
        ]
    });

    useEffect(() => {
        AsyncStorage.getItem('token').then((value) => {
            if (value === null) {
                navigation.replace('Auth');
            };
            let url = 'https://proyecto-estr-fisica.vercel.app/api/date';
            AsyncStorage.getItem('isAdmin').then((valueAdmin) => {
                console.log("Still going, with" + valueAdmin + " and " + value)
                if(valueAdmin === "true") {
                    url = 'https://proyecto-estr-fisica.vercel.app/api/business/date';
                    };
                let auth = "Bearer " + value;
                fetch(url, {
                    method: 'GET',
                    headers: {
                        'Authorization': auth,
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
            
        })
    }, []);

    useEffect(() => {
        AsyncStorage.getItem('token').then((value) => {
            if (value === null) {
                navigation.replace('Auth');
            };
            let auth = "Bearer " + value;
            fetch('https://proyecto-estr-fisica.vercel.app/api/date', {
                method: 'GET',
                headers: {
                    'Authorization': auth,
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
    }, [needToReload]);

    return (
        <ScrollView style={styles.container}>

            {/* Start of Modal */}
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalText}>¿Estás seguro de que deseas eliminar la cita?</Text>
                        <Pressable
                            style={[styles.button]}
                            onPress={() => {
                                setIdToDelete("");
                                setModalVisible(!modalVisible);
                            }}
                        >
                            <Text style={styles.textStyle}>No, cambie de opinión</Text>
                        </Pressable>
                        <Pressable
                            style={[styles.button, styles.buttonClose]}
                            onPress={() => {
                                AsyncStorage.getItem('token').then((value) => {
                                    if (value === null) {
                                        navigation.replace('Auth');
                                    };
                                    let auth = "Bearer " + value;
                                    fetch('https://proyecto-estr-fisica.vercel.app/api/date/' + idToDelete, {
                                        method: 'DELETE',
                                        headers: {
                                            'Authorization': auth,
                                        },
                                    })
                                        .then((response) => {
                                            console.log(response);
                                            setNeedToReload(!needToReload);
                                        }).catch((error) => {
                                            console.log(error)
                                            console.error("Ocurrio un error al intentar cancelar la cita")
                                        })
                                })
                                setModalVisible(!modalVisible);
                            }}
                        >
                            <Text style={styles.textStyle}>Si, Cancelar la Cita</Text>
                        </Pressable>
                    </View>
                </View>
            </Modal>
            {/* End of Modal */}

            {
                !isLoading &&
                <Text>Cargando tus Citas</Text>
            }
            <Text style={styles.textoTitle}>Estas son tus Citas</Text>
            {isLoading &&
                dateList.map((item, key) => (
                    <View style={styles.containerItem} key={key}>
                        <Pressable
                        style={styles.button}
                        onPress={() => {
                            setIdToDelete(item._id);
                            setModalVisible(!modalVisible);
                        }}>
                            <Text>Cancelar esta cita</Text>
                        </Pressable>
                        <Text style={styles.textoItem}>{Moment(item.fecha).format('dddd, DD/MMM/YYYY')}</Text>
                        <Text style={styles.textoItem}>{Moment(item.hora).format('LT')}</Text>
                        <Text style={styles.textoItem}>{item.businessDate}</Text>
                        <Text style={styles.textoItem}>{item.tipoCita}</Text>
                    </View>
                ))
            }
            <Text style={styles.containerItemEmpty}></Text>
        </ScrollView>
    );
}

export default ViewDateScreen;
