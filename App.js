// import { StatusBar } from 'expo-status-bar';
import React, { createContext } from 'react';
import { observer } from 'mobx-react-lite';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './src/screens/HomeScreen';
import SettingsScreen from './src/screens/SettingsScreen';
import MedicineScreen from './src/screens/medicine/MedicineScreen';
import MedicineItem from './src/screens/medicine/MedicineItem';
import CoursesScreen from './src/screens/courses/CoursesScreen';

const Tab = createBottomTabNavigator();

const HomeStack = createStackNavigator();

const HomeStackScreen = () => {
    return (
        <HomeStack.Navigator>
            <HomeStack.Screen name="Home" component={HomeScreen}/>
            <HomeStack.Screen name="Medicine" component={MedicineScreen}/>
            <HomeStack.Screen name="MedicineItem" component={MedicineItem}/>
            <HomeStack.Screen name="Courses" component={CoursesScreen}/>
        </HomeStack.Navigator>
    );
}

const App = () => {
    console.log('>>APP render')
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

export default App;
