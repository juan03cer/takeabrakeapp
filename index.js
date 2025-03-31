import React from 'react';
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
if (__DEV__) {
    const DevSettings = require('react-native').DevSettings;
    if (DevSettings && DevSettings.setDebugRemotely) {
        DevSettings.setDebugRemotely(true);
    } else {
        console.log('No se puede habilitar la depuración remota.');
    }
}

// Apollo
import client from './config/apollo';
import { ApolloProvider } from '@apollo/client';

const takeabrakeapp = () => (
    <ApolloProvider client={client}>
        <App />
    </ApolloProvider>
);

AppRegistry.registerComponent(appName, () => takeabrakeapp);
