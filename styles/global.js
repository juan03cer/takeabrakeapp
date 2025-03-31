import { StyleSheet } from "react-native";
import { white } from "react-native-paper/lib/typescript/styles/themes/v2/colors";

const globalStyles = StyleSheet.create({
    contenedor:{
        flex:1
    },
    contenedorinterno: {
    backgroundColor: 'rgba(255, 255, 255, 0.5)', // Fondo semitransparente
    borderRadius:25,
    padding:25,
    width: '90%', // Ajusta el ancho del contenedor interno
    alignSelf: 'center', // Centrar el contenedor en la pantalla
      },
    contenido:{
        flexDirection:'column', //ajustar el contendio verticalmente
        justifyContent:'center',
        marginHorizontal:'2.5%',
        flex:1
    },
    titulo:{
        textAlign:'center',
        marginBottom:20,
        fontSize:36,
        fontWeight: 'bold',
        color:"#000000"
    },
    input:{
        backgroundColor: 'transparent',
    },
    boton:{
       backgroundColor:'#6C4A91',        
    },
    botonTexto:{
        fontWeight:'bold',
        color:'white'
    },
    texto:{
        color:'white'
    },
    contenedorbotones:{
        alignItems:"center",
        marginTop:10
    },
    botonsanvalentin:{
        backgroundColor: "red",
        paddingVertical: 15,
        paddingHorizontal: 20,
        borderRadius: 30,
        marginVertical: 10,
        
        alignItems: "center",  
    },
    botones:{
        backgroundColor: "#911DB7",
        paddingVertical: 15,
        paddingHorizontal: 40,
        borderRadius: 30,
        marginVertical: 10,
        width: "70%",
        alignItems: "center",    
    },
    imgtortuga:{
        width: 300,
        height: 150,
        resizeMode: 'contain',
        marginBottom: 20,
        borderRadius:25,
    },
    enlace:{
        color:'gray',
        marginTop:30,
        textAlign:'center',
        fondWeight:'bold',
        fontSize:15,
        textTransform:'uppercase'
    },
    menuSuperior:{
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
    },
    encerrarMenu:{
        backgroundColor: 'rgba(211, 164, 229, 0.8)', // Color lila con transparencia
        padding: 15,
        borderRadius: 20,
        maxWidth: '80%',
        marginLeft:25
    
    },

    menuIcono: {
        fontSize: 35,
        color: 'black',
    },
    
    

});

export default globalStyles