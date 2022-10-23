import { StyleSheet } from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';


export const styles = StyleSheet.create({
    viewTitle: {
        justifyContent: 'center',
        alignContent: 'center',
        paddingLeft: 20,
        paddingRight: 20,
    },
    
    textTitle: {
        color: 'white',
        fontSize: 40,
        textAlign: 'center',
        fontWeight: 'bold',
        fontFamily: 'Geneva',
        marginBottom: 25,
        marginLeft: -20
    },

    containerStyle: {
        flex: 1,
        marginHorizontal: 2,
        marginVertical: 2,
        position: 'relative',
        justifyContent: 'center',
        alignContent: 'center',
        backgroundColor: '#009688',
    },

    formulario: {
        color: Colors.black,
        marginHorizontal: 20,
        marginVertical: 30,
        justifyContent: 'center',
        alignContent: 'center',
        fontSize: 18,
        marginTop: 20,
        fontWeight: '600',
        padding: 4,
        paddingRight: 12,
        textAlign: 'center',
    },
    errorTextStyle: {
        color: 'red',
        textAlign: 'center',
        fontSize: 14,
    },

    separator: {
        marginVertical: 10,
        borderBottomColor: '#fff',
        borderBottomWidth: StyleSheet.hairlineWidth,
    },

    textoInput: {
        color: Colors.dark,
        fontSize: 18,
        marginTop: 20,
        marginLeft: 20,
        marginRight: 20,
        fontWeight: '600',
        paddingLeft: 20,
        borderWidth: 1,
        borderRadius: 7,
        borderColor: Colors.black,
        backgroundColor: '#fff',
        paddingRight: 12,
    },

    buttonAlingRow: {
        flexDirection: 'row',
        marginHorizontal:40,
        justifyContent: 'space-between',
    },

    switchContainer: {
        justifyContent: 'center',
        alignContent: 'center',
        bottom: 10,

    },

    switch: {
        alignSelf: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        marginTop: 20
    },

    switchText: {
        fontSize: 20,
        color:'#fff',
        marginBottom: 5,
        marginTop: 5,

    },
});
