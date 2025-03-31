import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  Image,
  ActivityIndicator,
  Alert
} from 'react-native';

// Configuración según la documentación oficial
const API_URL = 'https://api.deepseek.com/v1/chat/completions';
const API_KEY = 'sk-fa0535d709fe43c7bac0e2116a4f04c9'; // Tu API key completa

const Chat = () => {
  const [messages, setMessages] = useState([
    { 
      id: '1', 
      text: '¡Hola! Soy take a brake Chat. ¿En qué puedo ayudarte hoy?', 
      sender: 'bot',
      timestamp: new Date().getTime() 
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isSending, setIsSending] = useState(false);
  const flatListRef = useRef(null);

  const sendMessage = async () => {
    if (inputText.trim() && !isSending) {
      setIsSending(true);
      
      // Mensaje del usuario
      const userMessage = {
        id: Math.random().toString(),
        text: inputText,
        sender: 'user',
        timestamp: new Date().getTime()
      };
      
      setMessages(prev => [...prev, userMessage]);
      setInputText('');

      try {
        // Configuración EXACTA según documentación
        const response = await fetch(API_URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${API_KEY}`,
            'Accept': 'application/json'
          },
          body: JSON.stringify({
            model: "deepseek-chat",
            messages: [
              {
                role: "system",
                content: "Eres un asistente útil que responde en español y solo puedes responder a peticiones de recomendaciones ,como buscar un libro ,musica,canciones,peliculas etc solo a eso ,mas cosas no puedes ,en dado caso puedes responder que no puedes ayudar con lo que pide por que estas destinada para recomendaciones y puedes basarte en como se siente el usuario que el te cuente y con base a eso recomendarle lo que te pida de recomendacion, dale un toque personalizable como si fueras un amigo en las palabras y si te llegan a preguntar como te llamas ,tienes que decir que eres take a brake y describes que puedes hacer."
              },
              {
                role: "user",
                content: inputText
              }
            ],
            temperature: 0.7,
            max_tokens: 2000,
            stream: false
          })
        });

        // Depuración adicional
        console.log('Status:', response.status);
        console.log('Headers:', JSON.stringify(response.headers));

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          console.log('Error response:', errorData);
          throw new Error(
            errorData.error?.message || 
            `Error HTTP: ${response.status} - ${response.statusText}`
          );
        }

        const data = await response.json();
        console.log('Respuesta completa:', data);
        
        if (!data.choices?.[0]?.message?.content) {
          throw new Error('La estructura de respuesta no es la esperada');
        }

        // Mensaje del bot
        const botMessage = {
          id: Math.random().toString(),
          text: data.choices[0].message.content,
          sender: 'bot',
          timestamp: new Date().getTime()
        };

        setMessages(prev => [...prev, botMessage]);
      } catch (error) {
        console.error('Error completo:', error);
        
        let errorMessage = 'Ocurrió un error al procesar tu mensaje';
        if (error.message.includes('402')) {
          errorMessage = 'Error de pago/autenticación. Verifica tu API key y saldo.';
        } else if (error.message.includes('401')) {
          errorMessage = 'API key no válida o expirada.';
        } else if (error.message.includes('404')) {
          errorMessage = 'Endpoint no encontrado. Verifica la URL.';
        }

        Alert.alert('Error', errorMessage);
        
        const errorBotMessage = {
          id: Math.random().toString(),
          text: errorMessage,
          sender: 'bot',
          timestamp: new Date().getTime()
        };
        
        setMessages(prev => [...prev, errorBotMessage]);
      } finally {
        setIsSending(false);
      }
    }
  };

  // Resto del componente (igual que antes)
  useEffect(() => {
    if (messages.length > 0 && flatListRef.current) {
      setTimeout(() => {
        flatListRef.current.scrollToEnd({ animated: true });
      }, 100);
    }
  }, [messages]);

  const formatTime = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        style={styles.keyboardAvoidingView}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 60 : 0}
      >
        {/* Header */}
        <View style={styles.header}>
          <Image 
            source={{ uri: 'https://placehold.co/40x40/007bff/white?text=DS' }} 
            style={styles.avatar}
          />
          <Text style={styles.headerTitle}>Take a Brake</Text>
          <View style={styles.headerStatus}>
            <View style={styles.statusIndicator} />
            <Text style={styles.statusText}>En línea</Text>
          </View>
        </View>

        {/* Mensajes del chat */}
        <FlatList
          ref={flatListRef}
          data={messages}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={[
              styles.messageContainer,
              item.sender === 'user' ? styles.userMessage : styles.botMessage
            ]}>
              <Text style={[
                styles.messageText,
                item.sender === 'user' ? styles.userMessageText : styles.botMessageText
              ]}>
                {item.text}
              </Text>
              <Text style={[
                styles.messageTime,
                item.sender === 'user' ? styles.userMessageTime : styles.botMessageTime
              ]}>
                {formatTime(item.timestamp)}
              </Text>
            </View>
          )}
          contentContainerStyle={styles.chatContainer}
          showsVerticalScrollIndicator={false}
          keyboardDismissMode="on-drag"
        />

        {/* Área de entrada */}
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            value={inputText}
            onChangeText={setInputText}
            placeholder="Escribe tu mensaje..."
            placeholderTextColor="#999"
            multiline
            maxLength={2000}
            onSubmitEditing={sendMessage}
            returnKeyType="send"
            blurOnSubmit={false}
            editable={!isSending}
          />
          <TouchableOpacity 
            onPress={sendMessage} 
            style={[
              styles.sendButton,
              (isSending || !inputText.trim()) && styles.disabledButton
            ]}
            disabled={isSending || !inputText.trim()}
          >
            {isSending ? (
              <ActivityIndicator size="small" color="#fff" />
            ) : (
              <Text style={styles.sendButtonText}>Enviar</Text>
            )}
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

// Estilos (igual que en versiones anteriores)
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff'
  },
  keyboardAvoidingView: {
    flex: 1
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
    backgroundColor: '#fff'
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    flex: 1
  },
  headerStatus: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  statusIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#4CAF50',
    marginRight: 6
  },
  statusText: {
    fontSize: 14,
    color: '#666'
  },
  chatContainer: {
    padding: 16,
    paddingBottom: 8
  },
  messageContainer: {
    borderRadius: 18,
    padding: 12,
    marginBottom: 12,
    maxWidth: '80%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2
  },
  botMessage: {
    backgroundColor: '#f0f0f0',
    alignSelf: 'flex-start',
    borderBottomLeftRadius: 4
  },
  userMessage: {
    backgroundColor: '#007bff',
    alignSelf: 'flex-end',
    borderBottomRightRadius: 4
  },
  messageText: {
    fontSize: 16,
    lineHeight: 22
  },
  botMessageText: {
    color: '#333'
  },
  userMessageText: {
    color: '#fff'
  },
  messageTime: {
    fontSize: 11,
    marginTop: 4,
    textAlign: 'right'
  },
  botMessageTime: {
    color: '#888'
  },
  userMessageTime: {
    color: 'rgba(255,255,255,0.7)'
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    paddingBottom: Platform.OS === 'ios' ? 24 : 12,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#eee'
  },
  input: {
    flex: 1,
    minHeight: 40,
    maxHeight: 120,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: '#fff',
    color: '#333',
    fontSize: 16,
    textAlignVertical: 'center'
  },
  sendButton: {
    minWidth: 60,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#007bff',
    marginLeft: 10,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 12
  },
  disabledButton: {
    backgroundColor: '#ccc'
  },
  sendButtonText: {
    color: '#fff',
    fontWeight: '600'
  }
});

export default Chat;