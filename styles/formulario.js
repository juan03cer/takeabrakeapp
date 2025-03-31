import { StyleSheet } from "react-native";
import { white } from "react-native-paper/lib/typescript/styles/themes/v2/colors";

const formularioStyles = StyleSheet.create({
contenedor:{
    padding:20
},
contenedorinterno:{
    backgroundColor: "rgba(138, 28, 202, 0.8)", // Fondo blanco semitransparente
    borderRadius: 15,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
    marginBottom: 20
    
},
input:{
    backgroundColor: "#FFF",
    marginBottom: 15,

},
titulo:{
    fontSize: 22,
    fontWeight: "bold",
    color: "#6A0572", // Morado intenso
    textAlign: "center",
    marginBottom: 15,

}
})
export default formularioStyles