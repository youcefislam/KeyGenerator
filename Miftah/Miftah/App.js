import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './Screens/Home';
import KeyList from './Screens/KeyList';

const Stack = createStackNavigator();

const App = () => {
  return (
     <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Licence Key Generator" component={Home} />
        <Stack.Screen name="Key List" component={KeyList} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}
 

export default App;
