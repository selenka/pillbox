// import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './src/screens/HomeScreen';
import SettingsScreen from './src/screens/SettingsScreen';
import MedicineScreen from './src/screens/MedicineScreen';
import CoursesScreen from './src/screens/CoursesScreen';

const Tab = createBottomTabNavigator();

const HomeStack = createStackNavigator();

const HomeStackScreen = ({ navigation }) => {
    return (
        <HomeStack.Navigator>
            <HomeStack.Screen name="Home" component={HomeScreen} />
            <HomeStack.Screen name="Medicine" component={MedicineScreen} />
            <HomeStack.Screen name="Courses" component={CoursesScreen} />
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
