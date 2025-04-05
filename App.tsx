import 'react-native-gesture-handler';
import React from 'react';
import { PaperProvider } from 'react-native-paper';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
const Stack = createStackNavigator();

import Login from './views/Login';
import CrearCuenta from './views/CrearCuenta';
import Chat from './views/Chat';

const App = () => {
  return (
    <PaperProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Login"
            component={Login}
            options={{
              title: "Iniciar sesión",
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="CrearCuenta"
            component={CrearCuenta}
            options={{
              title: "Crear Cuenta",
              headerStyle: {
                backgroundColor: '#D6E6F5',
              },
              headerTintColor: 'black',
              headerTitleStyle: {
                fontWeight: 'bold',
              },
            }}
          />
          <Stack.Screen
            name="Chat"
            component={Chat}
            options={{
              title:"Chat",
              headerStyle:{
                backgroundColor:'#D6E6F5'
              },
              headerTintColor:'black',
              headerBackTitleStyle:{
                fontWeight:'bold'
              }
            }}
          />
          
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
};

export default App;
