import AsyncStorage from "@react-native-community/async-storage";
import React, { useEffect, useState } from "react";
import {View, Text, Button, TextInput, ScrollView, Image} from 'react-native';
import DatePicker from 'react-native-date-picker';
import SelectDropdown from 'react-native-select-dropdown';
import {styles} from '../../styles/DateStyle';

const NewDateScreen = ({ navigation }) => {

    const [date, setDate] = useState(new Date());
    const [hour, setHour] = useState(new Date());
    const [type, setType] = useState('');
    const [businessName, setBusinessName] = useState('');
    const [errorText, setErrorText] = useState('');

    const [bussinessList, setBusinessList] = useState([]);

    const [openDate, setOpenDate] = useState(false);
    const [openHour, setOpenHour] = useState(false);

    const [hasDate, setHasDate] = useState(false);
    const [hasHour, setHasHour] = useState(false);

    useEffect(() => {

        fetch('https://proyecto-estr-fisica.vercel.app/api/business', {
            method: 'GET'
        })
            .then((response) => response.json())
            .then((responseJson) => {
                setBusinessList(responseJson);
            }).catch((error) => {
                console.log(error)
                console.error("Ocurrio un error al consultar los negocios")
            })

    }, []);

    const handleSubmitPress = () => {
        setErrorText('');

        if (!hasDate) {
            alert('Por favor ingrese la fecha');
            return;
        }
        if (!hasHour) {
            alert('Por favor ingrese la hora');
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
                setHasDate(false);
                setHasHour(false);
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
        <>
            <ScrollView style={styles.container}>
                <View style={styles.containerSecundary}>
                    <View style={styles.viewParallelObject}>
                        <View style={styles.viewSimple}>
                            <Text style={styles.textoTitle}>Agregar una nueva Cita</Text>
                        </View>
                        <View style={styles.viewImage}>
                            <Image
                                style={styles.image}
                                source={require('../../static/imgs/reserva-citas-calendario.jpg')}
                            />
                        </View>
                    </View>
                    <View>
                        <TextInput
                            style={styles.textoInput}
                            onChangeText={(typeInput) => {setType(typeInput);}}
                            placeholder="Tipo de la Cita"
                            keyboardType="default"
                            />   
                    </View>
                    <View style={styles.viewSingleObject}>
                        <SelectDropdown
                            data={bussinessList.map(item => item.businessName)}
                            onSelect={(selectedItem, index) => {
                                console.log(selectedItem);
                            }}
                            defaultButtonText={'Seleccione el lugar'}
                            buttonTextAfterSelection={(selectedItem, index) => {
                                setBusinessName(selectedItem);
                                return selectedItem
                            }}
                            rowTextForSelection={(item, index) => {
                                return item
                            }}
                        />

                        {errorText != '' ? (
                            <Text style={styles.errorTextStyle}>{errorText}</Text>
                        ) : null}
                    </View>
                    <View style={styles.viewButtonDateHour}>
                        <Button
                            title="Elegir Fecha"
                            onPress={() => setOpenDate(true)} />

                        <Button
                            title="Elegir Hora"
                            onPress={() => setOpenHour(true)} />
                    </View>

                    <View style={styles.viewSingleObject}>
                        
                        <Text style={styles.textoItemNewDate}>
                            {businessName}</Text>

                        { hasDate &&
                            <Text style={styles.textoItemNewDateSecundary}>
                                {date.toDateString()}</Text>
                        }

                        { hasHour &&
                            <Text style={styles.textoItemNewDateSecundary}>
                                {hour.toDateString()}</Text>
                        }

                    </View>
                    <View style={styles.viewSingleObject}>
                        <Button title="Añadir cita" onPress={handleSubmitPress} />
                    </View>
                </View> 
            </ScrollView>
            <DatePicker
                modal
                locale={'es'}
                open={openDate}
                date={date}
                mode="date"
                minimumDate={new Date()}
                onConfirm={(date) => {
                setOpenDate(false)
                setHasDate(true)
                setDate(date)
                }}
                onCancel={() => {
                setOpenDate(false)
                }}
            />
            <DatePicker
                modal
                locale={'es'}
                open={openHour}
                date={hour}
                mode="time"
                onConfirm={(hour) => {
                setOpenHour(false)
                setHasHour(true)
                setHour(hour)
                }}
                onCancel={() => {
                setOpenHour(false)
                }}
            />
        </>
    );
}

export default NewDateScreen;

