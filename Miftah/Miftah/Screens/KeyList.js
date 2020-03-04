import 'react-native-gesture-handler';
import React, { useState } from 'react'
import {
    Text,
    View,
    StyleSheet,
    TouchableOpacity,
    SafeAreaView,
    FlatList,
    Clipboard,
    ToastAndroid
} from 'react-native'


const KeysList = ({ route }) => {

    const [Keys, setKeys] = useState(route.params);   // List of The keys

    // Render Items Function (View for each Key)
    const ListItem = ({ item }) => {
        return (
            <View style={styles.item}>
                <TouchableOpacity style={styles.copyButton} onPress={() => CopyItem(item.serial)}>
                    <Text style={styles.buttonText}>Copy</Text>
                </TouchableOpacity>
                <Text style={styles.serialText}>{item.serial}</Text>
                <TouchableOpacity style={styles.deleteButton} onPress={() => DeleteItem(item.id_key)}>
                    <Text style={styles.buttonText}>Delete</Text>
                </TouchableOpacity>
            </View>
        );

    };

    // Copy to clipboard Function
    const CopyItem = (serial) => {
        Clipboard.setString(serial);
        ToastAndroid.show('Key Copied !', ToastAndroid.SHORT);
    }
    //end of Clipboard Function

    //Delete Keys Function (by ID)
    const DeleteItem = (id_key) => {

        const data = { id_key: id_key };
        
        fetch('http://192.168.43.82:3000/key/delete', {   //make a post request for the key generator api
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),    
        })
            .then(response => {
                if (response.status === 200) {
                    return response.json();
                } else {
                    throw new Error('Something went wrong on our api server'); 
                }                
            })
            .then((responseJson) => {
                if (responseJson.deleted == true) {      // verify if the request has done to delete it from our flat list
                    setKeys((prevKeys) => {
                        return prevKeys.filter(item => item.id_key != id_key)
                    });
                    ToastAndroid.show('Key Deleted !', ToastAndroid.SHORT);
                }else{
                    alert("Something went wrong on our api server !"); 
                }
            })
            .catch(error => {
                console.error(error);
            });

    }
    // End of Delete Keys Function


    return (
        <SafeAreaView style={styles.container}>
            <FlatList
                data={Keys}                                             // flat List Interface
                renderItem={({ item }) => ListItem({ item })}   // render items using ListItem function GoTo(ListItem)
                keyExtractor={(item) => item.id_key}           
            /> 
        </SafeAreaView>
    );

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FA6148',
    },


    item: {
        flexDirection: 'row',
        backgroundColor: '#FDFCFB',
        padding: 10,
        marginVertical: 4,
        marginHorizontal: 10,
        borderRadius: 10,
    },


    deleteButton: {
        width: '17%',
        marginLeft: 2,
        alignItems: 'center',
        justifyContent: 'center',
        borderStyle: 'solid',
        borderColor: '#FA6148',
        borderWidth: 1,
        borderRadius: 10
    },
    buttonText: {
        color: '#c71f16',
    },
    sortByButton: {
        alignItems: "center",
        height: 23, width: '97%',
        backgroundColor: "#FA6148",
        borderWidth: 1,
        borderColor: 'white',
        borderBottomStartRadius: 5,
        borderBottomEndRadius: 5
    },
    sortBytext: {
        color: 'white',
        fontSize: 15
    },
    copyButton: {
        justifyContent: 'center',
    },
    serialText: {
        flex: 4,
        fontSize: 15,
        borderLeftWidth: 1,
        paddingLeft: 5,
        borderLeftColor: '#c71f16',
        color: '#242424',
        marginLeft: 5
    },
});

export default KeysList;