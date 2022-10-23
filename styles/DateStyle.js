import { StyleSheet } from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';


export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#009688',
        paddingLeft: 25,
        paddingTop: 25,
        paddingBottom: 25,
    },
    containerSecundary: {
        flexDirection: 'column',
        justifyContent: 'center',

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
    },
    textoItem: {
        color: 'black',
        fontSize: 25,
        fontFamily: 'Geneva'
    },
    textoItemNewDate: {
        padding: 10,
        color: '#FFF',
        fontSize: 30,
        fontFamily: 'Geneva'
    },
    textoItemNewDateSecundary: {
        color: '#FFF',
        fontSize: 20,
        fontFamily: 'Geneva'
    },
    containerItem: {
        backgroundColor: '#B2DFDB',
        padding: 20,
        width: '90%',
        margin: 5,
        color: 'black',
        fontSize: 25,
        fontFamily: 'Geneva',
    },
    containerItemEmpty: {
        backgroundColor: '#009688',
        padding: 20,
        width: "90%",
        margin: 5
    },
    textoInput: {
        color: Colors.dark,
        fontSize: 18,
        marginTop: 20,
        marginLeft: 20,
        marginRight: 20,
        fontWeight: '600',
        paddingLeft: 20,
        paddingRight: 12,
        borderWidth: 1,
        borderRadius: 7,
        borderColor: Colors.black,
        backgroundColor: '#fff',
    },
    viewParallelObject: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingBottom:50,
    },
    
    viewImage: {
        paddingHorizontal:20,
        
    },
    image: {
        width: 100,
        height: 100,
        borderRadius: 50,
        alignSelf: 'center',
    },
    viewSingleObject: {
        padding: 20,
        justifyContent: "center",
        alignItems: "center",
    },
    viewButtonDateHour: {
        padding: 10,
        flexDirection: 'row',
        marginHorizontal:40,
        justifyContent: 'space-between',
    },

    viewSimple: {
        alignItems: 'baseline',
        paddingLeft: 20,
        paddingRight:20,

    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    },
    modalView: {
        margin: 20,
        backgroundColor: "gray",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
        marginBottom: 20,
    },
    buttonOpen: {
        backgroundColor: "#F194FF",
    },
    buttonClose: {
        backgroundColor: "red",
        marginBottom: -10
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center"
    }
});
