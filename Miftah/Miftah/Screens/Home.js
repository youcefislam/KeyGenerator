import 'react-native-gesture-handler';
import React, { useState } from 'react';
import CheckBox from '@react-native-community/checkbox';
import {
  StyleSheet,
  ActivityIndicator,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  View,
  StatusBar,

} from 'react-native';


const Home = ({ navigation }) => {

  const [name, setName] = useState("");
  const [charts, setCharts] = useState("");
  const [groupes, setGroupe] = useState("");
  const [number, setNumber] = useState("");
  const [stats, setStats] = useState(false);
  const [upCase, setupCase] = useState(false)

  // Generating key and Navigate into the keys List
  const GoToKeyList = () => {
    const data = {
      name: name,
      charts: charts,
      groupes: groupes,
      number: number,
      upper: upCase
    };

    // requesting key from the server
    fetch('http://192.168.43.82:3000/key/create', {
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
        if (responseJson.created == false) {
          alert(' all fields must be filled !')
        }
        else {
          navigation.navigate('Key List', responseJson); //navigate to keys list screen with the response(keys list)
        }
        setStats(false);
      })
      .catch(error => {
        console.error(error);
        setStats(false);
      });
  }

  return (
    <KeyboardAvoidingView style={styles.container} contentContainerStyle={styles.afterFocus} behavior="position" >
      <StatusBar backgroundColor="#FA6148" barStyle="light-content" />
      <View style={styles.upperCasestyle}>
        <Text>UpperCase</Text>
        <CheckBox
          value={upCase}
          onChange={() => { upCase ? setupCase(false) : setupCase(true) }} />
      </View>
      <TextInput
        style={styles.inpuField}    
        placeholder="Name"
        onChangeText={(value) => setName(value)}      //take input from the user and put it into name variable
        autoCapitalize='none'
        placeholderTextColor='#FA6148'   />
      <TextInput
        style={styles.inpuField}
        placeholder="Groupe (<10)"
        onChangeText={(value) => setGroupe(value)}
        keyboardType='numeric'
        maxLength={1}
        placeholderTextColor='#FA6148' />
      <TextInput
        style={styles.inpuField}
        placeholder="Charts (<10 )"
        onChangeText={(value) => setCharts(value)}
        keyboardType='numeric'
        maxLength={1}
        placeholderTextColor='#FA6148' />
      <TextInput
        style={styles.inpuField}
        placeholder="Keys to Generate (<100)"
        onChangeText={(value) => setNumber(value)}
        keyboardType='numeric'
        maxLength={2}
        placeholderTextColor='#FA6148' />
      <TouchableOpacity style={styles.generateButton} onPress={() => { GoToKeyList(); setStats(true)}} >
        <Text style={styles.generateButtonText}>Generate</Text>  
      </TouchableOpacity>
      {
        stats ? <ActivityIndicator size="large" color="#FA6148" /> : <View></View>
      }
    </KeyboardAvoidingView >
  );
};



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: "space-around",
  },
  afterFocus: {
    height: '80%',
    top: 1,
  },

  generateButton: {
    backgroundColor: 'white',
    marginTop: 50,
    marginBottom: 10,
    borderStyle: 'solid',
    borderWidth: 2,
    borderColor: '#FA6148',
    borderRadius: 20,
    alignItems: 'center',
  },
  generateButtonText: {
    fontSize: 20,
    color: '#FA6148',
  },

  inpuField: {
    marginBottom: 20,
    fontSize: 15,
    backgroundColor: "#FDFCFB",
    borderBottomWidth: 1,
    borderColor: '#E7200D',
    width: 200,
    height: 40,
  },
  upperCasestyle:{
    flexDirection:'row', 
    justifyContent:'center',
    alignItems:'center',
    color:"#FA6148"
  }
  
});

export default Home;