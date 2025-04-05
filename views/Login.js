import React, { useState, useCallback, useEffect } from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { Button, Text, TextInput, Headline } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import globalStyles from '../styles/global';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { gql, useMutation } from '@apollo/client';
import { useColorScheme } from 'react-native';

const AUTENTICAR_USUARIO = gql`
  mutation autenticarUsuario($input: AutenticarInput) {
    autenticarUsuario(input: $input) {
      token
    }
  }
`;



const Login = () => {
  const colorScheme = useColorScheme(); // detecta si es 'light' o 'dark'
  const [textColor, setTextColor] = useState('#274472'); // color por defecto para modo claro

  useEffect(() => {
    // Cambiar el color según el esquema del dispositivo
    if (colorScheme === 'dark') {
      setTextColor('#000000'); // texto para modo oscuro
    } else {
      setTextColor('#274472'); // texto para modo claro
    }
  }, [colorScheme]);


  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mensaje, setMensaje] = useState(null);
  const navigation = useNavigation();
  const [autenticarUsuario] = useMutation(AUTENTICAR_USUARIO);

  const handleEmailChange = useCallback((texto) => {
    setEmail(texto.toLowerCase());
  }, []);

  const handlePasswordChange = useCallback((texto) => {
    setPassword(texto);
  }, []);

  const handleSubmit = async () => {
    if (email === '' || password === '') {
      setMensaje('Todos los campos son obligatorios');
      return;
    }
    try {
      const { data } = await autenticarUsuario({
        variables: {
          input: { email, password },
        },
      });
      const { token } = data.autenticarUsuario;
      await AsyncStorage.setItem('token', token);
      navigation.navigate('Chat');
    } catch (error) {
      setMensaje(error.message.replace('GraphQL error: ', ''));
    }
  };

  const mostrarAlerta = () => {
    alert(mensaje);
    setMensaje(null);
  };


  return (
    <View style={[globalStyles.contenedor, { backgroundColor: '#D6E6F5' }]}>
      <View style={[globalStyles.contenido]}>
        <View style={[globalStyles.contenedorinterno]}>
        <Image source={require('../public/img/logo.jpg')} style={globalStyles.imgtortuga}/>

          <Headline style={[globalStyles.titulo]}>Iniciar Sesión</Headline>

          <View style={styles.form}>
            <View style={[globalStyles.input]}>
              <TextInput
                style={[globalStyles.input, { color: textColor }]} // Aplica el color dinámicamente
                label="Correo"
                keyboardType="email-address"
                autoCapitalize="none"
                autoComplete="email"
                onChangeText={handleEmailChange}
                defaultValue={email} 
              />
              <TextInput
                style={[globalStyles.input, { color: textColor }]} // Aplica el color dinámicamente
                label="Contraseña"
                secureTextEntry
                autoCapitalize="none"
                autoComplete="password"
                onChangeText={handlePasswordChange}
                defaultValue={password} 
                
              />
            </View>
          </View>

          <Button mode="contained" style={[globalStyles.boton]} onPress={handleSubmit}>
            <Text style={[globalStyles.botonTexto]}> Iniciar Sesión</Text>
          </Button>
          {mensaje && mostrarAlerta()}
          <Text onPress={() => navigation.navigate('CrearCuenta')} style={[globalStyles.enlace]}>
            Crear Cuenta
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  form: {
    marginBottom: 20,
  },
});

export default Login;
