import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({

    container: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right:0,
        backgroundColor: '#009688',

    },

    viewSecundary: {
        flexDirection: 'column',
        justifyContent: 'space-between',
        

    },
    viewCabezera: {
        paddingTop: 50,
        paddingBottom: 50,
    },

    viewTitle: {
        paddingLeft: 20,
        paddingRight: 20,
    },

    textTitle: {
        color: 'white',
        fontSize: 40,
        textAlign: 'center',
        fontWeight: 'bold',
        fontFamily: 'Geneva',

    },
    textPrincipalItem: {
        padding: 10,
        color: '#FFF',
        fontSize: 30,
        fontFamily: 'Geneva',
        fontWeight: 'bold',
        textAlign:'center',
    },
    textSecundaryItem: {
        paddingHorizontal:10,
        color: '#FFF',
        fontSize: 25,
        fontFamily: 'Geneva'
    },
    texTertiaryItem: {
        padding:10,
        color: '#FFF',
        fontSize: 15,
        fontFamily: 'Geneva'
    },
    separator: {
        borderBottomColor: '#FFF',
        borderBottomWidth: StyleSheet.hairlineWidth,
    },


    viewImage: {
        alignSelf: 'center',
        top: 0, 
        marginVertical: 10,
        
    },

    image: {
        padding: 10,
        width: 200,
        height: 150,
        borderRadius: 50,
    },

    viewButtom:
    {
        position: 'absolute',
        alignSelf: 'center',
        bottom: 40,    
        },

});
