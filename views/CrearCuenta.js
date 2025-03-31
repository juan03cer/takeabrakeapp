import React,{useState} from 'react';
import { View, StyleSheet,Image } from 'react-native';
import { Button, Text, TextInput, Headline } from 'react-native-paper';
import {useNavigation} from '@react-navigation/native'
import globalStyles from '../styles/global';

// apollo 
import {gql,useMutation} from '@apollo/client'
const NUEVA_CUENTA = gql`
  mutation crearUsuario($input: UsuarioInput){
    crearUsuario(input:$input)
  }
`;


const CrearCuenta = () => {
    //State del formulario
    const [nombre,guardarNombre] = useState('');
    const [email,guardarEmail] = useState('');
    const [password,guardarPassword] = useState('');

    const [mensaje,guardarMensaje] = useState(null)

    //react navigation
    const navigation = useNavigation();

    //mutation de apollo
    const [crearUsuario] = useMutation(NUEVA_CUENTA);

    //cuando el usuario en crear cuenta
    const handleSubmit = async () =>{
      //validar
      if(nombre === '' || email === '' || password === ''){
        //mostrar un error
        guardarMensaje('Todos los campos son obligatorios')
        return;
      }
      //password de 6 caracteres
      if(password.length < 6){
        guardarMensaje('La contraseña debe ser de al menos 6 caracteres')
        return;
      }

      //guardar el usuario
      try{
        const {data} = await crearUsuario({
          variables:{
            input:{
              nombre,
              email,
              password
            }
          }
        })
        guardarMensaje(data.crearUsuario)
        navigation.navigate('Login');

      }catch(error){
        guardarMensaje(error.message.replace('GraphQL error: ', ''));
      }
    }

    //muestra un mensaje toast
    const mostrarAlerta = () => {
      alert(mensaje); // muestra alerta
      guardarMensaje(null); // Limpia el mensaje para que no se repita

    };
    
    
  return (
    <View style={[globalStyles.contenedor, {backgroundColor: 'gray'}]}>
        <View style={[globalStyles.contenido]}>
           <View style={[globalStyles.contenedorinterno]}>
           <Image source={require('../public/img/logo.jpg')} style={globalStyles.imgtortuga}/>


             <Headline style={[globalStyles.titulo]}>Crear Correo</Headline>

                <View style={styles.form}>
                    <TextInput style={[globalStyles.input]}
                    label="Nombre"
                    mode="outlined"
                    onChangeText={texto=>guardarNombre(texto)}
                    />
                    <TextInput style={[globalStyles.input]}
                    label="Correo"
                    mode="outlined"
                    onChangeText={texto=>guardarEmail(texto)}
                    />
                    <TextInput style={[globalStyles.input]}
                    label="Contraseña"
                    mode="outlined"
                    onChangeText={texto=>guardarPassword(texto)}
                    secureTextEntry={true}
                    />
                </View>

                <Button
                    mode="contained"
                    style={[globalStyles.boton]}
                    onPress={() => handleSubmit()}
                >
                 <Text style={[globalStyles.botonTexto]}> Crear Cuenta</Text>   
                </Button>
                {mensaje && mostrarAlerta()}
           </View>
        </View>
    </View>
  );
};

const styles = StyleSheet.create({
  form: {
    marginBottom: 20,
  }
});

export default CrearCuenta;
