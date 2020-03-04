import 'react-native-gesture-handler';
import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,

} from 'react-native';


const Home = ({ navigation }) => {

  const [name, setName] = useState("");

  // Generating key and Navigate into the keys List
  const GoToKeyList = () => {
    const data = {
      name: name,
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
      })
      .catch(error => {
        console.error(error);

      });
  }

  return (
    <KeyboardAvoidingView style={styles.container} contentContainerStyle={styles.afterFocus} behavior="position" >
      <TextInput
        style={styles.inpuField}    
        placeholder="Name"
        onChangeText={(value) => setName(value)}      //take input from the user and put it into name variable
        autoCapitalize='none'
      />
      <TouchableOpacity style={styles.generateButton} onPress={() => { GoToKeyList(); setStats(true)}} >
        <Text style={styles.generateButtonText}>Generate</Text>  
      </TouchableOpacity>
    </KeyboardAvoidingView >
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    alignItems: 'center',
  },
  generateButtonText: {
    fontSize: 20,
  },
});

export default Home;