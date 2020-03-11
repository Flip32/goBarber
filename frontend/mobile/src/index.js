import React, {Component} from 'react';
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from 'react-redux'
import { StatusBar } from "react-native";

import './config/ReactotronConfig'

import { store, persistor } from './store'
import App from './App'
import { NavigationContainer } from "@react-navigation/native";


function Index() {

    return (
        <Provider store={store}>
            <PersistGate persistor={persistor} loading={null}>
                <NavigationContainer>
                    <StatusBar barStyle="light-content" backgroundColor="#cab231"/>
                    <App/>
                </NavigationContainer>
            </PersistGate>
        </Provider>
    );

}

export default Index;
