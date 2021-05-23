// import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './src/screens/HomeScreen';
import SettingsScreen from './src/screens/SettingsScreen';

const Tab = createBottomTabNavigator();

const HomeStack = createStackNavigator();

const HomeStackScreen = () => {
    return (
        <HomeStack.Navigator>
            <HomeStack.Screen name="Home" component={HomeScreen} />
        </HomeStack.Navigator>
    );
}

export default function App() {
    return (
        <NavigationContainer>
            <Tab.Navigator>
                <Tab.Screen
                    name="Home"
                    component={HomeStackScreen}
                />
                <Tab.Screen name="Settings" component={SettingsScreen}/>
            </Tab.Navigator>
        </NavigationContainer>
    );
}
