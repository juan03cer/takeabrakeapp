import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context'; // Corrige también esta importación
import { Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const httpLink = createHttpLink({
        //  uri: Platform.OS === 'ios' ? 'http://localhost:3000/graphql' : 'http://10.0.2.2:3000/graphql',
           uri:'https://takeabrake.onrender.com/graphql'
});

const authLink = setContext(async (_, { headers }) => {
    // Leer el token
    const token = await AsyncStorage.getItem('token');
    return {
        headers: {
            ...headers,
            authorization: token ? `Bearer ${token}` : '',
        },
    };
});

const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: authLink.concat(httpLink),
});

export default client;
