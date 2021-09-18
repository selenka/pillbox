import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './src/screens/HomeScreen';
import MedicineScreen from './src/screens/medicine/MedicineScreen';
import MedicineItem from './src/screens/medicine/MedicineItem';
import MedicineGroup from './src/screens/medicine/MedicineGroup';
import CoursesScreen from './src/screens/courses/CoursesScreen';
import { ProvideStore } from "./src/store";
import {ProvideModalStore} from "./src/store/modal";

const HomeStack = createStackNavigator();

const App = () => {
    return (
        <ProvideStore>
            <ProvideModalStore>
                <NavigationContainer>
                    <HomeStack.Navigator headerMode="float">
                        <HomeStack.Screen name="Home" options={{ title: 'HealMe - Домашняя Аптечка' }} component={HomeScreen}/>
                        <HomeStack.Screen name="Medicine" options={{ title: 'Аптечка' }} component={MedicineScreen}/>
                        <HomeStack.Screen name="MedicineItem" options={{ title: 'Лекарство' }} component={MedicineItem}/>
                        <HomeStack.Screen name="MedicineGroup" options={{ title: 'Группа' }} component={MedicineGroup}/>
                        <HomeStack.Screen name="Courses" options={{ title: 'Курсы' }}  component={CoursesScreen}/>
                    </HomeStack.Navigator>
                </NavigationContainer>
            </ProvideModalStore>
        </ProvideStore>
    );
}

export default App;
